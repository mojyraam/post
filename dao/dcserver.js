const sql = require('mssql')
const db = require('../config/db')

// Get All Monitor Tickets
exports.dcserverSelect = async function(d) {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .input('location', d)
        .query`
            select 
                ds.Id,
                ds.Asset_No,
                ds.Serial_No,
                ds.Comment,
                bi.Name as StateName,
                co.CountyName,
                ct.CityName,
                dt.DC_Name,
                b2.Name as BrandName,
                b3.Name as ModelName,
                b4.Name as ProductionYear,
                b5.Name as ProcessorCount,
                b6.Name as ProcessorModel,
                b7.Name as ModuleCount,
                b8.Name as RamName,
                b9.Name as PowerCount,
                b10.Name as PowerWatt,
                b11.Name as OsName,
                b12.Name as RailKit
            from DC_Server ds
                left join Base_Info bi on ds.Fk_Location_02 = bi.Id
                left join County co on ds.FK_County_Id = co.Id
                left join City ct on ds.FK_City_Id = ct.Id
                left join DC_Data_Center dt on ds.FK_Data_Center_Id = dt.Id
                left join Base_Info b2 on ds.FK_Brand = b2.Id
                left join Base_Info b3 on ds.FK_Model = b2.Id
                left join Base_Info b4 on ds.FK_Production_Year = b4.Id
                left join Base_Info b5 on ds.FK_Processor_Count = b5.Id
                left join Base_Info b6 on ds.FK_Processor_Model = b6.Id
                left join Base_Info b7 on ds.FK_Module_Count = b7.Id
                left join Base_Info b8 on ds.FK_RAM = b8.Id
                left join Base_Info b9 on ds.FK_Power_Count = b9.Id
                left join Base_Info b10 on ds.FK_Power_Watt = b10.Id
                left join Base_Info b11 on FK_OS = b11.Id
                left join Base_Info b12 on FK_Rail_Kit = b12.Id
            where 
                ds.fk_location_02 = @location
        `
    })
}

// Get New Monitor Ticket Form
exports.dcserverCreateGet = async function() {
    return await new sql.ConnectionPool(db).connect().then(pool => {
        return pool.request()
        .query`
            select Name, Id, Type from Base_Info where Type = 2
            select Name, Id, Type from Base_Info where Type = 801
            select Name, Id, Type from Base_Info where Type = 802
            select Name, Id, Type from Base_Info where Type = 803
            select Name, Id, Type from Base_Info where Type = 804
            select Name, Id, Type from Base_Info where Type = 805
            select Name, Id, Type from Base_Info where Type = 806
            select Name, Id, Type from Base_Info where Type = 807
            select Name, Id, Type from Base_Info where Type = 808
            select Name, Id, Type from Base_Info where Type = 809
            select Name, Id, Type from Base_Info where Type = 810
            select Name, Id, Type from Base_Info where Type = 811
            select Name, Id, Type from Base_Info where Type = 820
            select Name, Id, Type from Base_Info where Type = 821
            select Name, Id, Type from Base_Info where Type = 822
            select Name, Id, Type from Base_Info where Type = 830
            select Name, Id, Type from Base_Info where Type = 831
            select Id, DC_Name from DC_Data_Center;
        `
    });
}

