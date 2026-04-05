const { AppDataSource } = require('../server');
const Order = require('../models/order');
const orderEmitter = require('../util/eventEmitter');

class OrderService {
    static async createOrder(orderData) {
        const orderRepository = AppDataSource.getRepository(Order);
        
        // 1. Save to DB
        const newOrder = orderRepository.create(orderData);
        const savedOrder = await orderRepository.save(newOrder);

        // 2. Emit Event
        orderEmitter.emit('order_created', savedOrder);

        return savedOrder;
    }
}

module.exports = OrderService;