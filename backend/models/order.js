const getDb = require('../util/database').getDb

class Order {
    constructor(user_id, order_date, total, status, shipping_addr){
        this.user_id = user_id
        this.order_date = order_date
        this.total = total
        this.status = status
        this.shipping_addr = shipping_addr 
    }

    async save() {
        const db = getDb()
        const result = await db.collection('orders').insertOne(this)
        return result.insertedId;
    }
    
    static async findOne(user_id) {
        const db = getDb()
        const order = await db.collection('orders').findOne({user_id: user_id})
        if (!order) {
            return null
        }
    
    }
    
}

module.exports = Order 