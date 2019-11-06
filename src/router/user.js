const handleUserRouter = (req, res) => {
    const {
        method,
        url
    } = req;

    path = url.split("?")[0]



    if (method === "POST" && path == '/api/user/login') {
        return {
            name: 'guanqingchao',
            password: 24546
        }
    }



}

module.exports = handleUserRouter