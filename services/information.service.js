const model = require('../models/information.model');

const getBanner = async () => {
    return await model.getBanner();
}

const getService = async () => {
   return await model.getService();
}

module.exports = {
    getBanner, 
    getService
 }