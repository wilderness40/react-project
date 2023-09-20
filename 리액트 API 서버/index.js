const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./config')
const port = 5300
const corsOptions = {
    origin : 'http://localhost:3000' ,
    credential : true ,
}

mongoose.connect(config.MONGODB_URL)
.then( () => console.log('mongodb connect ...'))
.catch(e => console.log(`faild to connect mongodb ${e}`))

app.use(cors(corsOptions))
app.use(express.json())

app.use(express.urlencoded({extended:true}))
const foodRouter = require('./router/food')
app.use('/food', foodRouter)

app.get('/error', (req, res, next) => {
    throw new Error('서버에 치명적인 에러가 발생했습니다.')
})

app.use((req, res, next) => { // 사용자가 요청한 페이지가 없는 경우 에러 처리
    res.status(404).send('Page not Found')
})

app.use((err, req, res, next) => { // 서버내부 오류처리
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
})
app.listen(port, '0.0.0.0', () => {
    console.log('server is runnig on port 5000...')
})