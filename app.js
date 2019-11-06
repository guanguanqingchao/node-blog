const http = require('http');
const querystring = require('querystring');


const server = http.createServer((req, res) => {
    const {
        url,
        method
    } = req;
    const path = url.split('?')[0];
    const query = querystring.parse(url.split('?')[1])

    //设置数据格式
    res.setHeader('Content-type', 'application-json');

    const resData = {
        url,
        path,
        query,
        method
    }

    if (method === "GET") {
        res.end(JSON.stringify(resData))
    }

    if (method === "POST") {

        let postdata = '';
        req.on('data', chunk => {
            postdata += chunk.toString()
        })

        req.on('end', () => {
            resData.postdata = postdata

            res.end(
                JSON.stringify(resData)
            )
        })
    }



})

server.listen(8000)
console.log('--------ok---------')