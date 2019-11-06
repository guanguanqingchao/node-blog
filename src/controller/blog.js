const getList = (author, keyword) => {

    return [{
            id: 1,
            creatTime: '2019-11-05',
            author: 'guanqingchao',
            content: '通过 new 关键词创建的对象会自动调用 constructor() 方法，因此我们可以在 constructor() 里初始化对象。'

        },
        {
            id: 2,
            creatTime: '2019-11-05',
            author: 'guanqingchao',
            content: '通过 new 关键词创建的对象会自动调用 constructor() 方法，因此我们可以在 constructor() 里初始化对象。'

        },
        {
            id: 3,
            creatTime: '2019-11-05',
            author: 'guanqingchao',
            content: '通过 new 关键词创建的对象会自动调用 constructor() 方法，因此我们可以在 constructor() 里初始化对象。'

        }
    ]


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