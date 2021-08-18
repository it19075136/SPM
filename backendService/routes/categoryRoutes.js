const router = require('express').Router();

const {addCategory,getAllCategories,getCategoryById,updateCategoryById,deleteCategoryById} = require('../api/category.api');

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

router.get('/:id', async (req,res) => {
    getCategoryById(req.params.id).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
})

router.put('/:id', async (req,res) => {
    updateCategoryById(req.params.id, req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
})

router.delete('/:id', async (req,res) => {
    deleteCategoryById(req.params.id).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;