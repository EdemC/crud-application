const { getFlashMessages } = require('express-flash-message');
const { Customer } = require('../model/Customer');
const mongoose = require('mongoose');


// Get Homepage with Pagination
const homepage = async (req, res) => {
    const messages = await req.consumeFlash('info')

    const locals = {
        title: 'CRUD Application',
        description: 'User Management System CRUD Application'
    }

    let perPage = 10;
    let page = Number(req.query.page) || 1;

    try{
        const allCustomers = await Customer.aggregate([{ $sort: { updatedAt: -1}}])
                                            .skip(perPage * page - perPage)     
                                            .limit(perPage)
                                            .exec();

        const count = await Customer.find({}).count();

        res.status(200).render('index', { 
            locals, 
            messages, 
            allCustomers,
            current: page,
            pages: Math.ceil(count / perPage) 
        });
    } catch (error) {
        console.log(error);
    }
}


// // Get Homepage
// const homepage = async (req, res) => {
//     const messages = await req.consumeFlash('info')

//     const locals = {
//         title: 'CRUD Application',
//         description: 'User Management System CRUD Application'
//     }

//     try{
//         const allCustomers = await Customer.find({});
//         res.status(200).render('index', { locals, messages, allCustomers });
//     } catch (error) {
//         console.log(error)
//     }
// }


// Get - New Customer Form
const addCustomer = async (req, res) => {
    const locals = {
        title: 'Add New Customer',
        description: 'User Management System CRUD Application'
    }

    res.status(200).render('customer/addCustomer', locals)
}


// Get - View Customer Info
const viewCustomer = async (req, res) => {
    const locals = {
        title: 'View Customer Data',
        description: 'User Management System CRUD Application'
    }

    try {
        const customerInfo = await Customer.findById(req.params.id).exec();
        res.status(200).render('customer/viewCustomer', { locals, customerInfo })
    } catch (error) {
        console.log(error)
    }


}


// Post - Create New Customer
const postCustomer = async (req, res) => {
    console.log(req.body)

    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        details: req.body.details
    })

    try{
        await Customer.create(newCustomer)
        await req.flash('info', 'New customer has been added');
        res.redirect('/');
    } catch (error) {
        console.log(error)
    }
}



// Get - Edit Customer Page
const editCustomer = async (req, res) => {
    const locals = {
        title: 'Edit Customer Data',
        description: 'User Management System CRUD Application'
    }

    try {
        const customerDetails = await Customer.findById(req.params.id);
        res.status(200).render('customer/editCustomer', { locals, customerDetails })
    } catch (error) {
        console.log(error)
    }
}


// Patch - Edit Customer
const patchCustomer = async (req, res) => {
    try{
        await Customer.findByIdAndUpdate(req.params.id, req.body).exec();
        await req.flash('info', 'Customer Info Updated Successfully');
        res.redirect('/');
    } catch (error) {
        console.log(error)
    }
}


// Delete Customer
const deleteCustomer = async (req, res) => {
    try{
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        await req.flash('info', `Customer ${deletedCustomer.firstName} ${deletedCustomer.lastName} deleted successfully.`);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}


// Post - Search Customer
const searchCustomer = async (req, res) => {
    const locals = {
        title: 'Search Customer',
        description: 'User Management System CRUD Application'
    }

    try{
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

        const searchResult = await Customer.find({
            $or: [
                {firstName: {$regex: new RegExp(searchNoSpecialChar, 'i')}},
                {lastName: {$regex: new RegExp(searchNoSpecialChar, 'i')}}
            ]
        })

        res.render('search', { locals, searchResult, searchNoSpecialChar })
    } catch (error) {
        console.log(error);
    }
}


// Get - About Page
const about = async (req, res) => {
    const locals = {
        title: 'About',
        description: 'User Management System CRUD Application'
    }

    try{
        res.render('about', locals);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    homepage,
    addCustomer,
    postCustomer,
    viewCustomer,
    editCustomer,
    patchCustomer,
    deleteCustomer,
    searchCustomer,
    about
}