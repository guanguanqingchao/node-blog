const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')


const {
    login
} = require('../controller/user')



const handleUserRouter = (req, res) => {
    const {
        method,
        url,
        query
    } = req;
    path = url.split("?")[0];

    //用户登录
    if (method === "POST" && path == '/api/user/login') {
        const {
            username,
            password
        } = req.body
        const loginRes = login(username, password)

        return loginRes.then(val => {
            if (val.username) {
                return new SuccessModel()
            } else {
                return new ErrorModel('账号密码错误')
            }

        })


    }



}

module.exports = handleUserRouter