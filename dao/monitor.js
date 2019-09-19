const sql = require('mssql')
const db = require('../config/db')

// Get All Monitor Tickets
exports.monitorSelect = async function(d) {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .input('location', d)
        .query`
            select 
                ms.Id,
                bi.Name as StateName,
                co.CountyName as CountyName,
                ct.CityName as CityName,
                oc.Office_Name as OfficeName,
                b2.Name as NodeKind,
                b3.Name as StatusName,
                Asset_No,
                Serial_No
            from Monitor_Spec ms 
                left join Base_Info bi on ms.Fk_Location_02 = bi.Id
                left join County co on ms.FK_County_Id = co.Id
                left join City ct on ms.FK_City_Id = ct.Id
                left join Office oc on ms.FK_Office_Id = oc.Id
                left join Base_Info b2 on ms.Fk_Node_Kind_10 = b2.Id
                left join Base_Info b3 on ms.Fk_Status_01 = b3.Id
            where ms.fk_location_02 = @location
        `
    })
}

// Get New Monitor Ticket Form
exports.monitorCreateGet = async function() {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .query`
            select Name, Id, Type from Base_Info where Type = 2
            select Name, Id, Type from Base_Info where Type = 1
            select Name, Id, Type from Base_Info where Type = 10
            select Name, Id, Type from Base_Info where Type = 20
            select Name, Id, Type from Base_Info where Type = 21
            select Name, Id, Type from Base_Info where Type = 22
        `
    });
}

// Create New Monitor Ticket
exports.dataCreate = async function(data) {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .input('status', 1)
        .input('state', data[0])
        .input('county', data[1])
        .input('city', data[2])
        .input('office', data[3])
        .input('asset', data[4])
        .input('serial', data[5])
        .input('username', 'admin')
        .input('createdatetime', data[11])
        .input('userdate', null)
        .input('comment', data[12])
        .input('isdeleted', 0)
        .input('isactive', 1)
        .input('mark', data[8])
        .input('model', data[9])
        .input('size', data[10])
        .input('node', null)
        .input('nin', data[6])
        .input('personal', data[7])
        .query`
            insert into Monitor_Spec 
                (Fk_Status_01, Fk_Location_02, FK_County_Id, FK_City_Id, FK_Office_Id, Asset_No, Serial_No, UserName, Create_DateTiime, User_Date, Comment, Is_Deleted, Is_Active, FK_Mark, FK_Model, FK_Size, Fk_Node_Kind_10, National_Code, Personeli_Code)
            values 
                (@status, @state, @county, @city, @office, @asset, @serial, @username, @createdatetime, @userdate, @comment, @isdeleted, @isactive, @mark, @model, @size, @node, @nin, @personal)
        `
    })
}

// Delete Single Monitor Ticked
exports.dataDelete = async function(id) {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .input('id', id)
        .query`
            delete from Monitor_Spec_His where Fk_Monitor_Spec_Id = @id
            delete from Monitor_Spec where Id = @id
        `
    })
}

// Get Single Edit Ticket
exports.monitorEditGet = async function(id) {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .input('id', id)
        .query`
            select 
                ms.Id,
                bi.Name as StateName,
                bi.Id as StateId,
                co.CountyName as CountyName,
                co.Id as CountyId,
                ct.CityName as CityName,
                ct.Id as CityId,
                oc.Office_Name as OfficeName,
                oc.Id as OfficeId,
                b2.Name as NodeKind,
                b2.Id as NodeId,
                b3.Name as StatusName,
                b3.Id as StatusId,
                b4.Name as MarkName,
                b4.Id as MarkId,
                b5.Name as ModelName,
                b5.Id as ModelId,
                b6.Name as SizeName,
                b6.Id as SizeId,
                Asset_No,
                Serial_No,
                Comment,
                National_Code,
                Personeli_Code,
                ms.Create_DateTiime
            from Monitor_Spec ms 
                left join Base_Info bi on ms.Fk_Location_02 = bi.Id
                left join County co on ms.FK_County_Id = co.Id
                left join City ct on ms.FK_City_Id = ct.Id
                left join Office oc on ms.FK_Office_Id = oc.Id
                left join Base_Info b2 on ms.Fk_Node_Kind_10 = b2.Id
                left join Base_Info b3 on ms.Fk_Status_01 = b3.Id
                left join Base_Info b4 on ms.FK_Mark = b4.Id
                left join Base_Info b5 on ms.FK_Model = b5.Id
                left join Base_Info b6 on ms.FK_Size = b6.Id
            where ms.Id = @id
        `
    })
}

// Update Single Monitor Ticket
exports.dataUpdate = async function(data) {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        console.log(data)
        return pool.request()
        .input('status', 1)
        .input('state', data[0])
        .input('county', data[1])
        .input('city', data[2])
        .input('office', data[3])
        .input('asset', data[4])
        .input('serial', data[5])
        .input('username', 'admin')
        .input('createdatetime', data[11])
        .input('userdate', null)
        .input('comment', data[12])
        .input('isdeleted', 0)
        .input('isactive', 1)
        .input('mark', data[8])
        .input('model', data[9])
        .input('size', data[10])
        .input('node', null)
        .input('nin', data[6])
        .input('personal', data[7])
        .input('id', data[13])
        .query`
            update 
                Monitor_Spec 
            set
                Fk_Status_01= @status, Fk_Location_02= @state, FK_County_Id= @county, FK_City_Id= @city, FK_Office_Id= @office, Asset_No= @asset, Serial_No= @serial, UserName= @username, Create_DateTiime= @createdatetime, User_Date= @userdate, Comment= @comment, Is_Deleted= @isdeleted, Is_Active= @isactive, FK_Mark= @mark, FK_Model= @model, FK_Size= @size, Fk_Node_Kind_10= @node, National_Code= @nin, Personeli_Code= @personal
            where 
                Id= @id
        `
    })
}