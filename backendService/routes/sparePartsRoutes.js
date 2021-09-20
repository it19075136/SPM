const { addSparePartAd, updateSparePartById, getSparePartById, getAllSparePartsAds, deleteSparepartsById, getPublishedSparepartsAds, getPendingSparepartsAds } = require('../api/spareParts.api');

const router = require('express').Router();

//**GET METHOD TO GET SPAREPARTS DETAIL BY ID USING 'getSparePartById' FUNCTION*/
router.get('/:id', (req,res) => {
    getSparePartById(req.params.id).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    });
});

//**GET METHOD TO GET ALL SPAREPARTS DETAIL BY ID USING 'getAllSparePartsAds' FUNCTION*/
router.get('/', (req,res) => {
    getAllSparePartsAds().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    })
})

//**POST METHOD TO POST SPAREPARTS DETAIL BY ID USING 'addSparePartAd' FUNCTION*/
router.post('/', (req,res) => {
    addSparePartAd(req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    })
});

//**PUT METHOD TO UPDATE SPAREPARTS DETAIL BY ID USING 'updateSparePartById' FUNCTION*/
router.put('/:id', (req,res) => {
    updateSparePartById(req.params.id,req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    });
});

//**DELETE METHOD TO DELETE SPAREPARTS DETAIL BY ID USING 'deleteSparepartsById' FUNCTION*/
router.delete('/:id', (req, res) => {
    deleteSparepartsById(req.params.id).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    })
});

//**GET METHOD TO GET ALL PUBLISHED SPAREPARTS DETAIL  USING 'getPublishedSparepartsAds' FUNCTION*/
router.get('/published/ads', (req, res) => {
    getPublishedSparepartsAds().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    })
})

//**GET METHOD TO GET ALL PENDING SPAREPARTS DETAIL  USING 'getPendingSparepartsAds' FUNCTION*/
router.get('/pending/ads', (req, res) => {
    getPendingSparepartsAds().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    })
})


module.exports = router;
