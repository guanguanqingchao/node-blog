const qs = require('querystring')


const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')




const handleBlogRouter = (req, res) => {
    const {
        method,
        url
    } = req;

    path = url.split("?")[0]
    query = qs.parse(req.url.split('?')[1])
    const {
        id,
        keyword,
        author
    } = query

    //获取博客列表
    if (method === "GET" && path == '/api/blog/list') {
        console.log('----匹配博客列表路由----')
        const result = getList(author, keyword)
        return result.then((list) => {
            return new SuccessModel(list)
        })

    }

    //获取博客详情
    if (method === "GET" && path == '/api/blog/detail') {

        const detail = getDetail(id)
        return new SuccessModel(detail)
    }

    //新建博客
    if (method === "POST" && path == '/api/blog/new') {
        const createBlog = newBlog(req.body)
        return new SuccessModel(createBlog)
    }

    //删除博客
    if (method === "POST" && path == '/api/blog/del') {
        const delRes = deleteBlog(id)

        if (delRes) {
            return new SuccessModel(delRes)

        } else {
            return new ErrorModel('更新博客失败')
        }

    }

    //更新博客
    if (method === "POST" && path == '/api/blog/update') {
        const updateRes = updateBlog(id, req.body)
        return new SuccessModel(updateRes)
    }
}

module.exports = handleBlogRouter