$(function() { 

	//市场选择控件
	$.ajax({
		url : rootPath+"/market/Select.html",
		dataType : 'json',
        async : false,
        success : function(data){
        	$("#marketKeys,#marketKey").jSelect({
     			data : data,
     			datakey : ["marketkey", "name"],
     		 	multiple : false
     		});
        }
	});

	//广告选择控件
    $.ajax({
        url: rootPath+"/advert/Select.html",
        dataType: 'json',
        async:false,
        success : function(data){
            $("#advertId").jSelect({
                data:data,
                datakey:["id","name"],
                multiple:false
            });

        }
    });

    //广告样式选择控件
    $("#style").jSelect({
        data : adstyle,
        datakey : ["value", "text"],
        multiple : false
    });

    $("#style").jSelect("addMenuClick", function(){ //改变广告或者广告样式
        changeAdvertAndStyle();
    })

    //应用选择控件
    $.ajax({
        url : rootPath + "/app/Select.html",
        dataType : 'json',
        async : false,
        success : function(data){
            $("#appKeys,#appKey").jSelect({
                data : data,
                datakey : ["appkey", "name"],
                multiple : false
            });
        }
    });

    //版本选择控件
    $.ajax({
        url : rootPath+"/sdkupdate/Select.html",
        dataType : 'json',
        async : false,
        success : function(data){
            $("#version").jSelect({
                data : data,
                datakey : ["fileversion", "fileversion"],
                multiple : false
            });
        }
    });

    $("#version").jSelect("addMenuClick", function(){ //改变SDK版本时
        changeSdkVersion();
    })

    //部门选择控件
    $.ajax({
        url: rootPath + "/sys/department/Select.html",
        dataType: 'json',
        async: false,
        success: function (data) {
            $("#toAddress").jSelect({
                data: data,
                datakey: ["id", "name"],
            });
        }
    });

    //频率选择控件
    $("#frequency").jSelect({
        data: frequency,
        datakey: ["value", "text"],
        multiple: false
    });

    //联动行为选择控件
    $("#action").jSelect({
        data : relatedAction,
        datakey : ["value", "text"],
        multiple : false
    });

    //时间控件
    $("#pick").daterangepicker({
        locale : {
            format : "YYYY/MM/DD HH:mm:ss"
        },
        startDate : moment().subtract(1, 'days'),
        endDate : moment().subtract(1, 'days'),
        showCustomRangeLabel : true,
        timePicker : true, //显示小时分钟
        timePicker24Hour : true, //24小时制
        isShowing : true,
    });

	//生成列表
	$('#table').bootstrapTable({
		url : rootPath + '/lMonitor/list.html',
		method : 'post',
		contentType : "application/x-www-form-urlencoded",
		responseHandler : function(data){
			if(data.code == 12){
		    	Ewin.alert({title : 'fail', message : '无权限访问! ' + data.errorMessage});
				return false;
			}
			if(data.d){
				return data.d;
			}else{
				return {"total" : data.total, "rows" : data.rows};
			}
		},
		queryParams:function(params) {
            var marketKeys = $('#marketKeys').selectVal();
            var appKeys = $('#appKeys').selectVal();
			return {
				page : params.offset/params.limit + 1, //当前页码,默认是上面设置的1(pageNumber)
			    rows : params.limit, //页面大小
				sortName : params.sort,
				sortOrder : params.order,
                marketKeys : marketKeys,
                appKeys : appKeys
			};
		},
		height:getTableHeight(),
        columns:[[
        	{field : 'ck', checkbox : true },
            {field : 'id', title : 'id', sortable : true},
            {field : 'version', title : 'SDK版本', sortable : true},
            {field : 'appName', title : '应用名称', sortable : true},
            {field : 'marketName', title : '市场名称', sortable : true},
            {field : 'advertName', title : '广告名称', sortable : true},
            {field : 'style', title : '样式', sortable : true,
                formatter: function(value){
                    var text = "";
                    if(value == 1){
                        text += "插屏";
                    }else if(value == 2){
                        text += "banner";
                    }else if(value == 3){
                        text += "全屏";
                    }else if(value == 4){
                        text += "开屏";
                    }else if(value == 5){
                        text += "视频";
                    }else if(value == 6){
                        text += "开屏视频";
                    }else if(value == 7){
                        text += "动画中心视频";
                    }else if(value == 8){
                        text += "游戏墙";
                    }else if(value == 9){
                        text += "做梦视频";
                    }
                    return text;
                }
            },
            {field: 'dimension', title: '监控维度', sortable: true,
                formatter: function (value) {
                    if (value == 0) {
                        return "填充率";
                    } else if (value == 1) {
                        return "展示率";
                    } else if (value == 2) {
                        return "点击率";
                    } else if (value == 3) {
                        return "播放率";
                    } else if (value == 4) {
                        return "下载率";
                    } else if (value == 5) {
                        return "安装率";
                    } else if (value == 6) {
                        return "平均活跃请求";
                    } else if (value == 7) {
                        return "平均活跃展示";
                    } else if (value == 8) {
                        return "活跃数";
                    } else if (value == 9) {
                        return "请求数";
                    } else if (value == 10) {
                        return "发送数";
                    } else if (value == 11) {
                        return "展示数";
                    } else if (value == 12) {
                        return "点击数";
                    } else if (value == 13) {
                        return "开始播放数";
                    } else if (value == 14) {
                        return "结束播放数";
                    } else if (value == 15) {
                        return "落地页面点击数";
                    } else if (value == 16) {
                        return "数据差异";
                    } else if (value == 17) {
                        return "环比/同比";
                    } else if (value == 18) {
                        return "限量消耗百分比";
                    } else if (value == 19) {
                        return "投放排期提示";
                    } else if (value == 20) {
                        return "结束投放提示";
                    } else if (value == 21) {
                        return "Ecpa";
                    } else {
                        return "Ecpm";
                    }
                }
            },
            {field : 'minThreshold', title : '最小阀值', sortable : true},
            {field : 'maxThreshold', title : '最大阀值', sortable : true},
            {field : 'beginTime', title : '开始时间', sortable : true},
            {field : 'endTime', title : '结束时间', sortable : true},
            {field: 'frequency', title: '频率(分钟)', sortable: true,
                formatter: function (value) {
                    return value+" 分钟";
                }
            },
            {field : 'times', title : '次数', sortable : true},
            {field : 'toAddress', title : '通知对象', sortable : true,
                formatter: function(value){
		            var toAddress = value.split(",");
		            var returnStr = "";
		            for(var i = 0; i < toAddress.length; i++){
		                if(value[i] == "4"){
                            returnStr += "研发部,";
                        }else if(value[i] == "5"){
                            returnStr += "未知部门,";
                        }else if(value[i] == "6"){
                            returnStr += "广告商务部,";
                        }else{
                            returnStr += "";
                        }
                    }
                    returnStr = returnStr.substring(0, returnStr.length-1);
                    return returnStr;
                }
            },
            {field : 'action', title : '联动行为', sortable : false,
                formatter: function(value){
                    if(value == 1){
                        return "切量";
                    }else if(value == 2){
                        return "开投";
                    }else if(value == 3){
                        return "停投";
                    }else if(value == 4){
                        return "排名";
                    }else if(value == 5){
                        return "渠道广告";
                    }else{
                        return "";
                    }
                }
            }
        ]],

        height : getTableHeight(),
        striped : true, //出现斑马线
        checkboxHeader : false,
        singleSelect : true,
        sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
        pagination : true, //是否显示分页（*）
        pageNumber : 1, //初始化加载第一页，默认第一页
        pageSize : 20, //每页的记录行数（*）
        pageList : [10, 20, 30, 50] //可供选择的每页的行数（*）
    });

});


