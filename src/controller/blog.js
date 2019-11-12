const {
    exec
} = require('../db/mysql')


const getList = (author, keyword) => {
    console.log('^^^^^^^^^^^^^^')
    //where 1=1,防止author、keyword为空报错

    //select * from myblog.blogs where author = 'guanqingchao5' order by id desc;
    let sql = `select * from myblog.blogs where `

    if (author) {
        sql += `author='${author}'`

    }
    if (keyword) {
        sql += `title like '%${keyword}$'`
    }

    sql += ` order by id desc;`
    console.log(sql)

    //返回promise
    return exec(sql)

}

const getDetail = (id) => {
    return {
        id,
        author: 'guanqingchao',
        content: 'this is blog detail',
        creatTime: '2020-02-02'
    }
}

const newBlog = (data = {}) => {
    console.log('..... post 提交的data .....', data)
    return {
        id: 9999
    }
}

const updateBlog = (id, data = {}) => {
    return {
        id: 10000
    }
}

const deleteBlog = (id) => {
    return {
        id
    }
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}