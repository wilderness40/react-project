const express = require('express')
const app = express() 
const Foods = require('../models/foods')

const router = express.Router()

app.use(express.json())

router.get('/', async(req, res, next)=> {
    // cors 오류 설정
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    const foodList = await Foods.find()
    console.log(foodList)
    res.json(foodList)
})

router.get('/:search', async(req, res, next) => {
    const searchFoodList = await Foods.find({
        $and : [
            { TOB_INFO : req.params.search },
            { ADDR : { $regex: /^대전광역시 서구 둔산동/ }}
        ]        
    })
    console.log(searchFoodList)
    res.json(searchFoodList)
})

module.exports = router