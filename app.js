const express  = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const router = require('./routes/routes');
const sequelize = require('./model/mail');

const app = express();

app.set('view engine','ejs');
app.set('views','views');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(router);

app.listen(3000,()=>{
    console.log('Listening');
});
sequelize.sync({alter:true});