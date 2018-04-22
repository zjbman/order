$(function () {
    var tableh = window.innerHeight > 0 ? window.innerHeight : window.screen.height;

    $('#table').bootstrapTable({
        url: rootPath + '/businessManager/List.html',
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
        queryParams: function (params) {
            return {
                page: params.offset / params.limit + 1, //当前页码,默认是上面设置的1(pageNumber)
                rows: params.limit,//页面大小
                startdate: startdate,
                enddate: enddate,
                appname: appname,
                advertid: advertid,
                advertiserid: advertiserid,
                adstyle: adstyle,
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
        columns: [[
            {field: 'id', title: 'ID', sortable: true},
            {field: 'datetime', title: '入驻日期', sortable: true},
            {field: 'businessName', title: '商家名', sortable: true},
            {field: 'contact', title: '联系人', sortable: true},
            {field: 'telephone', title: '联系方式', sortable: true},
            {field: 'address', title: '地址', sortable: true}
        ]],
    }); // 表格结束


});

function add() {
    console.log("点击了商家入驻")
}

function formatNum(num) {
    if (Math.floor(num) == num) {
        return num;
    } else {
        return num.toFixed(2);
    }
}

function aveformat(rows, field) {
    var count = 0;
    var len = rows.length;
    for (var i in rows) {
        count += rows[i][field] * 1;
    }
    var ornum = count / len;

    return formatNum(ornum);
}


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