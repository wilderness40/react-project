const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const router = express.Router()
const config = require('../config')

router.get('/', expressAsyncHandler(async (req, res) => {
    try {
        // 중앙 기사 랜덤 기사 데이터
        const response1 = await fetch(`https://newsapi.org/v2/top-headlines?page=1&country=kr&apiKey=${config.Newspaper_API_KEY}`)
        const newsDatas1 = await response1.json()

        const withImageNewsDatas1 = newsDatas1.articles.filter((newsData) => newsData.urlToImage !== null)

        // 좌측 기사 테크관련 기사 데이터
        const response2 = await fetch(`https://newsapi.org/v2/top-headlines?country=kr&category=technology&apiKey=${config.Newspaper_API_KEY}`)
        const newsDatas2 = await response2.json()
        const withImageNewsDatas2 = newsDatas2.articles.filter((newsData) => newsData.urlToImage !== null)

        // 우측 기사 스포츠관련 기사 데이터
        const response3 = await fetch(`https://newsapi.org/v2/top-headlines?country=kr&category=sports&apiKey=${config.Newspaper_API_KEY}`)
        const newsDatas3 = await response3.json()
        const withImageNewsDatas3 = newsDatas3.articles.filter((newsData) => newsData.urlToImage !== null)


        if (response1.status !== 200
            && response2.status !== 200
            && response3.status !== 200
        ) {
            throw new Error('NewsAPI 서버 통신이 원활하지 않습니다.')
        }

        const data = await Promise.all([withImageNewsDatas1, withImageNewsDatas2, withImageNewsDatas3]) // 데이터를 한번에 보내기 위해 Promise.all 사용
        res.status(200).json({ data }) // data를 프론트로 보내준다

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: '서버 연결 실패' })
    }
}))


module.exports = router

