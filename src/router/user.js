const qs = require('querystring')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const {
    login
} = require('../controller/user')

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
    if (method === "GET" && path == '/api/user/login') {
        // const {
        //     username,
        //     password
        // } = req.body
        const {
            username,
            password
        } = query

        const loginRes = login(username, password)
        return loginRes.then(val => {
            if (val.username) {

                //将用户信息存贮到session中
                req.session.username = val.username;
                req.session.realname = val.realname;

                return new SuccessModel()
            } else {
                return new ErrorModel('账号密码错误')
            }
        })
    }

    //登录验证
    if (method === "GET" && path == '/api/user/login-test') {


        if (req.session.username) {
            return Promise.resolve(
                new SuccessModel({
                    session: req.session || 'session'
                })
            )
        }

        return Promise.resolve(
            new ErrorModel('尚未登录')
        )


    }



}

module.exports = handleUserRouter