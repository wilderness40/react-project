const express = require('express')
const expressAsyncHandler = require('express-async-handler')

const User = require('../models/User')
const UploadData = require('../models/uploads')
const { Types : { ObjectId } } = require('mongoose');

const { isAuth } = require('../auth')
const router = express.Router()

const multer = require('multer')
const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, 'uploads/')
    } ,
    filename : function(req, file, cb) {
        const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
        cb(null, originalname)
    }
})
const upload = multer({
    dest : 'uploads' ,
    storage : storage , 
})

router.put('/', upload.single('img') , isAuth , expressAsyncHandler( async(req, res, next) => {
    const uploadData = new UploadData({
        filename : req.file.filename ,
        path : req.file.path ,
        minetype : req.file.mimetype ,
        userId : req.user._id ,
    })
    const saveUpload = await uploadData.save()
    if(!saveUpload) {
        res.status(401).json({ code : 401 , message : 'Failed File Save'})
    } else {
        res.status(200).json({ code : 200 , message : 'Success File Save'})
    }
}))

module.exports = router