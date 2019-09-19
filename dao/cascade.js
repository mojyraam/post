const sql = require('mssql')
const db = require('../config/db')

exports.csCounty = async function(selectedcounty) {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .input('id', selectedcounty)
        .query`
            select CountyName, Id from County where Fk_Location_02 = @id
        `
    })
}

exports.csCity = async function(selectedcity) {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .input('id', selectedcity)
        .query`
            select CityName, Id from City where FK_County_Id = @id
        `
    })
}

exports.csOffice = async function(selectedoffice) {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .input('id', selectedoffice)
        .query`
            select Office_Name, Id from Office where FK_City_Id = @id
        `
    })
}