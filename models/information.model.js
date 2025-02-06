const db = require('../config/db.config');

const getBanner = async () => {
   const result = await db.query('SELECT banner_name, banner_image, description FROM banners');
   return result.rows;
}

const getService = async () => {
   const result = await db.query('SELECT service_code, service_name, service_icon, service_tarif FROM services');
   return result.rows;
}

module.exports = {
   getBanner, 
   getService
}