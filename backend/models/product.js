const getDb = require('../util/database').getDb

class Product {
    constructor(product_id, name, description, price, stock_quantity){
        this.product_id = product_id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock_quantity = stock_quantity;
    }

    async save() {
        const db = getDb()
        return db.collection('products').insertOne(this)
    }
    
    static async findOne(BudEarphone) {
        const db = getDb()
        const product = await db.collection('products').findOne({name: BudEarphone})
        if (!product) {
            return null
        }
    
    }
    
}

module.exports = Product