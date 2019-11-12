const qs = require('querystring')
const fs = require('fs');
const path = require('path');



const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')


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




const serverHandle = function (req, res) {

    //设置数据格式
    res.setHeader('Content-type', 'application-json');

    res.query = qs.parse(req.url.split('?')[1])


    // 处理路由
    getPostData(req).then(data => {
            req.body = data;


            const blogResult = handleBlogRouter(req, res)
            const userResult = handleUserRouter(req, res)


            if (blogResult) {

                blogResult.then((data) => {
                    console.log('**********处理blog 数据返回*****', data)

                    res.end(JSON.stringify(data))
                })

                return

            }

            if (userResult) {
                userResult.then((data) => {
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
//process.env.NODE_ENV