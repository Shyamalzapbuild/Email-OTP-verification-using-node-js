const {Sequelize} = require('sequelize');
const database = new Sequelize('mail','newuser','1234',{
    dialect:'mysql',
    host:'localhost'
});
module.exports=database;