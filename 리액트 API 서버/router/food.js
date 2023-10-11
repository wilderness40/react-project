const express = require('express')
const app = express() 
const expressAsyncHandler = require('express-async-handler');
const Foods = require('../models/foods')

const router = express.Router()

app.use(express.json())

router.get('/', expressAsyncHandler (async(req, res, next)=> {
    // cors 오류 설정
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    const foodList = await Foods.find(
        { ADDR : { $regex: /^대전광역시 서구 둔산동/}}
    ).limit(10)
    console.log(foodList)
    if(!foodList) {
        res.status(400).json({code : 400 , message : "Request is invalid"})
    } else {
        res.status(200).json({code : 200 , foodList})
    }
}))

router.get('/category/:id', expressAsyncHandler (async(req, res, next) => {
    const categoryFoodList = await Foods.find({
        $and : [
            { TOB_INFO : req.params.id },
            { ADDR : { $regex: /^대전광역시 서구 둔산동/ }}
        ]        
    })
    if(!categoryFoodList) {
        res.status(400).json({code : 400 , message : "Request is invalid"})
    } else {
        res.status(200).json({code : 200 , categoryFoodList})
    }
}))

router.get('/search/:id', expressAsyncHandler (async(req, res, next) => {
    const searchFoodList = await Foods.find({
        $and : [
            { REST_NM : { $regex : req.params.id }},
            { ADDR : { $regex: /^대전광역시 서구 둔산동/ }}
        ]
    })
    if(!searchFoodList) {
        res.status(400).json({code : 400 , message : "Request is invalid"})
    } else {
        res.status(200).json({code : 200 , searchFoodList})
    }
}))

router.post('/discription/:id', expressAsyncHandler (async(req, res, next) => {
    const discriptionFood = await Foods.findOne({
        $and : [
            { REST_NM : { $regex : req.params.id }},
            { ADDR : { $regex: req.body.addr}}
        ]
    })
    if(!discriptionFood) {
        res.status(401).json({code : 400 , message : "Request is invalid"})
    } else {
        res.status(200).json({code : 200 , discriptionFood})
    }
}))

router.get('/hashTag/type=:type&tag=:tag', expressAsyncHandler (async(req, res, next) => {
    const hashTagFoodList = await Foods.find({
        $and : [
            { TOB_INFO : { $regex: req.params.type}},
            { RPRS_MENU_NM : { $regex : req.params.tag }},
            { ADDR : { $regex: /^대전광역시 서구 둔산동/ }},
        ]
    })
    console.log(hashTagFoodList)
    if(!hashTagFoodList) {
        res.status(400).json({code : 400 , message : "Request is invalid"})
    } else {
        res.status(200).json({code : 200 , hashTagFoodList})
    }
}))


module.exports = router