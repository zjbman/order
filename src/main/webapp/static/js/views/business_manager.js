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

        //这是页面中 查询 时的参数
        queryParams: function (params) {
            return {
                page: params.offset / params.limit + 1, //当前页码,默认是上面设置的1(pageNumber)
                rows: params.limit,//页面大小

                // datetime: datetime,
                // businessName: businessName,
                // contact: contact,
                // telephone: telephone,
                // address: address,
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
            {field: 'datetime', title: '入驻日期', sortable: true},
            {field: 'businessName', title: '商家名', sortable: true},
            {field: 'contact', title: '联系人', sortable: true},
            {field: 'telephone', title: '联系方式', sortable: true},
            {field: 'address', title: '地址', sortable: true}
        ]],
    }); // 表格结束


});

function add() {
    // console.log("点击了商家入驻")
}

function show() {
    var row = getSelectRow();
    console.log(row);
    if (row != false) {
        window.open(rootPath + "/goods/Page.html?id=" + row[0].id, "pageFrame");
    }
}

function del() {
    var row = getSelectRow();
    if (row != false) {
        deletFormat(rootPath + '/businessManager/Delete.html?id=' + row[0].id);
    }
}

function save() {

    var businessName = $('#businessName').val();
    var contact = $('#contact').val();
    var telephone = $('#telephone').val();
    var address = $('#address').val();
    var id = $('#id').val();

    if (businessName == null || businessName == "" ||
        contact == null || contact == "" ||
        telephone == null || telephone == "" ||
        address == null || address == "") {

        Ewin.confirm({
            title: "提示",
            message: "请填写完整信息!"
        });
        return false;
    }


    $.ajax({
        url: rootPath + '/businessManager/Save.html',
        type: "post",
        data: {
            "id": id,
            'businessName': businessName,
            'contact': contact,
            'telephone': telephone,
            'address': address
        },
        dataType: "json",
        success: function (data) {
            $('#win1').modal('hide');
            if (isDataOk(data, "保存成功", data.msg)) {
                $('#table').bootstrapTable('refresh');
            }
        }
    });
}

function update() {
    var row = getSelectRow();
    if (row) {
        Winedit(row[0].businessName + "--修改", row[0].id);
    }
}

//弹窗
function Winedit(name, id) {
    $("#win1title").html(name);

    //修改
    if (id != "") {
        $.ajax({
            url: rootPath + '/businessManager/Find.html',
            type: "post",
            data: {"id": id},
            dataType: "json",
            success: function (data) {
                if (data.code == 12) {
                    Ewin.confirm({
                        title: "fail",
                        message: '无权限访问!  ' + data.errorMessage
                    });
                    $('#win1').modal('hide');
                    return false;
                }
                $('#id').val(data[0].id);//不能少了给弹窗中的id赋值了
                $('#businessName').val(data[0].businessName);
                $('#contact').val(data[0].contact);
                $('#telephone').val(data[0].telephone);
                $('#address').val(data[0].address);
            }
        });
    }

    //展示弹窗
    $('#win1').modal('show');
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