let User = require("../models/userModel");
const passwordHash = require('password-hash');
var nodemailer = require('nodemailer');
 function createuser(body) {
 
   return new Promise((resolve, reject) => {
     const newUser = new User(body);

     User.findOne({
       email : body.email
     }).then(user => {
      console.log('user',user)
       if(user){
         resolve('Email Already Exists')
       }else{
        newUser
        .save()
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          console.log('in catch')
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

 function getAllSellers() {
  return new Promise((resolve, reject) => {
    User.find({type: 'buyerseller'},'_id name email phoneNumber',{sort: {name: 1}}).then((docs) => {
      resolve(docs)
    }).catch((err) => {
      reject(err)
    })
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
       (body.name ? user.name = body.name : user.name =  user.name ),
       (body.email ? user.email = body.email : user.email =  user.email ),
        //  (user.email = body.email),
        //  (user.password = body.password)
        //  (user.gender = body.gender),
        //  (user.type = body.type),
        (body.type ? user.type = body.type : user.type =  user.type ),
        (body.wishList ? user.wishList = body.wishList : user.wishList =  user.wishList ),
        (body.phoneNumber ? user.phoneNumber = body.phoneNumber : user.phoneNumber =  user.phoneNumber ),
        (body.password ? user.password = body.password : user.password =  user.password ),
        // (body.newPassword ? user.password = body.newPassword : (body.password ? user.password = body.password : user.password =  user.password)),
        (body.image ? user.image = body.image : user.image =  user.image )
        //  (user.phoneNumber = Number(body.phoneNumber))

       user
         .save()
         .then((user) => {
           console.log('user',user)
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
      //  if(passwordHash.verify(user.password,res.password)){sandungwp@gmail.com
      //   console.log('in findone if');
      console.log('getUsetByEmailAndPassword in then res',res);
      console.log('in findone');
         resolve(res);
      //  }
       
     }).catch((err)=>{
      console.log('in getUsetByEmailAndPassword err');
       resolve(err);
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
          name :user.name,
          email : user.email,
          type : user.type,
          phoneNumber :user.phoneNumber,
          wishList:user.wishList,
          image:user.image,
          password:user.password,
          code:codes
        }

        console.log('updatePasswordDetails',updatePasswordDetails);
        var transporter = nodemailer.createTransport({
          service:'gmail',
          auth:{
            user:'tweb4172@gmail.com',
            pass:'kzcdkvnquffnoyyq'
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
            resolve('action unsuccess')
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
  function addwishListToItem(id,wishList) {
    return new Promise((resolve, reject) => {
      User.findById(id)
        .then((user) => {
          user.wishList = [...wishList]
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
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
 module.exports = {
   createuser,
   getAllUsers,
   getUserById,
   getAllSellers,
   deleteUserById,
   updateUserById,
   getUsetByEmailAndPassword,
   getEmailAndPassCode,
   addwishListToItem
 };