# Email-OTP-verification-using-node-js
Using node js and nodemailer, we verify email through otp

1. Steps to Start Project.

2. Fill your EmailId and password from which you want to send the OTP.
```
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"Enter Gmail id",
        pass:"Password of your gmail id"
        }
});
```

3. configure the Database File in /utils/db.js  according to your System.

4. Install packagaes using 
```
npm install
```

5. After the running the code Go to the Route 
```
localhost:3000/send
````
Enter your Email Id in which You want to Recieve The OTP
