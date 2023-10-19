const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const router = express.Router()
const API_KEY='AIzaSyCnqQaf7pTvWQfLaQtp2mVBc3Fnjg1HNhs'

router.get('/', expressAsyncHandler(async(req, res) => {
    fetch(`https://www.googleapis.com/youtube/v3/search?&key=${API_KEY}&part=snippet&type=video&q=운동&maxResults=50`)
    .then(res => res.json())
    .then(data => console.log(data))
}))


module.exports = router