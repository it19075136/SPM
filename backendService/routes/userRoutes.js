const router  = require('express').Router();
const { createuser, getAllUsers, getUserById ,deleteUserById, updateUserById,getUsetByEmailAndPassword,getEmailAndPassCode,addwishListToItem }  = require('../api/user.api');
const jsonwebtoken = require('jsonwebtoken');
//add user
router.post('/add', (req, res) => {

    createuser(req.body).then((newUser) => {
        console.log('newUser',newUser)
        if (newUser != 'Email Already Exists'){
        const token = jsonwebtoken.sign({
            _id:newUser._id,
            name :newUser.name,
            email : newUser.email,
            type : newUser.type,
            phoneNumber :newUser.phoneNumber,
            wishList:newUser.wishList
        },"jwtSecret")
        res.json(token);
    }
    else{
        res.json('Email Already Exists')
    }

    }).catch((err) => {
        console.log(err);
    })

})

//get all users
router.get('/', (req, res) => {

    getAllUsers().then((docs) => {
        res.json(docs);
    }).catch((err) => {
        console.log('err: ', err);
    })

})

//get All users by id

router.get('/:id', (req, res) => {
    getUserById(req.params.id).then((user) => {
        res.json(user);
    })
})

router.post('/getUser',(req,res)=>{
    console.log('router getuser');
    getUsetByEmailAndPassword(req.body).then(user=>{
        console.log('in router get');
        console.log(user);
        const token = jsonwebtoken.sign({
            _id:user._id,
            name :user.name,
            email : user.email,
            type : user.type,
            phoneNumber :user.phoneNumber,
            wishList:user.wishList
        },"jwtSecret")
        const password = user.password;
        console.log('in router get');
        res.json({token,password});
        
    }).catch(err=>{
        console.log('err pasindu');
        console.log(err);
    })
})

router.delete('/:id', (req, res) => {
    
    deleteUserById(req.params.id).then((user) => {
        res.json(
            user.name + ' is deleted'
        )
    })
})

router.post('/update/:id', (req, res) => {
    req.body._id = req.params.id;
 console.log('in router post')
 console.log(req.body)
    updateUserById(req.body)
        .then((user) => {
            console.log('in router post in then')
            const token = jsonwebtoken.sign({
                _id:user._id,
                name :user.name,
                email : user.email,
                type : user.type,
                phoneNumber :user.phoneNumber,
                wishList:newUser.wishList
            },"jwtSecret")
            res.json(
                {token}
            )
        })
})

router.post('/getCode',(req,res)=>{
    console.log('router post');
    console.log(req.body);
    getEmailAndPassCode(req.body.email).then(details=>{
        console.log('router post in getEmail')
        const token = jsonwebtoken.sign({
            _id:details._id,
            email : details.email,
            code:details.code
        },"jwtSecret")
        res.json({token});
    }).catch((err)=>{
        console.log('err');
        console.log(err);
    })
})
// router.put('/updatePassword',(req,res)=>{

// })

router.post('/addwishlist/:id', (req, res) => {
    addwishListToItem(req.params.id,req.body.wishList).then((user) => {
        res.json(user);
    })
})

module.exports = router;