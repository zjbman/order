$(function () {
    var tableh = window.innerHeight > 0 ? window.innerHeight : window.screen.height;

    $('#table').bootstrapTable({
        url: rootPath + '/userManager/List.html',
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
            {field: 'username', title: '用户账号', sortable: true},
            {field: 'password', title: '账号密码', sortable: true},
            {field: 'name', title: '用户昵称', sortable: true},
            {field: 'telephone', title: '电话号码', sortable: true},
            {field: 'email', title: 'Email', sortable: true},
            {field: 'qq', title: 'QQ', sortable: true},
            {field: 'createDate', title: '注册日期', sortable: true},
            {field: 'updateDate', title: '修改日期', sortable: true},
            {field: 'state', title: '账号状态', sortable: true}
        ]],
    }); // 表格结束


});

function add() {
    Winedit("新增", "");
}

function update() {
    var row = getSelectRow();
    if (row) {
        Winedit(row[0].name + "--修改", row[0].id);
    }
}

function blacklist() {
    var row = getSelectRow();
    if (row != false) {
        deletFormat(rootPath + '/userManager/Blacklist.html?id=' + row[0].id);
    }
}


//弹窗
function Winedit(name, id) {
    $("#win1title").html(name);

    //修改
    if (id != "") {
        $.ajax({
            url: rootPath + '/userManager/Find.html',
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

                $('#id').val(data[0].id);
                $('#username').val(data[0].username);
                $('#password').val(data[0].password);
                $('#name').val(data[0].name);
                $('#telephone').val(data[0].telephone);
                $('#email').val(data[0].email);
                $('#qq').val(data[0].qq);
            }
        });
    }

    //新增
    $('#win1').modal('show');
}

function save() {
    var id;
    if ($("#win1title").html() == "新增") {
        id = null;
    } else {
        id = $('#id').val();
    }

    var username = $('#username').val();
    var password = $('#password').val();
    var name = $('#name').val();
    var telephone = $('#telephone').val();
    var email = $('#email').val();
    var qq = $('#qq').val();


    if (username == null || username == "" ||
        password == null || password == "" ||
        name == null || name == "" ||
        telephone == null || telephone == ""
        ) {

        Ewin.confirm({
            title: "提示",
            message: "账号、密码、昵称或电话号码不能为空!"
        });
        return false;
    }


    $.ajax({
        url: rootPath + '/userManager/Save.html',
        type: "post",
        data: {
            "id": id,
            'username': username,
            'password': password,
            'name': name,
            'telephone': telephone,
            'email': email,
            'qq': qq
        },
        dataType: "json",
        success: function (data) {
            $('#win1').modal('hide');
            if (isDataOk(data, "保存成功", "保存失败")) {
                $('#table').bootstrapTable('refresh');
            }
        }
    });
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