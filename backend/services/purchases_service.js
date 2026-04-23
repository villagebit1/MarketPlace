const Order = require('../models/order')

class PurchasesService{

    async getOrdersByUser(userId) {
        // Use .find() to get multiple documents
        // Use .sort() to show newest orders first (Marketplace standard)
        const orders = await Order.find({ user_id: userId }).sort({ order_date: -1 });

        if (!orders || orders.length === 0) {
            return []; // Return empty array instead of throwing error
        }

        return orders;
    }

    async includeOrder(itens){
        
        try {
            //const itens = req.body.itens;
            var total = 0;
            
            const OrderStatus = {
                PENDING: 'pending',
                SHIPPED: 'shipped',
                DELIVERED: 'delivered',
                CANCELLED: 'cancelled'
            };

            const user_id = "698f93cfa0a67688814e149e"
            var order_date = new Date()
            var status = OrderStatus.PENDING
            const shipping_addr = "w Sahara - Ave Las Vegas"

            // for (const itemData of itens) {      
            //     itemData.preco,
            //     itemData.quantidade,
            //     total += itemData.preco * itemData.quantidade
            // }

            itens.forEach(item => { 
                item.preco,
                item.quantidade,
                total += item.preco * item.quantidade 
            })
            
            var order = new Order(user_id, order_date, total, status, shipping_addr)
            console.log(`Total do pedido calculado: ${total}`)   //
            const orderId = await order.save();
            return orderId;
        }
        catch{
            console.log('Erro ao inserir os itens do pedido.')
        }
    }
}

module.exports = new PurchasesService();