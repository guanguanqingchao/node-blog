const env = process.env.NODE_ENV

let MYSQL_CONF;

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        port: 8000,
        user: 'root',
        password: 'mysqldidi',
        database: 'myblog'
    }
}

if (env === 'production') {

}

module.exports = {
    MYSQL_CONF
}