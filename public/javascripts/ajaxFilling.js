$(document).ready(function() {
    $('#state').change(function() {
        var item = $('#state').val();
        $.ajax({
            type: 'GET',
            data: { selectedId: item },
            url: '/cascade/county',
            dataType: 'json',
            success: (function(data) {
                $('#county').empty();
                $.each(data, function(index, countyObj) {
                $('#county').append("<option value = '" + countyObj.Id + "' > " + countyObj.CountyName + "</option > ");
                })
            })
        })
    })
})

$(document).ready(function() {
    $('#county').change(function() {
        var item = $('#county').val();
        $.ajax({
            type: 'GET',
            data: { selectedId: item },
            url: '/cascade/city',
            dataType: 'json',
            success: (function(data) {
                $('#city').empty();
                $.each(data, function(index, cityObj) {
                $('#city').append("<option value = '" + cityObj.Id + "' > " + cityObj.CityName + "</option > ");
                })
            })
        })
    })
})

$(document).ready(function() {
    $('#city').change(function() {
        var item = $('#city').val();
        $.ajax({
            type: 'GET',
            data: { selectedId: item },
            url: '/cascade/office',
            dataType: 'json',
            success: (function(data) {
                $('#office').empty();
                $.each(data, function(index, officeObj) {
                $('#office').append("<option value = '" + officeObj.Id + "' > " + officeObj.Office_Name + "</option > ");
                })
            })
        })
    })
})