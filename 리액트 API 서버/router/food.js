const express = require('express')
const app = express() 
const expressAsyncHandler = require('express-async-handler');
const Foods = require('../models/foods')

const router = express.Router()

app.use(express.json())

router.post('/' ,expressAsyncHandler (async(req, res, next)=> {
    // cors 오류 설정
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    const foodList = await Foods.find(
        { ADDR : { $regex: /^대전광역시 서구 둔산동 /}}
    ).limit(10)
    if(!foodList) {
        res.status(400).json({code : 400 , message : "Request is invalid"})
    } else {
        res.status(200).json({code : 200 , foodList})
    }
}))

router.get('/category/:id/:address', expressAsyncHandler (async(req, res, next) => {
    const categoryFoodList = await Foods.find({
        $and : [
            { TOB_INFO : req.params.id },
            { ADDR : { $regex: req.params.address }}
        ]        
    })
    if(!categoryFoodList) {
        res.status(400).json({code : 400 , message : "Request is invalid"})
    } else {
        res.status(200).json({code : 200 , categoryFoodList})
    }
}))

router.get('/search/:id/:address', expressAsyncHandler (async(req, res, next) => {
    const searchFoodList = await Foods.find({
        $and : [
            { REST_NM : { $regex : req.params.id }},
            // { ADDR : { $regex: req.params.address }}
        ]
    })
    if(searchFoodList.length === 0) {
        res.status(400).json({code : 400 , message : "검색데이터를 찾을 수 없습니다."})
    } else {
        res.status(200).json({code : 200 , searchFoodList})
    }
}))

router.post('/discription/:id/:address', expressAsyncHandler (async(req, res, next) => {
    const discriptionFood = await Foods.findOne({
        $and : [
            { REST_NM : { $regex : req.params.id }},
            { ADDR : { $regex: req.params.address }}
        ]
    })
    if(!discriptionFood) {
        res.status(401).json({code : 400 , message : "Request is invalid"})
    } else {
        res.status(200).json({code : 200 , discriptionFood})
    }
}))

router.get('/hashTag/type=:type&tag=:tag/:address', expressAsyncHandler (async(req, res, next) => {
    const hashTagFoodList = await Foods.find({
        $and : [
            { TOB_INFO : { $regex: req.params.type}},
            { RPRS_MENU_NM : { $regex : req.params.tag }},
            { ADDR : { $regex: req.params.address }},
        ]
    })
    if(!hashTagFoodList) {
        res.status(400).json({code : 400 , message : "Request is invalid"})
    } else {
        res.status(200).json({code : 200 , hashTagFoodList})
    }
}))


module.exports = router