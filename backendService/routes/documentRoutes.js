const router = require('express').Router();

const {addDocument,updateDocument,deleteDocument,getDoucmentByUserId,getAllDocuments,updateDocumentIsApprove}=require('../api/document.api')


router.post('/', async (req,res)=>{


    addDocument(req.body).then((newDoc)=>{
        newDoc._id ? res.json(newDoc) : res.status(400).json(newDoc);
    }).catch((err)=>{
        res.status(500).json(err);
    })
});
router.post('/update/:id', (req,res)=>{

    updateDocument(req.body,req.params.id).then((doc)=>{
        res.json(doc)
    }).catch((err)=>{
        console.log(err)
    })
})
router.post('/update/isApprove/:id', (req,res)=>{

    updateDocumentIsApprove(req.body,req.params.id).then((doc)=>{
        res.json(doc)
    }).catch((err)=>{
        console.log(err)
    })
})
router.delete('/delete/:id',(req,res)=>{
    deleteDocument(req.params.id).then((doc)=>{
        res.json(doc)
    }).catch((err)=>{
        console.log(err)
    })
})
router.get('/:id',(req,res)=>{
    getDoucmentByUserId(req.params.id).then(documents=>{
        res.json(documents)
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/', (req, res) => {

    getAllDocuments().then((docs) => {
        res.json(docs);
    }).catch((err) => {
        console.log('err: ', err);
    })

})

module.exports=router;