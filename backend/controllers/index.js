const User = require('../models/user')
const Product = require('../models/product')
const bcrypt = require('bcrypt')
const Order = require('../models/order')
const OrderItem = require('../models/order_item')
const jwt = require('jsonwebtoken');
const authService = require('../services/authservice');
const purchasesService = require('../services/purchases_service');

exports.showIndex = (req, res, next) => {
    res.render('index')
}

exports.showStore = (req, res, next) => {
    res.render('store')
}

exports.showPageSignUp = (req, res, next) => {
    res.render('signUp')
}

exports.showPageProducts = (req, res, next) => {
    res.render('products')
}

exports.showMembersPage = (req, res) => {
    res.render('members')
}

exports.get404Page = (req, res, next) => {
    res.status(404).render('404')
}

exports.signup = async(req, res, next) => {
    const {username, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User(username, email, hashedPassword)
    try {
        user.save()
            .then(
                console.log('User created succesfully g')
            )
            .catch(err => console.log(`Someth went wrong ${err}`))
        res.redirect('/')
        // res.status(201).json({ 
        //     message: "User created successfully",
        //     userId: user._id 
        // });
    } catch (err) {
        //console.log(err);
        //res.redirect('signup')
        console.error(err);
        res.status(500).json({ error: "Failed to create user" });
    }
}

exports.order = async(req, res, next) => {

    try {
        const itens = req.body.itens;
        /*var total = 0;
        
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
        console.log("Total ", total)   
        const orderId = await order.save(); */
        const orderId = await purchasesService.includeOrder(itens);

        console.log('Last registry id: ', orderId)

        for (const itemData of itens) {   
            var product_id = 'ioe88932kcc'   
            const orderItem = new OrderItem(//Salvando o(s) item/produto(s) do pedido c/ a quantidade e preco
                orderId,
                product_id,
                itemData.quantidade,
                itemData.preco
            );
            await orderItem.save();
        }

        res.status(201).json({ message: "Purchase saved!" });

        console.log(order);
        console.log("Full Body:", JSON.stringify(req.body, null, 2));
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Save failed" });
    }
}

exports.addProducts = async(req, res, next) => {
    try {
        const itens = req.body.itens;
        //const firstProduct = itens[0];        
        //const titulo = firstProduct.titulo;

	    const name = "JBL Earbud phone";
	    const description = "Wireless Earphone"
	    const price = 250.90
	    const stock_quantity = 35;

        // const product = {
        //     name,           
        //     description,    
        //     price,
        //     stock_quantity
        // }; 

        for (const itemData of itens) {
            
            var product = new Product(
                itemData.id,
                itemData.titulo,
                itemData.descricao,
                itemData.preco,
                itemData.quantidade
            );        
            // Wait for each save to complete before moving to the next
            await product.save();
        }
        res.status(201).json({ message: "Tham' !" });

        console.log(product);
        console.log(`Full Body: ${JSON.stringify(req.body, null, 2)}`);

        //const { categoria, descricao, favorito, foto, id, preco, quantidade, titulo } = product;
        //const product = new Product(product_id, name, description, price, stock_quantity)
        
        //res.json({ message: "Tham' " })
        //res.redirect('/')
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Save failed" });
        //res.redirect('signup')
    }
}

exports.login = async(req, res, next) => {
    const {email, password} = req.body

    try {
        //const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { user, token } = await authService.login(email, password);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 
        });

        //global.console.log(`Token gen ${token}`)//using template strings backsticks
        req.session.user = user
        //res.redirect('/members')

        return res.status(200).json({ 
            success: true, 
            message: "Logged in successfully",
            user: { id: user.id, email: user.email } 
        });
        
    } catch (err) {
        if (err.message === 'INVALID_CREDENTIALS') {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        console.log(err)
        return res.status(500).json({ success: false, message: "Internal Server Error" });
        //res.render('index')
    }
}

//Middleware responsavel por verificar se o user que fez a requisição está autenticado.
//As long as the servers grows, the good pratice is create another file for Middlewares
exports.checkAuth = (req, res, next) => {
    if (req.session && req.session.user || req.isAuthenticated()) {
        next()// O next é o 3 parametro do router: router.get('/auth', controller.checkAuth, controller.showMembersPage)
    } else {//Ou seja, só vai para a proxima function do controller se passar no middleware controller.checkAuth
        res.redirect('/')
    }
}

exports.logout = (req, res, next) => {
    res.clearCookie('token');

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        console.log('Loggin out..')
        res.status(200).json({ message: 'Logged out successfully' });
    });
}