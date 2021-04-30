const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Orders = require('../models/orders');

exports.postAddProduct = (req, res, next) => {
    
    const { orderedDate, totalPrice,orders} = req.body;
        const order = new Orders(orderedDate, totalPrice,orders);
        order
            .save()
            .then(result => {
                // console.log(result);
                console.log('Created Product');
                res.status(200).json({
                    response: {
                        result: true,
                        message: "success"
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    response: {
                        result: false,
                        message: err
                    }
                });
            });
    
};

exports.getSearchProduct = (req, res, next) => {
    Orders.fetchAll()
        .then(product => {
            res.status(200).json(
                
                    product
                    
                
            );
        })
        .catch(err => {
            res.status(500).json({
                response: {
                    data: [],
                    message: err
                }
            });
        });
}

exports.getDeleteProduct = (req, res, next) => {
    const { id } = req.params;
    console.log("test");
    console.log(id);
    Orders.deleteById(id)
        .then(() => {
            console.log('Delete Order');
            res.status(200).json({
                response: {
                    result: true,
                    message: "success"
                }
            });
        })
        .catch(err => {
            res.status(200).json({
                response: {
                    result: false,
                    message: err
                }
            });
        });
};   

