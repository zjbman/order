$(function () {
    var tableh = window.innerHeight > 0 ? window.innerHeight : window.screen.height;

    $.ajax({
        url: rootPath + "/app/Select.html",
        dataType: 'json',
        async: false,
        success: function (data) {
            $("#app").jSelect({
                data: data,
                datakey: ["appkey", "name"],
                multiple: false
            });

            $("#appkey").jSelect({
                data: data,
                datakey: ["appkey", "name"],
                multiple: true
            });
        }
    });
    $.ajax({
        url: rootPath + "/market/Select.html",
        dataType: 'json',
        async: false,
        success: function (data) {
            $("#market").jSelect({
                data: data,
                datakey: ["marketkey", "name"],
                multiple: false
            });

            $("#marketkey").jSelect({
                data: data,
                datakey: ["marketkey", "name"],
                multiple: true
            });
        }
    });


    $('#table').bootstrapTable({
        url: rootPath + '/payment/List.html',
        method: 'post',   // 请求方式（*）
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        height: getTableHeight(),
        responseHandler: function (data) {
            if (data.code == 12) {
                Ewin.alert({
                    title: 'fail',
                    message: '无权限访问!  ' + data.errorMessage
                });
                return false;
            }
            if (data.d) {
                return data.d;
            } else {
                return {
                    "total": data.total,
                    "rows": data.rows
                };
            }
        },
        queryParams: function (params) {
            var app = $('#app').selectVal();
            var market = $('#market').selectVal();
            var province1 = $('#province1').val();
            var payment = $('#payment1').selectVal();
            return {
                payment:payment,
                province1: province1,
                app: app,
                market: market,
                page: params.offset / params.limit + 1, // 当前页码,默认是上面设置的1(pageNumber)
                rows: params.limit,// 页面大小
                sortName: params.sort,
                sortOrder: params.order,
            };
        },
        striped: true,// 出现斑马线
        checkboxHeader: false,
        singleSelect: true,
        sidePagination: "server",  // 分页方式：client客户端分页，server服务端分页（*）
        pagination: true,   // 是否显示分页（*）
        pageNumber: 1,   // 初始化加载第一页，默认第一页
        pageSize: 20,   // 每页的记录行数（*）
        pageList: [10, 20, 30, 50], // 可供选择的每页的行数（*）
        columns: [[
            {field: 'ck', checkbox: true},
            {field: 'id', title: 'id', sortable: true,},
            {field: 'appname', title: '应用', sortable: true},
            {field: 'marketname', title: '渠道', sortable: true},
            {field: 'province', title: '省份', sortable: true},
            {
                field: 'payment', title: '支付方式', sortable: true, formatter: function (value, row, index) {
                if (value == 0) {
                    return "miguPay";
                }
                if (value == 1) {
                    return "channelPay";
                }
                if (value == 2) {
                    return "其他";
                }
            },
            },

        ]],
    });

});


$("#payment").jSelect({
    data: adpayment,
    datakey: ["value", "text"],
    multiple: false
});


$("#province1").jSelect({
    data: province,
    datakey: ["value", "text"],
    multiple: false
});

$("#payment1").jSelect({
    data: adpayment,
    datakey: ["value", "text"],
    multiple: false
});


$("#province").jSelect({
    data: province,
    datakey: ["value", "text"],
    multiple: true
});


// 编辑面板
function Winedit(name, id) {

    $("#win1title").html(name);
    $('#id').val("");
    $('#appkey').selectVal("");
    $('#marketkey').selectVal("");
    $('#province').selectVal("");
    $('#payment').selectVal("");


// doReset();
    if (id != "") {
        $('#approw').show();
        $('#markeyrow').show();
        $('#provincerow').show();

        $('#appname').html("应用key：");
        $('#markeyname').html("渠道key：");

        $.ajax({
            url: rootPath + '/payment/Find.html',
            type: "post",
            data: {"id": id},
            dataType: "json",
            success: function (data) {
                if (data.code == 12) {
                    Ewin.alert({
                        title: "温馨提示",
                        message: '无权限访问!  ' + data.errorMessage
                    });
                    $('#win1').modal('hide');
                    return false;
                }
                $('#id').val(data[0].id);
                $('#appkey').val(data[0].appkey).attr('disabled', true);
                $('#marketkey').val(data[0].marketkey).attr('disabled', true);
                $('#province').val(data[0].province);
                $('#payment').val((data[0].payment == 1) ? "channelPay" : "miguPay");
                //$('#payment').trigger('change');

            },
            error: function (e) {
            }
        });
    }
    $('#win1').modal('show');
}

// 保存
function save() {
    var appkey = $('#appkey').selectVal(); //获取到的是key，不是name
    var appname = $('#appkey').val();
    var payment = $('#payment').selectVal();

    var marketkey = $('#marketkey').selectVal();
    var marketname = $('#marketkey').val();

    var province = $('#province').selectVal();
    var provincename = $('#province').val();

    var path = '/payment/OnekeyUpdate.html';

    var titlename = $("#win1title").html();
    if (titlename == "一键修改") {
        if (appname == null || provincename == null || marketname == null || payment == "" || appname == "") {
            Ewin.alert({
                title: "温馨提示",
                message: "类型不能为空!"
            });
            return false;
        }

    }
    else {
        var id = $('#id').val();
        var appkey = $('#appkey').val();
        var marketkey = $('#marketkey').val();
        var province = $('#province').val();

        $('#payment').trigger('change');

        if (payment == "" || appkey == "" || marketkey == "" || province == "") {

            Ewin.alert({
                title: "温馨提示",
                message: "类型不能为空!"
            });
            return false;
        }

        path = '/payment/Save.html';
    }

    $.ajax({
        url: rootPath + path,
        type: "post",
        data: {
            "id": id, 'appkey': appkey, 'payment': payment,
            'marketkey': marketkey, 'province': province
        },
        dataType: "json",
        success: function (data) {
            $('#win1').modal('hide');
            if (data.code == 12) {
                Ewin.alert({
                    title: "fail",
                    message: '无权限访问!  ' + data.errorMessage
                });
                return false;
            }
            if (data.msg == null) {
                Ewin.alert({
                    title: "提示",
                    message: ' 保存成功!',
                    icon: "glyphicon-ok"
                });
            }
            else {
                Ewin.alert({
                    title: "fail",
                    message: ' 保存失败!',
                    icon: "glyphicon-remove"
                });
            }
            $('#table').bootstrapTable('refresh');
        }
    });
}

function query() {
    $('#table').bootstrapTable('refresh');
}

function detailedUpdate() {
    var row = $('#table').bootstrapTable('getSelections');
    if (row.length == 0) {
        Ewin.alert({
            title: "温馨提示",
            message: "请选择操作的记录!"
        });
        return false;
    }
    Winedit("详细修改", row[0].id);
}


function onekeyAppsUpdate() {
    Winedit("一键修改", "");
}

function doReset() {
    var tbl_content = document.getElementById("ctable");
    var inputs = tbl_content.getElementsByTagName("input");
    for (var k = 0; k < inputs.length; k++) {
        inputs[k].value = "";
    }
}



