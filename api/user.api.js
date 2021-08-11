let User = require("../models/userModel");
const passwordHash = require('password-hash');
var nodemailer = require('nodemailer');
 function createuser(body) {
 
   return new Promise((resolve, reject) => {
     const newUser = new User(body);

     User.findOne({
       email : body.email
     }).then(user => {
       if(user){
         resolve('Email Already Exists')
       }else{
        newUser
        .save()
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
       } 
     })
   });
 }

 function getAllUsers() {
   return new Promise((resolve, reject) => {
     User.find((err, docs) => {
       err ? reject(err) : resolve(docs);
     });
   });
 }

 function getUserById(id) {
   return new Promise((resolve, reject) => {
     User.findById(id)
       .then((user) => {
         resolve(user);
       })
       .catch((err) => {
         reject(err);
       });
   });
 }

 function deleteUserById(id) {
   return new Promise((resolve, reject) => {
     User.findByIdAndDelete(id)
       .then((user) => {
         resolve(user);
       })
       .catch((err) => {
         reject(err);
       });
   });
 }

 function updateUserById(body) {
   console.log("body: ", body);

   return new Promise((resolve, reject) => {
     User.findByIdAndUpdate(body._id).then((user) => {
      //  (user.name = body.name),
      //    (user.email = body.email),
         (user.password = body.password)
        //  (user.gender = body.gender),
        //  (user.type = body.type),
        //  (user.phoneNumber = Number(body.phoneNumber));

       user
         .save()
         .then((user) => {
          console.log('in then');
           resolve(user);
         })
         .catch((err) => {
          console.log('err');
           reject(err);
         });
     });
   });
 }

 function getUsetByEmailAndPassword(user) {
   return new Promise((resolve,reject)=>{
    //  passwordHash.verify(req.body.password,user.password)
    //  user.password = passwordHash.generate(user.password);
    console.log(user);
    console.log('in getUsetByEmailAndPassword');
     User.findOne({email:user.email}).then((res)=>{
      //  if(passwordHash.verify(user.password,res.password)){
      //   console.log('in findone if');
      console.log('in findone');
         resolve(res);
      //  }
       
     }).catch((err)=>{
      console.log('in getUsetByEmailAndPassword err');
       reject(err);
     })
   })
 }
 function getEmailAndPassCode(emails){
   return new Promise((resolve,reject)=>{
    console.log('in getEmailAndPassCode');
    User.findOne({email:emails}).then(user => {
      console.log('in then in get email passcode')
      if(user){
        console.log('in then in get email passcode in if')
        console.log(user);
        // Math.floor((Math.random() * 100) + 1);
        const code =Math.floor(Math.random()*100000 +1);
       console.log(code);
        const subject = 'veryfication code for Update password in ICAF';
        console.log('below subject0')
        const body = `veryfication code - ${code}`;
        console.log('below subject1')
        // const codes=passwordHash.generate(code);
        console.log('below subject2')
        console.log(code);
        const codes = passwordHash.generate(code.toString());
        console.log(codes);
        const updatePasswordDetails = {
          _id:user._id,
          email:user.email,
          code:codes
        }

        console.log('updatePasswordDetails',updatePasswordDetails);
        var transporter = nodemailer.createTransport({
          service:'gmail',
          auth:{
            user:'tweb4172@gmail.com',
            pass:'#sliit1234'
          }
        })
        var mailOptions ={
          from:'tweb4172@gmail.com',
          to:user.email,
          subject:subject,
          text:body
        }

        transporter.sendMail(mailOptions,function(error,info){
          if(error){
            console.log(error);
            console.log('error in sendmail');
          }else{
            console.log('Email sent: ' + info.response);
            resolve(updatePasswordDetails)
          }
        });
        
      }
      // else{
      //   reject('email not in database')
      // } 
    }).catch((err)=>{
        console.log('erros in catch');
        reject('erros')
    })

   })
  }

 module.exports = {
   createuser,
   getAllUsers,
   getUserById,
   deleteUserById,
   updateUserById,
   getUsetByEmailAndPassword,
   getEmailAndPassCode
 };