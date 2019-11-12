const qs = require('querystring')
const fs = require('fs');
const path = require('path');



const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

function getCookieExpire() {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()

}

const getPostData = (req) => {

    return new Promise((resolve, reject) => {

        if (req.method !== 'POST') {
            resolve({})
            return
        }

        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }



        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString()
        })

        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })

    })

}





//设置session
const SESSION_DATA = {}

const serverHandle = function (req, res) {

    //设置数据格式
    res.setHeader('Content-type', 'application-json');
    //解析路径
    res.query = qs.parse(req.url.split('?')[1])
    //获取并解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '' //k1=v1;k2=v2

    cookieStr.split(';').forEach(ck => {
        if (!ck) {
            return
        }
        const arr = ck.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;

    });


    //解析session
    let userId = req.cookie.userid
    let needSetCookie = false

    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }

    } else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }

    req.session = SESSION_DATA[userId]




    // 处理路由
    getPostData(req).then(data => {
            req.body = data;


            const blogResult = handleBlogRouter(req, res)
            const userResult = handleUserRouter(req, res)


            if (blogResult) {
                blogResult.then((data) => {

                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId};path = /;httpOnly;expires=${getCookieExpire()}`)
                    }

                    res.end(JSON.stringify(data))
                })

                return

            }

            if (userResult) {
                userResult.then((data) => {

                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId};path = /;httpOnly;expires=${getCookieExpire()}`)
                    }

                    res.end(JSON.stringify(data))
                })

                return
            }


            res.writeHead(404, {
                'Conetent-type': 'text/plain'
            })

            res.write(' NOT FOUND')
            res.end()

        }

    )



}

module.exports = serverHandle