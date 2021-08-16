const router = require('express').Router();
const { addVehicleAd, updateVehicleAdById, getAllVehicleAds } = require('../api/vehicles.api');

router.post('/',(req,res) => {

    addVehicleAd(req.body).then((result) => {
        result._id ? res.json(result) : res.status(400).json(result);
    })
});

router.put('/:id',(req,res) => {

    updateVehicleAdById(req.params.id,req.body).then((result) => {
        result._id ? res.json(result) : res.status(400).json(result);
    })
});

router.get('/',(req,res) => {

    getAllVehicleAds().then((result) => {
        result._id ? res.json(result) : res.status(400).json(result);
    })
})

module.exports = router;