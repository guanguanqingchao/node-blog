const serverHandle = function (req, res) {

    //设置数据格式
    res.setHeader('Content-type', 'application-json');

    const resData = {
        env: process.env.NODE_ENV,
        title: 'this is environment'
    }
    res.end(JSON.stringify(resData))

}

module.exports = serverHandle