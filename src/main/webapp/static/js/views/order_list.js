$(function () {
    var tableh = window.innerHeight > 0 ? window.innerHeight : window.screen.height;

    $('#table').bootstrapTable({
        url: rootPath + '/orderList/List.html',
        method: 'post',   //请求方式（*）
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        responseHandler: function (data) {
            if (data.code == 12) {
                Ewin.confirm({
                    title: 'fail',
                    message: '无权限访问!  ' + data.errorMessage
                });
                return false;
            }
            if (data.rows.length > 0) {
                creatHighcharts(data);
            }
            if (data.d) {
                return data.d;
            } else {
                return data.rows;
            }
        },

        //这是页面中 查询 时的参数
        queryParams: function (params) {
            return {
                page: params.offset / params.limit + 1, //当前页码,默认是上面设置的1(pageNumber)
                rows: params.limit,//页面大小

            };
        },

        onClickRow: function (rowIndex, rowData) {
            id = rowData.id;
        },
        height: tableh,
        striped: true, //出现斑马线
        checkboxHeader: false,
        singleSelect: true,
        showFooter: true,
        // sidePagination: "server",  //分页方式：client客户端分页，server服务端分页（*）
        pagination: true,   //是否显示分页（*）
        pageNumber: 1,   //初始化加载第一页，默认第一页
        pageSize: 20,   //每页的记录行数（*）
        pageList: [10, 20, 30, 50], //可供选择的每页的行数（*）
        columns: [[
            {field: 'ck', checkbox: true},
            {field: 'id', title: 'ID', sortable: true},
            {field: 'userName', title: '下单用户', sortable: true},
            {field: 'price', title: '总价钱', sortable: true},
            {field: 'date', title: '日期', sortable: true},
            {field: 'address', title: '配送地址', sortable: true},
            {field: 'businessName', title: '商家名', sortable: true},
            {field: 'goods', title: '下单商品', sortable: true},
            {field: 'telephone', title: '电话', sortable: true},
            {field: 'remark', title: '备注', sortable: true}
        ]],
    }); // 表格结束


});

function creatHighcharts(data) {

    var temp2 = data.rows[data.rows.length - 1].datetime;
    var sum2 = 0;
    var requestcount = new Array();//请求
    for (var i = 0; i < data.rows.length; i++) {
        if (temp2 == data.rows[data.rows.length - i - 1].datetime) {
            sum2 += data.rows[data.rows.length - i - 1].requestcount;
        }
        else {
            requestcount.push(sum2);
            temp2 = data.rows[data.rows.length - i - 1].datetime;
            sum2 = data.rows[data.rows.length - i - 1].requestcount;
            if (i == data.rows.length - 1) {
                requestcount.push(sum2);
            }
        }
    }
};