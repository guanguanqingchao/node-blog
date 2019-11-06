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


module.exports = {
    getList
}