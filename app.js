const qs = require('querystring')

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

            const blogData = handleBlogRouter(req, res)
            const userData = handleUserRouter(req, res)



            if (blogData) {
                res.end(JSON.stringify(blogData))
                return
            }

            if (userData) {
                res.end(JSON.stringify(userData))

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