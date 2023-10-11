const express = require('express')
const User = require('../models/User')
const expressAsyncHandler = require('express-async-handler')
const { generateToken, isAuth } = require('../auth')

const router = express.Router()

router.post('/register', expressAsyncHandler( async(req, res, next) => {
    console.log(req.body)
    const user = new User({
        userId : req.body.userId ,
        password : req.body.password ,
        keyword : req.body.keyword ,
        address : req.body.address ,
    })
    const newUser = await user.save()

    if(!newUser) {
        res.status(401).json({ code : 401 , message : 'Invalid User Data' })
    } else {
        const { userId, keyword, address } = newUser
        res.json({
            code : 200 ,
            token : generateToken(newUser) ,
            userId, keyword, address
        })
    }
}))

router.post('/login',expressAsyncHandler( async (req, res) => {

    const loginUser = await User.findOne({
        userId : req.body.userId ,
        password : req.body.password ,
    })
    
    if(!loginUser) {
        res.status(401).json({ code : 401, message : '이메일이 존재하지 않거나 비밀번호가 일치하지 않습니다'})
    } else {
        const { userId, keyword, address } =loginUser
        res.json({
            code : 200 , 
            token : generateToken(loginUser) ,
            userId, keyword, address ,
        })
    }
}))

// router.post('/loginCheck', isAuth, expressAsyncHandler( async (req, res) => {
//     const loginUser = await User.findOne({
//         userId : req.body.userId ,
//         password : req.body.password ,
//     })
// }))


router.post('/logout', (req, res) => {
    res.json('로그아웃')
})

router.put('/:id' ,isAuth , expressAsyncHandler ( async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if(!user) {
        res.status(404).json({ code : 404 , message : 'User not Found'})
    } else {
        user.password = req.body.password || user.password
        user.keyword = req.body.keyword || user.keyword
        user.address = req.body.address || user.address
        const updatedUser = await user.save()
        const { keyword , address } = updatedUser
        res.json({
            code : 200 ,
            token : generateToken(updatedUser) ,
            keyword , address
        })
    }
}))

module.exports = router