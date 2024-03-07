const express = require('express');
const customerRouter = express.Router();
const customerController = require('../controller/customerController')

customerRouter.get('/', customerController.homepage);
customerRouter.get('/add', customerController.addCustomer);
customerRouter.get('/view/:id', customerController.viewCustomer);
customerRouter.get('/edit/:id', customerController.editCustomer);
customerRouter.get('/about', customerController.about);
customerRouter.post('/add', customerController.postCustomer);
customerRouter.post('/search', customerController.searchCustomer);
customerRouter.patch('/edit/:id', customerController.patchCustomer);
customerRouter.delete('/delete/:id', customerController.deleteCustomer);

module.exports = customerRouter;