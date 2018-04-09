/**
 * Created by Administrator on 2017/3/30 0030.
 */
var editRow1 = undefined;
//权重配置面板
function WinConfigedit(){

	 $('#datetimepicker1').datetimepicker({  
		    format: 'YYYY-MM-DD',  
		    locale: moment.locale('zh-cn')//,  
		    //minDate: '2016-7-1'  
		});  
		$('#datetimepicker2').datetimepicker({  
		    format: 'YYYY-MM-DD',  
		    locale: moment.locale('zh-cn')  
		}); 
	
	
	$.ajax({
		url: rootPath+"/advert/Select.html",
          dataType: 'json',
          success : function(data){
        	  $("#wadvertid").select2({
        		 data:mapData(data),
        		 language: "zh-CN",
        		 allowClear: true
        	 });
        	 
          }
	});
	   
	$("#wadstyle").select2({
		data:mapData(adstyle,"value","text"),
		 language: "zh-CN",
		 allowClear: true
	});
    
	$("#wadstate").select2({
		data:mapData(adstate),
		 language: "zh-CN",
		 allowClear: true
	});
   GetTable1();
      $('#WeightWin').modal('show');
	 $("#WeightWintitle").html("广告权重配置");

function GetTable1() {
    $('#weighttable').bootstrapTable({

        url: rootPath+'/advertweight/List.html',  //请求后台的URL（*）
        method: 'post',   //请求方式（*）
        dataType: "json",
        contentType : "application/x-www-form-urlencoded",
        responseHandler: function(data){
    		if(data.code==12)
			{
		    	Ewin.confirm({ title:'fail',
		    		 message: '无权限访问!  '+data.errorMessage
		    		 });
				return false;
			}	
			if (data.d){
				return data.d;
			} else {
				return data.rows;
			}
		},
		
		queryParams:function(params) {
			   startdate: $('#startdate').data().date;
	           enddate: $('#enddate').data().date;
	           var advertid=$('#wadvertid').val();
	           var adstate=$('#wadstate').val();
	           var adstyle=$('#wadstyle').val();
			return {  
			      page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			      rows: params.limit,//页面大小
			      startdate:startdate,
			      enddate:enddate,
			      adstate: adstate,
				  advertid:advertid,
				  adstyle:adstyle
			      };  
		},
	    striped:true,//出现斑马线
	    checkboxHeader:false,
	    singleSelect:true,
	    sidePagination: "client",  //分页方式：client客户端分页，server服务端分页（*）
		pagination: true,   //是否显示分页（*）
		pageNumber:1,   //初始化加载第一页，默认第一页
		pageSize:20,   //每页的记录行数（*）
		pageList: [10, 20, 30, 50] ,//可供选择的每页的行数（*） 
		height:getTableHeight($('#weighttable')),
        columns: [[
            {field: 'id', hidden: 'true'},
            {field: 'advertid', hidden: 'true'},
            {field: 'rank', title: '排名', width: '80',editable: { type: 'number', options: { required: true }}},
            {field: 'advertname', title: '广告', width: '120'},
            {field: 'adstyle', title: '广告样式', width: '80',formatter: function(value,row,index){
                if(value==1)
                {
                    return "插屏";
                }
                if(value==2)
                {
                    return "banner";
                }
                if(value==3)
                {
                    return "全屏";
                }
                if(value==4)
                {
                    return "开屏";
                }
                if(value==5)
                {
                    return "视频";
                }
            }
            },
            {field:'isconfig',title:'广告状态',width:'80',sortable:true,formatter:function(value,row,index){
                if(value==null)
                {
                    return  "<a style='color:blue;'>待投放</a>";
                }
                if(value==1)
                {
                    return "<a style='color:red;'>停止投放</a>";
                }
                if(value==2)
                {
                    return "<a>投放中</a>";
                }
                if(value==3)
                {
                    return "<a style='color:#1cff5f;'>排期中</a>";
                }
            },
            },
            {field: 'startdate',title: '投放开始',width: '120'},
            {field: 'enddate', title: '投放结束', width: '120'},
            {field: 'ecpm', title: '3天平均ecpm', width: '80'},
            {field: 'source', title: '分数', width: '80',editable: { type: 'number', options: { required: true }}},
            {field: 'weight', title: '权重', width: '80',editable: { type: 'number', options: { required: true }}},
            {field: 'hrank', title: '历史排名', width: '80'},
            {field: 'datetime', title: '生效日期', width: '120'},
            {field: 'upecpmDate', title: '数据更新日期', width: '120'},
            {field: 'UserNameByUpdate', title: '修改人', width: '120'},
            {field: 'updateDate', title: '修改日期', width: '120'},
        ]],

        onDblClickRow:function(rowIndex, rowData) {
            if (editRow1 != undefined) {
                $("#weighttable").bootstrapTable('endEdit', editRow1);
            }
            if (editRow1 == undefined) {
                $("#weighttable").bootstrapTable('beginEdit', rowIndex);
                editRow1 = rowIndex;
            }
        },
        onAfterEdit: function (rowIndex, rowData, changes){
            editRow1 = undefined;
        },
        onClickRow: function (rowIndex, rowData) {
            if (editRow1 != undefined) {
                $("#weighttable").bootstrapTable('endEdit', editRow1);
            }
        }

    });

}

function wquery(){
    $('#table').bootstrapTable('refresh');
}
function wsave(){

    $("#weighttable").datagrid('endEdit', editRow1);
    var rows1 = $("#weighttable").datagrid('getChanges');
    var rowstr1 = JSON.stringify(rows1);
    $.ajax({
        url:rootPath+'/advertweight/Save.html',
        type:"post",
        data:{"detail":rowstr1},
        dataType:"json",
        success: function(data){
            $('#win2').window('close');
            if(data.code==12)
            {
                $.messager.alert('fail', '无权限访问!  '+data.errorMessage);
                return false;
            }
            if(data.msg==null)
            {
                jQuery.messager.alert('提示:',' 保存成功!','info');
            }
            else
            {
                jQuery.messager.alert('提示:',' 保存失败!'+data.msg,'info');
            }
            $('#table').datagrid('reload');
        }
    });
}
}