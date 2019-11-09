const mysql = require('mysql');

const {
    MYSQL_CONF
} = require('../db/mysql')

//创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

//开始连接
con.connect()


function exec() {


    return new Promise((resolve, reject) => {

        con.query(mysql, (err, result) => {
            if (err) {
                reject(err)
                return
            }

            console.log(result)
            resolve(result)
        })

    })



}

module.exports = {
    exec
}