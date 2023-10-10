const config = require('./config')
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    return jwt.sign({
        _id : user._id ,
        userId : user.userId , 
        keyword : user.keyword ,
        address : user.address  ,
    
    }, config.JWT_SECRET ,
    {
        expiresIn: '1d' ,
        issuer : 'WarCrNet' ,
    })
}

const isAuth = (req, res, next) => {
    const bearToken = req.headers.authorization
    if(!bearToken) {
        res.status(401).json({ message : 'Token is not supplied'})
    } else {
        const token = bearToken.slice(7, bearToken.length) // jwt 토큰
        jwt.verify(token, config.JWT_SECRET, (err, userInfo) => {
            if(err && err.name === 'TokenExpiredError') { // 토큰이 만료된 경우
                res.status(419).json({ code : 419 , message : 'token expried ~!'})
            } else if(err){ // 토큰 복호화 중 에러가 났을 경우
                res.status(401).json({ code : 401 , message : 'Invalid Token ~!'})
            } else {
                req.user = userInfo // 브라우저에서 전송한 사용한 정보(jwt 토큰을 복호화한 것)
                next()
            }
        })
    
    }
}

module.exports = {
    generateToken ,
    isAuth ,
}