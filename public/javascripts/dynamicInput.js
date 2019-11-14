function CurrentFirst() {
    $('#ul__DC_Server_Hard select.drp').each(function () {
        if ($(this).val() > 0) {
            $(this).parent().parent().parent().parent().show();
            let ch = $('#ul__DC_Server_Hard li').filter(':visible').length;
            $('#txtHard_Count').val(ch);
        }
    });
}

function HideFirst() {
    $('.showLess_DC_Server_Hard').each(function () {
        $(this).click(function () {
            $(this).parent().parent().hide();
            $('select:hidden').val("");
            let ch = $('#ul__DC_Server_Hard li').filter(':visible').length;
            $('#txtHard_Count').val(ch);
        });
    });
}



function ShowFirst() {
    let size_li = $("#ul__DC_Server_Hard li").size();
    let x = 0;
    $('#ul__DC_Server_Hard li:lt(' + x + ')').show();
    $("#loadMore_DC_Server_Hard").click(function () {
        x = (x <= size_li) ? x + 1 : size_li;
        $('#ul__DC_Server_Hard li:hidden:first').show();
        let ch = $('#ul__DC_Server_Hard li').filter(':visible').length;
        $('#txtHard_Count').val(ch);
    });
}