const qs = require('querystring')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const {
    login
} = require('../controller/user')
const {
    set
} = require('../db/redis')

function getCookieExpire() {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()

}

const handleUserRouter = (req, res) => {
    const {
        method,
        url
    } = req;
    path = url.split("?")[0];
    query = qs.parse(req.url.split('?')[1])
    const {
        username,
        password,
    } = query

    //用户登录
    if (method === "POST" && path == '/api/user/login') {
        const {
            username,
            password
        } = req.body



        const loginRes = login(username, password)

        return loginRes.then(val => {
            if (val.username) {

                //将用户信息存贮到session中
                req.session.username = val.username;
                req.session.realname = val.realname;


                //同步到redis
                set(req.sessionId, req.session)

                return new SuccessModel()
            } else {
                return new ErrorModel('账号密码错误')
            }
        })
    }

}

module.exports = handleUserRouter