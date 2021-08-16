const router = require('express').Router();

const {addCategory,getAllCategories} = require('../api/category.api');

router.post('/', async (req,res) => {

    addCategory(req.body).then((newCategory) => {
        newCategory._id ? res.json(newCategory) : res.status(400).json(newCategory);
    }).catch((err) => {
        res.status(500).json(err);
    })
})

router.get('/', async (req,res) => {

    getAllCategories().then((docs) => {
        res.json(docs);
    }).catch((err) => {
        console.log('err',err);
    })
})

module.exports = router;