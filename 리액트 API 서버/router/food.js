const express = require('express')
const app = express() 
const Foods = require('../models/foods')

const router = express.Router()

app.use(express.json())

router.get('/', async(req, res, next)=> {
    // cors 오류 설정
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    const foodList = await Foods.find({
        TOB_INFO : '양식'
    })
    console.log(foodList)
    res.json(foodList)
})

module.exports = router