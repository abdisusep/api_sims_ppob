const service = require('../services/information.service');

const getBanner = async (req, res) => {
   try {
      const result = await service.getBanner();
      res.status(200).json({
         status: 0,
         message: 'Sukses',
         data: result
      });
   } catch (err) {
      res.status(500).json({ 
         error: err.message 
      });
   }
}

const getService = async (req, res) => {
   try {
      const result = await service.getService();
      res.status(200).json({
         status: 0,
         message: 'Sukses',
         data: result
      });
   } catch (err) {
      res.status(500).json({ 
         error: err.message 
      });
   }
}

module.exports = {
   getBanner, 
   getService
}