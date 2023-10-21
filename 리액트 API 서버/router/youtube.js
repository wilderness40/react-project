const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const router = express.Router()
const config = require('../config')

router.get('/', expressAsyncHandler(async(req, res) => {
    try{
     const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=운동&maxResults=50&type=video&key=${config.Youtube_API_KEY}`)
     console.log(response)
    if(response.status !== 200){
        throw new Error('YouTube 서버 통신이 원활하지 않습니다.')
    }
    
    const data = await response.json()
    res.status(200).json({ 
        data : data.items
    }) // data를 프론트로 보내준다
    
} catch(error){
    console.error(error)
    res.status(500).json({ error: '서버 연결 실패'})
}
}))


module.exports = router