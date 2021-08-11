const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:'dkouee2p1',
    api_key:'397154274715887',
    api_secret:'vyZyiAKsG7KpcbfDUCmUrJUqg28'
})

module.exports = cloudinary;