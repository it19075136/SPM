const { addSparePartAd, updateSparePartById, getSparePartById, getAllSparePartsAds, deleteSparepartsById } = require('../api/spareParts.api');
const router = require('express').Router();

//**GET METHOD TO GET SPAREPARTS DETAIL BY ID USING 'getSparePartById' FUNCTION*/
router.get('/:id', (req,res) => {
    getSparePartById(req.params.id).then((result) => {
        result._id ? res.json(result) : res.status(400).json(result);
    })
});

//**GET METHOD TO GET ALL SPAREPARTS DETAIL BY ID USING 'getAllSparePartsAds' FUNCTION*/
router.get('/', (req,res) => {
    getAllSparePartsAds().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
})

//**GET METHOD TO GET SPAREPARTS DETAIL BY ID USING 'addSparePartAd' FUNCTION*/
router.post('/', (req,res) => {
    addSparePartAd(req.body).then((result) => {
        result._id ? res.json(result) : res.status(400).json(result);
    })
});

//**PUT METHOD TO UPDATE SPAREPARTS DETAIL BY ID USING 'updateSparePartById' FUNCTION*/
router.put('/:id', (req,res) => {
    updateSparePartById(req.params._id, req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
});

//**DELETE METHOD TO DELETE SPAREPARTS DETAIL BY ID USING 'deleteSparepartsById' FUNCTION*/
router.delete('/:id', (req, res) => {
    deleteSparepartsById(req.params.id).then((result) => {
        res.json(doc);
    }).catch((err) => {
        console.log(err);
    })
});

module.exports = router;
