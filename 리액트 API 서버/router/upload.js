const express = require('express')
const expressAsyncHandler = require('express-async-handler')

const User = require('../models/User')
const UploadData = require('../models/uploads')
const { Types : { ObjectId } } = require('mongoose');

const { isAuth } = require('../auth')
const router = express.Router()

const http = require('http')
const fs = require('fs')
fs.readdir('uploads', (err) => {
    if(err) {
        fs.mkdirSync('uploads')
        console.log('uploads 폴더를 생성했습니다.')
    } else {
        console.log('uploads 폴더가 있습니다.')
    }
})

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
router.get('/', isAuth, expressAsyncHandler( async(req, res, next) => {
    const user_id = req.user._id
    const imageFile = await UploadData.find({
        userId : user_id
    })
    const imageFileUrl = imageFile.pop().path
    const imageFileType = imageFile.pop().minetype
    fs.readFile(imageFileUrl , (err, data) => {
        if(err) {
            console.log(err)
        } else {
            // http.createServer(function(req, res){
            //     res.writeHead(200 , {'Content-Type': imageFileType})
            //     res.end(data)
            // }).listen(3000)
            res.status(200).json({ code : 200 , data, imageFileType})
            // res.writeHead(200,{'Content': imageFileType});
            // res.end(data);
            console.log('3000번 포트로 보냄')
        }
    })
}))

router.put('/', upload.single('img') , isAuth , expressAsyncHandler( async(req, res, next) => { 
    const filename = `${req.file.filename} + ${Date()}`
    const uploadData = new UploadData({
        filename : filename ,
        path : req.file.path ,
        minetype : req.file.mimetype ,
        size : req.file.size ,
        date : new Date(),
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