$(document).ready(function () {
    $('#dtBasicExample').DataTable({
        'dom':' <"search"f><"top"l>rt<"bottom"ip><"clear">',
        'language': {
            'info': 'نمایش _START_ تا _END_ از _TOTAL_ مورد',
            'search': 'جستجو',
            'lengthMenu': 'نمایش _MENU_ مورد',
            'emptyTable': 'موردی یافت نشد',
            'infoEmpty': 'موردی یافت نشد',
            'infoFiltered': '( از _MAX_ مورد )',
            'zeroRecords': '- اطلاعات مورد نظر یافت نشد',
            'paginate': {
                'previous': 'قبل',
                'next': 'بعد'
            }
        }
    });
    $('.dataTables_length').addClass('bs-select');
    $('.dataTables_filter input').attr('placeholder', 'جستجو')
});