const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const router = express.Router()
const config = require('../config')

router.get('/', expressAsyncHandler(async(req, res) => {
    console.log(config.Youtube_API_KEY)
    fetch(`https://www.googleapis.com/youtube/v3/search?&key=${config.Youtube_API_KEY}&part=snippet&type=video&q=운동&maxResults=50`)
    .then(res => res.json())
    .then(data => console.log(data))
}))


module.exports = router