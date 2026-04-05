const orderEmitter = require('../util/eventEmitter');

orderEmitter.on('order_created', (order) => {
    console.log(`[Event] Order ${order._id} was created. Sending confirmation email...`);
});