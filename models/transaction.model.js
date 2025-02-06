const db = require('../config/db.config');

const getBalance = async (email) => {
   const user = await getUserByEmail(email);
   const user_id = user.id;
   
   const result = await db.query(`SELECT COALESCE(SUM(CASE WHEN transaction_type = 'TOPUP' THEN total_amount ELSE 0 END),0) - COALESCE(SUM(CASE WHEN transaction_type = 'PAYMENT' THEN total_amount ELSE 0 END),0) AS balance FROM transactions WHERE user_id=$1`, [user_id]);
   return result.rows[0];
}

const insertTopup = async (email, top_up_amount) => {
   const user = await getUserByEmail(email);
   const user_id = user.id;
   const invoice_number = await getInvoiceNumber(user_id);

   const result = await db.query(
        `INSERT INTO transactions (user_id, invoice_number, transaction_type, description, total_amount, created_on) VALUES ($1, $2, 'TOPUP', 'Top Up Balance', $3, NOW())`,
        [user_id, invoice_number, top_up_amount]
   );

   return result;
}

const insertTransaction = async (email, service_code) => {
    const user = await getUserByEmail(email);
    const user_id = user.id;

    const invoice_number = await getInvoiceNumber(user_id);
    const service = await getServiceByCode(service_code);
    
    const service_id = service.id;
    const service_name = service.service_name;
    const service_tarif = service.service_tarif;

    const result = await db.query(
        `INSERT INTO transactions (user_id, service_id, invoice_number, transaction_type, description, total_amount, created_on) VALUES ($1, $2, $3, 'PAYMENT', $4, $5, NOW())`,
        [user_id, service_id, invoice_number, service_name, service_tarif]
    );

    if(result){
       return await getDetailInvoice(invoice_number, user_id);
    }
}

const getTransactionHistory = async (email, offset, limit) => {
   const user = await getUserByEmail(email);
   const user_id = user.id;
   
   let query = `
        SELECT invoice_number, transaction_type, description, total_amount, created_on
        FROM transactions WHERE user_id = $1
    `;
    
    const params = [user_id];

    if (limit !== '') {
        query += ` LIMIT $2 OFFSET $3`;
        params.push(parseInt(limit), parseInt(offset));
    }

    const result = await db.query(query, params);
    return result.rows;
}

const getUserByEmail = async (email) => {
    const result = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    return result.rows[0];
}

const getServiceByCode = async (service_code) => {
    const result = await db.query('SELECT * FROM services WHERE service_code=$1', [service_code]);
    return result.rows[0];
}

const getInvoiceNumber = async (user_id) => {
    const result = await db.query('SELECT COUNT(*) AS count FROM transactions WHERE user_id=$1', [user_id]);
    const count = parseInt(result.rows[0].count);
    return 'INVOICE-' + (count + 1);
}

const getDetailInvoice = async (invoice_number, user_id) => {
    const result = await db.query('SELECT a.invoice_number, b.service_code, b.service_name, a.transaction_type, a.total_amount, a.created_on FROM transactions a LEFT JOIN services b ON a.service_id=b.id WHERE a.invoice_number=$1 AND a.user_id=$2', [invoice_number, user_id]);
    return result.rows[0];
}

module.exports = {
    getBalance, 
    insertTopup, 
    insertTransaction, 
    getTransactionHistory
}
