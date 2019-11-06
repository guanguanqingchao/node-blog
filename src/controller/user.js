const login = (username, password) => {
    if (username === 'guanqingchao' && password === 123) {
        return true
    }

    return false
}

module.exports = {
    login
}