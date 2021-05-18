const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Products {
    constructor(productName, unitPrice,thumbnail, id) {
        this.productName = productName;
        this.unitPrice = unitPrice;
        this.thumbnail = thumbnail;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db
                .collection('product')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            // Insert product
            dbOp = db.collection('product').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('product')
            .find()
            .toArray()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db
            .collection('product')
            .find({ _id: new mongodb.ObjectId(prodId)})
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('product')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findByName(search_item) {
        const db = getDb();
        console.log(search_item);
        return db
        .collection('product')
        .find({ productName: new RegExp(search_item, 'i') })
        .toArray()
        .then(product => {
            console.log(product);
            return product;
        })
        .catch(err => {
            console.log(err);
        });
    }
}

module.exports = Products;