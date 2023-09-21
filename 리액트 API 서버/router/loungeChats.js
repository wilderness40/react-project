const express = require('express')
const app = express()

const LoungeChat = require('../models/LoungeChat')
const router = express.Router()
const expressAsyncHandler = require('express-async-handler')

app.use(express.json())

router.get('/', expressAsyncHandler (async(req, res, next) => { // 모든 글을 가져온다.
    const loungeChats = await LoungeChat.find({})
    res.json(loungeChats)
}))

router.post('/', expressAsyncHandler(async(req, res, next)=> {
    const loungeChats = new LoungeChat({
        nickname: req.body.nickname,
        password: req.body.password,
        text: req.body.text,
    })
    const createdLoungeChat = await loungeChats.save()
    res.status(201).json(createdLoungeChat)
}))

router.put('/', expressAsyncHandler(async(req, res, next) => {  // 비밀번호로 검증해야되는데 이게 맞나?
    const loungeChat = await LoungeChat.findOne(req.body.password)
    if(loungeChat){
        loungeChat.nickname = loungeChat.nickname
        loungeChat.password = loungeChat.password
        loungeChat.text = req.body.text || loungeChat.text

        const updatedLoungeChat = await loungeChat.save()
        res.json(updatedLoungeChat)
    }else{
        res.status(404).json({message: 'loungeChat not found'})
    }
}))

router.delete('/', expressAsyncHandler(async(req, res, next) => {
    const loungeChat = await LoungeChat.findOneAndDelete(req.body.password)
    if(loungeChat){
        res.json({message: '글이 삭제되었습니다'})
}
}))

module.exports = router