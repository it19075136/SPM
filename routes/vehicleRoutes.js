const router = require('express').Router();
const { addVehicleAd, updateVehicleAdById, getAllVehicleAds, getVehicleAdById, deleteVehicleAdById, getPublishedVehicleAds, getPendingVehicleAds } = require('../api/vehicles.api');

router.post('/', (req, res) => {

    addVehicleAd(req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    });

});

router.put('/:id', (req, res) => {

    updateVehicleAdById(req.params.id, req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    });

});

router.get('/', (req, res) => {

    getAllVehicleAds().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    });

})

router.get('/:id', (req, res) => {

    getVehicleAdById(req.params.id).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    });

})


router.delete('/:id', (req, res) => {

    deleteVehicleAdById(req.params.id).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    });

})

router.get('/published/ads', (req, res) => {

    getPublishedVehicleAds().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    })
})

router.get('/pending/ads', (req, res) => {
    getPendingVehicleAds().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    })
})

module.exports = router;