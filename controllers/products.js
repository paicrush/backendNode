const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Product = require('../models/products');
const ObjectId = mongodb.ObjectId;

exports.getSearchProduct = (req, res, next) => {
    Product.fetchAll()
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
exports.getSearchOneProduct = (req, res, next) => {
    const { productName } = req.params;
    console.log(productName);
    Product.findByName(productName)
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

exports.postAddProduct = (req, res, next) => {
    
    const { productName, unitPrice ,thumbnail} = req.body;
        const product = new Product(productName, unitPrice,thumbnail);
        product
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

exports.postUpdateProduct = (req, res, next) => {
    console.log(req.body);
    const {  productName, unitPrice ,thumbnail,_id } = req.body;
        const product = new Product(productName, unitPrice,thumbnail, new ObjectId(_id));
        product
            .save()
            .then(result => {
                console.log('Update Product');
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

exports.getDeleteProduct = (req, res, next) => {
    const { id } = req.params;
    console.log("test");
    console.log(id);
    Product.deleteById(id)
        .then(() => {
            console.log('Delete Product');
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

exports.getUpdateProduct = (req, res, next) => {
    console.log(req.params);
    const { product_id } = req.params;
    let product_name = '';
    let price = '';

    Product.findById(product_id)
        .then(product => {
            console.log(product);
            res.status(200).json({
                response: {
                    data: product,
                    message: "success"
                }
            });
        })
        .catch(err => {
            res.status(200).json({
                response: {
                    data: [],
                    message: err
                }
            });
        });
};