const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')





const serverHandle = function (req, res) {

    //设置数据格式
    res.setHeader('Content-type', 'application-json');



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

module.exports = serverHandle
//process.env.NODE_ENV