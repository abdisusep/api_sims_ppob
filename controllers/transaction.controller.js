const service = require('../services/transaction.service');

const getBalance = async (req, res) => {
   try {
      const result = await service.getBalance(req.email);
      res.status(200).json({
         status: 0,
         message: 'Get Balance Berhasil',
         data: result
      });
   } catch (err) {
      res.status(500).json({ 
         error: err.message 
      });
   }
}

const insertTopup = async (req, res) => {
   try {
      const { top_up_amount } = req.body;
      if (!top_up_amount || top_up_amount < 0 || isNaN(top_up_amount)) {
         return res.status(400).json({
            status: 102,
            message: 'Parameter top_up_amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
            data: null
         });
      }
   
      const result = await service.insertTopup(req.email, top_up_amount);
      res.status(200).json({
         status: 0,
         message: 'Top Up Balance berhasil',
         data: result
      });
   } catch (err) {
      res.status(500).json({ 
         error: err.message 
      });
   }
}

const insertTransaction = async (req, res) => {
   try {
      const { service_code } = req.body;
      const result = await service.insertTransaction(req.email, service_code);
      if (result) {
         res.status(200).json({
            status: 0,
            message: 'Transaksi berhasil',
            data: result
         });
      }else{
         res.status(102).json({
            status: 0,
            message: 'Service atau Layanan tidak ditemukan',
            data: null
         });
      }
   } catch (err) {
      res.status(500).json({ 
         error: err.message 
      });
   }
}

const getTransactionHistory = async (req, res) => {
   try {
      const result = await service.getTransactionHistory(req.email, req.query);
      res.status(200).json({
         status: 0,
         message: 'Get History Berhasil',
         data: result
      });
   } catch (err) {
      res.status(500).json({ 
         error: err.message 
      });
   }
}

module.exports = { 
   getBalance, 
   insertTopup, 
   insertTransaction, 
   getTransactionHistory 
}