function add(){
	Winedit("新增", "");
}


//修改
function update(){
	var row = $('#table').bootstrapTable('getSelections');
    if(row.length == 0){
    	Ewin.alert({ title : "温馨提示", message : "请选择操作的记录!"});
        return false;
    }
    Winedit(row[0].id + "--修改", row[0].id);
}


//删除
function delet(){
	var row = $('#table').bootstrapTable('getSelections');
    if(row.length == 0){
        Ewin.alert({ title : "温馨提示", message : "请选择操作的记录!"});
        return false;
    }
	del(row[0].id);
}


//编辑面板
function Winedit(name, id){
    doReset();
	$("#win1title").html(name);
	if(id != ""){
		$.ajax({
   			url : rootPath + '/lMonitor/find.html',
   		  	type : "post",
   		  	data : {"id" : id},
   		  	dataType : "json",
   		  	success : function(data){
          		if(data.code == 12){
          			Ewin.alert({title : "fail", message : '无权限访问! ' + data.errorMessage});
          			$('#win1').modal('hide');
       				   return false;
       			}

                $('#version').selectVal(parseInt(data[0].version));
                $('#appKey').selectVal(data[0].appKey);
                $('#advertId').selectVal(data[0].advertId);
                $('#marketKey').selectVal(data[0].marketKey);
                $('#style').selectVal(parseInt(data[0].style));
                $('#action').selectVal(parseInt(data[0].action));
          		$('#id').val(data[0].id);
                $('#minThreshold').val(data[0].minThreshold);
                $('#maxThreshold').val(data[0].maxThreshold);
                $('#frequency').selectVal(data[0].frequency);
                $('#times').val(data[0].times);
                if(data[0].toAddress){
                    if(data[0].toAddress.indexOf(",") != -1){
                        var toAddress = data[0].toAddress.split(",");
                        $('#toAddress').selectVal(toAddress);
                    }else{
                        $('#toAddress').selectVal([data[0].toAddress]);
                    }
                }
				$('#content').val(data[0].content);
				$('#dimensionClassify').val(data[0].dimensionClassify.toString());
                var pick = data[0].beginTime.replace(/-/g, "/") + " - " + data[0].endTime.replace(/-/g, "/");
                $('#pick').val(pick);

                var dimension = parseInt(data[0].dimension);
                initDimensionSelected(dimension);
            },
   		  	error:function(e){
   				console.log(e);
   		  	}
   	 	});
	}
	$('#win1').modal('show');
	hideIndex1();
    hideIndex2();
    hideIndex3();
    hideIndex4();
}


