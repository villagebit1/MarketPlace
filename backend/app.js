const express = require('express')
const routes = require('./routes/routes')
//const mongoConnect = require('./util/database').mongoConnect
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static('public'));
app.use(express.json()); 
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(routes);

module.exports = app;
