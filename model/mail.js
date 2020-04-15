const Sequelize = require('sequelize');
const sequelize = require('../utils/db');
const mail = sequelize.define('mail',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        validate:{
            isEmail:true
        },
        unique:true
    },
    otp:{
        type:Sequelize.INTEGER,
        validate:{
            isNumeric:true,
            len:4
        }
    },
    count:{
            type:Sequelize.INTEGER,
            validate:{
                isNumeric:true
            }
        
    }
});
module.exports=mail;