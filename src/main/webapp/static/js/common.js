
function mapData(data,key,value){
    var newdata=[];
    for(var item in data){
        var newobj={};
        newobj.id = data[item][key];
        newobj.text= data[item][value];
        newdata.push(newobj);
    }
    return newdata;
}

function ajaxSelect2(option){
    var op={
        url:"#",
        target:"",
        key:"value",
        value:"text",
        multiple:false,
    };
    $.extend(op,option);
    $.ajax({
        url: op.url,
        dataType: 'json',
        success : function(data){
            $(op.target).select2({
                data:mapData(data,op.key,op.value),
                language: "zh-CN",
                allowClear: true,
                multiple:op.multiple,
                placeholder:""
            });
        }
    });
}

function setTable(option){
    var tableh=window.innerHeight>0? window.innerHeight:window.screen.height;
    var op={
        url:"",
        addParams:function(){},
        columns:[],
        pagination: false,
        sidePagination: "client",  //分页方式：client客户端分页，server服务端分页（*）

        queryParams:function(params){},
        responseHandler: function(data){},
        target:"#table",
        method: 'post',
        dataType: "json",
        contentType:"application/x-www-form-urlencoded",
        height:tableh,
        striped:true,//出现斑马线
        checkboxHeader:false,
        singleSelect:true,
        pageNumber:1,   //初始化加载第一页，默认第一页
        pageSize:20,   //每页的记录行数（*）
        pageList: [10, 20, 30, 50]

    };
    $.extend(op,option);

    op.queryParams=function(params){
        var newParams={
            page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
            rows: params.limit,//页面大小
            sortName:params.sort,//排序字段
            sortOrder:params.order//排序方式
        };
        $.extend(newParams,op.addParams());
        return newParams;
    };
    op.responseHandler=function(data){
        if(data.code==12){
            Ewin.confirm({ title:'fail',message: '无权限访问!  '+data.errorMessage});
            return false;
        }
        if (data.d){
            return data.d;
        } else {
            return op.pagination ?  {"total":data.total,"rows":data.rows} : data.rows;
        }
    };
    //console.log(op)
    $(op.target).bootstrapTable(op);
};

//返回table选中的行
function getSelectRow(target){
    var tar=target || "#table";
    var row= $(tar).bootstrapTable('getSelections');
    if(row.length==0)
    {
        Ewin.confirm({ title: "温馨提示",
            message: "请选择操作的记录!"
        });
        return false;
    }else{
        return row;
    }
}

//删除模板
function deletFormat(url,target){
    var row = getSelectRow();
    var tar = target || '#table';
    if(row){
        $.ajax({
            url:url,
            type:"post",
            data:{"id":row[0].id},
            dataType:"json",
            success: function(data){
                console.log(data);
                if(isDataOk(data)){$(tar).bootstrapTable('refresh')};
            }
        });

    }
}


//查询
function query(){
    $('#table').bootstrapTable('refresh');
}

//返回数据操作提示
function isDataOk(data,successTip,failTip,noRightTip){
    var sc = successTip || "删除成功!";
    var fa = failTip || " 删除失败!";
    var nor= noRightTip ||"无权限访问!";
    if(data.code==12){
        Ewin.confirm({ title: "fail",
            message:nor+data.errorMessage
        });
        $(target).modal('hide');
        return false;
    }
    if(data.code == 200){
        Ewin.confirm({ title: '提示:',
            message: "保存成功!",
            icon:"glyphicon-remove"
        });
        return true;
    }
    if(data.code == 100){
        Ewin.confirm({ title: '提示:',
            message: "删除成功!",
            icon:"glyphicon-remove"
        });
        return true;
    }
    if(data.code == 102){
        Ewin.confirm({ title: '提示:',
            message: "保存失败！",
            icon:"glyphicon-remove"
        });
        return false;
    }
    if(data.msg == "保存成功"){
        Ewin.confirm({ title: '提示:',
            message: sc,
            icon:"glyphicon-ok"
        });
        return true;
    }else{
        Ewin.confirm({ title: '提示:',
            message: fa,
            icon:"glyphicon-remove"
        });
        return false;
    }
}


function setRowColor(i){

}