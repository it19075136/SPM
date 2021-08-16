const Document = require('../models/documentModel');
const cloudinary = require('../config/cloudinary');

function addDocument(payload){

    return new Promise((resolve,reject)=>{
        let result = null;
        let document = null;

        Document.findOne({userId:payload.userId,activityId:payload.activityId,type:payload.type}).then((res)=>{
            // reject('err')
            res && payload.activityId != "TEMPLATE" ? (resolve('file exist')):(result = cloudinary.uploader.upload(payload.file,{
                upload_preset: 'ml_default',
                resource_type: 'auto'
            }).then((res) => {
                console.log(res);
                document = new Document({userId:payload.userId,activityId:payload.activityId,type:payload.type,status:"PENDING",fileUrl:res.secure_url})
                console.log(document)
                document.save().then((document)=>{
                    resolve(document);
                }).catch((err)=>{
                    reject(err)
                })
            }).catch((err) => {
                resolve(err);
            }));
        }).catch((err)=>{
            reject(err)
        })
    })
}

function updateDocument(payload,id){
    return new Promise((resolve,reject)=>{
        Document.findByIdAndUpdate(id).then((document)=>{
            (payload.userId ?( document.userId = payload.userId):null),
            (payload.activityId ?(document.activityId = payload.activityId):null),
            (payload.type ? (document.type = payload.type):null),
            (payload.status ?(document.status = payload.status):null),
            (payload.file?(document.file = payload.file.originalname ):null)
            document.save().then((doc)=>resolve(doc)).catch((err)=>reject(err))
        }).catch(err=>{
            reject(err)
        })
        })
}

function updateDocumentIsApprove(payload,id){
    return new Promise((resolve,reject) => {
        Document.findByIdAndUpdate(id).then((document)=>{
          
            (payload.status ?(document.status = payload.status):null),
          
            document.save().then((doc)=>resolve(doc)).catch((err)=>reject(err))
        })
    })
}

function deleteDocument(id){
    return new Promise((resolve,reject)=>{
        Document.findByIdAndDelete(id).then((docu)=>{
            resolve(docu)
        }).catch((err)=>{
            reject(err)
        })
    })
}

function getDoucmentByUserId(id){
    return new Promise((resolve,reject)=>{
        Document.find({userId:id}).then(documents=>{
            resolve(documents)
        }).catch(err=>{
            reject(err)
        })
    })
}

function getAllDocuments() {
    return new Promise((resolve, reject) => {
      Document.find((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
    });
  }

module.exports={addDocument,updateDocument,deleteDocument,getDoucmentByUserId,getAllDocuments,updateDocumentIsApprove}

