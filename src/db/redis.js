const redis = require('redis')

const {
    REDIS_CONF
} = require('../../conf/db')

const {
    host,
    port
} = REDIS_CONF

client = redis.createClient(host, port);


client.on("error", function (err) {
    console.log("Error " + err);
});




function set(key, val) {

    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    client.set(key, val, redis.print);

}

function get(key) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }

            if (val == null) {
                resolve(null)
            }

            //兼容json格式
            try {
                resolve(JSON.parse(val))
            } catch (err) {
                resolve(err)
            }

        })

    })

}

module.exports = {
    set,
    get
}