//保存
function save(){

    var id = $('#id').val();
    var version = $('#version').val();
    var marketName = $('#marketKey').val();
    var marketKey = $('#marketKey').selectVal();
    var appName = $('#appKey').val();
    var appKey = $('#appKey').selectVal();
    var advertName = $('#advertId').val();
    var advertId = $('#advertId').selectVal();
    var style = $('#style').selectVal();
    var dimensionClassify = $('#dimensionClassify').val();
    var dimension = $('#dimensionSelected').val();
    var minThreshold = $('#minThreshold').val();
    var maxThreshold = $('#maxThreshold').val();
    var frequency = $('#frequency').selectVal();
    var times = $('#times').val();
    var toAddress = $('#toAddress').selectVal();
    var content = $('#content').val();
    var action = $('#action').selectVal();
    var begin, end;
    var pick = $('#pick').val();
    if(!!pick){
        pick = pick.split("-");
        begin = pick[0].trim();
        end = pick[1].trim();
    }

    $.ajax({
        url : rootPath + '/lMonitor/saveOrUpdate.html',
        type : "post",
        data :
            {
                'id' : id,
			 	'version' : version,
			 	'marketName' : marketName,
			 	'marketKey' : marketKey,
				'appName' : appName,
				'appKey' : appKey,
				'advertName' : advertName,
				'advertId' : advertId,
				'style' : style,
                'dimensionClassify' : dimensionClassify,
                'dimension' : dimension,
                'minThreshold' : minThreshold,
                'maxThreshold' : maxThreshold,
                'begin' : begin,
                'end' : end,
                'frequency' : frequency,
                'times' : times,
				'toAddress' : toAddress,
				'content' : content,
				'action' : action
			},
	    dataType : "json",
	    success : function(data){
			$('#win1').modal('hide');
      			if(data.code == 12){
      		    	Ewin.alert({ title : "fail", message: '无权限访问! ' + data.errorMessage});
   				   return false;
   			     }
      			if(data.msg == null){
      				Ewin.alert({ title : '提示:', message : '保存成功!', icon : "glyphicon-ok"});
      			}else{
      				Ewin.alert({ title : '提示:', message : '保存失败!', icon : "glyphicon-remove"});
      			 }
      			$('#table').bootstrapTable('refresh');
		  }
	 });
}


//删除
function del(id){
	$.ajax({
		url : rootPath + '/lMonitor/delete.html',
 		type : "post",
 		data : {"id" : id},
 		dataType : "json",
 		success : function(data){
        	if(data.code == 12){
        		Ewin.alert({title : "fail", message : '无权限访问! ' + data.errorMessage});
        		$('#win1').modal('hide');
     			return false;
     		}
        	if(data.msg == null){
        		Ewin.alert({title : '提示:', message : '删除成功!', icon : "glyphicon-ok"});
			}else{
        		Ewin.alert({title : '提示:', message : '删除失败!', icon : "glyphicon-remove"});
        	}
       		$('#table').bootstrapTable('refresh');
 		}
 	});
}


//查询
function query(){
    $('#table').bootstrapTable('refresh');
}


function doReset(){
    var table = document.getElementById("inputTable");
    var inputs = table.getElementsByTagName("input");
    for(var k = 0; k < inputs.length; k++){
        inputs[k].value = "";
    }
}
