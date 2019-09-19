const sql = require('mssql')
const db = require('../config/db')

// Check existing user
exports.userCheck = async function(user) {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .input('email', user)
        .query`
        select u.*, p.fk_location_02 from Um_User u inner join Um_User_Province p on u.username = p.username where u.email = @email
        `
    })
}

// Create new user
exports.userCreate = async function(nuser) {
    console.log(nuser)
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .input('username', nuser[0])
        .input('password', nuser[1])
        .input('email', nuser[2])
        .input('location', nuser[3])
        .query`
            insert into Um_User (username, password, email) values (@username, @password, @email)
            insert into Um_User_Province (username, fk_location_02) values (@username, @location)
        `
    }).catch(err => console.log(err))
}

// Get locations of register page
exports.locationGet = async function() {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .query`
            select Id, Name from Base_Info where Type = 2
        `
    })
}

// Id check passport
exports.idCheck = async function(id) {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .input('id', id)
        .query`
            select * from Um_User where Id = @id
        `
    })
}