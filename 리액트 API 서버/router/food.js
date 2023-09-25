const express = require('express')
const app = express() 
const Foods = require('../models/foods')

const router = express.Router()

app.use(express.json())

router.get('/', async(req, res, next)=> {
    // cors 오류 설정
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    const foodList = await Foods.find(
        { ADDR : { $regex: /^대전광역시 서구 둔산동/}}
    ).limit(10)
    console.log(foodList)
    res.json(foodList)
})

router.get('/category/:id', async(req, res, next) => {
    const categoryFoodList = await Foods.find({
        $and : [
            { TOB_INFO : req.params.id },
            { ADDR : { $regex: /^대전광역시 서구 둔산동/ }}
        ]        
    })
    console.log(categoryFoodList)
    res.json(categoryFoodList)
})

router.get('/search/:id', async(req, res, next) => {
    const searchFoodList = await Foods.find({
        $and : [
            { REST_NM : { $regex : req.params.id }},
            { ADDR : { $regex: /^대전광역시 서구 둔산동/ }}
        ]
    })
    console.log(searchFoodList)
    res.json(searchFoodList)
})

router.post('/discription/:id', async(req, res, next) => {
    const discriptionFood = await Foods.findOne({
        $and : [
            { REST_NM : { $regex : req.params.id }},
            { ADDR : { $regex: req.body.addr}}
        ]
    })
    console.log(discriptionFood)
    res.json(discriptionFood)
})


module.exports = router