const getDb = require('../util/database').getDb

class OrderItem {
    constructor (orderId, productId, quantity, price){
        this.orderId = orderId ,
        this.productId = productId,
        this.quantity = quantity,
        this.price = price
    }
    
    async save() {
        const db = getDb()
        return db.collection('order_items').insertOne(this)
    }
    
    static async findOne(order_item_id) {
        const db = getDb()
        const orderItem = await db.collection('order_items').findOne({ordem_item_id: order_item_id})
        if (!orderItem) {
            return null
        }
    }

}

module.exports = OrderItem