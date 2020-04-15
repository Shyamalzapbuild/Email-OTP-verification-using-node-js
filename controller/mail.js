const nodemailer = require('nodemailer');
const usermodel = require('../model/mail');
const validator=require('express-validator');

// GET OTP
exports.getotp=(req,res)=>{
    res.render('mail');
}

// POST OTP
exports.postotp=async (req, res)=>{
    try{
    const email=req.body.email;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Shyamalsharma.zapbuild@gmail.com',
            pass: 'password'
        }
        });
        const otp = Math.floor(1000+Math.random()*1000);
        const expiryTime  = 24*60*60*1000;
        const users = await usermodel.findOne({where:{email:email}});
        if(users && users.dataValues.count===2){
            const date = new Date(users.dataValues.updatedAt);
            if(Date.now()-date.getTime()<=expiryTime){
                res.end("<h1>Exceeded your Max limits</h1>");
                throw new Error("Exceeded your Max limits");
            }
            await usermodel.update({count:0},{where:{email:email}});
    }
        var details = {
            from: 'Shyamalsharma.zapbuild@gmail.com',
            to: email,
            subject: 'OTP verification',
            text:`Your OTP is ${otp}`
        };
        transporter.sendMail(details, async(error, data) =>{
            if(error){
                console.log(error.message)
            }else if(!users){
                await usermodel.create({email,otp,count:1});
                return res.redirect(`/verify?email=${email}`);
            }else{
                await usermodel.update({
                    otp:otp,
                    count:users.dataValues.count+1
                },{
                    where:{email:email}
                });
                return res.redirect(`/verify?email=${email}`);
            }
        });
    }catch(error){
        console.log(error.message);
        res.end(error.message);
    }
}

exports.getverify=(req,res)=>{
    const email=req.query.email;
    res.render('verify',{
        email:email
    });
}
exports.postverify =async (req,res)=>{
    try{
    const {otp}=req.body;
    const email=req.query.email;
    const users =await usermodel.findOne({where:{email:email}});
    const time = users.dataValues.updatedAt;
    const expiryTime=2*60*1000;
    let date=new Date(time);
    if(Date.now()-date.getTime()>=expiryTime){
        throw new Error('OTP Expired');
    }
    if(otp==users.dataValues.otp){
        res.end('OTP Verified');
    }else{
        throw new Error('Invalid OTP');
    }
}catch(error){
    res.end(error.message);
}
};