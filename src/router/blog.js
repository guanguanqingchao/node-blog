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
        const result = getList(author, keyword)
        return result.then((list) => {
            return new SuccessModel(list)
        })

    }

    //获取博客详情
    if (method === "GET" && path == '/api/blog/detail') {

        const detailResult = getDetail(id)
        return detailResult.then((detail) => new SuccessModel(detail))
    }

    //新建博客
    if (method === "POST" && path == '/api/blog/new') {

        req.body.author = 'yangdi' //开发登录时传真实author
        const createResult = newBlog(req.body)
        return createResult.then(createBlog => new SuccessModel(createBlog))
    }

    //删除博客
    if (method === "POST" && path == '/api/blog/del') {
        const author = 'yangdi' //防止其他人删除除自己之外的博客
        const delRes = deleteBlog(id, author)

        return delRes.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }

        })

    }

    //更新博客
    if (method === "POST" && path == '/api/blog/update') {
        const updateRes = updateBlog(id, req.body)
        return updateRes.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return ErrorModel('更新博客失败')

            }

        })
    }
}

module.exports = handleBlogRouter