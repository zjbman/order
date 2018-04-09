var editRow = undefined;
$(function() {
	$("#advertisertype").jSelect({
		 data:adtype,
		 datakey:["value","text"],
		 multiple:false
    });
	$.ajax({
		url: rootPath+"/advert/Select.html",
	    dataType: 'json',
	    success : function(data){
	    	$("#advertid").jSelect({
	    		 data:data,
	 			 datakey:["id","name"],
	 			 multiple:false
	    	});
	    	 
	      }
	});
    $("#adstyle").jSelect({
        data:adstyle,
        datakey:["value","text"],
		 multiple:false
    });
    $("#feetype").jSelect({
        data:feetype,
        datakey:["value","text"],
		 multiple:false
    });


	$('#table').datagrid({   
		url:rootPath+'/advertincome/List.html',
		loadFilter: function(data){
			if(data.code==12)
			{
				$.messager.alert('fail', '无权限访问!  '+data.errorMessage);
				return false;
			}	
			if (data.d){
				return data.d;
			} else {
				return data;
			}
		},
		onClickRow: function(rowIndex, rowData){
			id=rowData.id;
		},
        queryParams: {
            startdate: $('#startdate').datebox('getValue'),
            enddate: $('#enddate').datebox('getValue')
        },
	    columns:[[    
	            {field:'ck',rowspan:2,checkbox:true },
                {field:'id',title:'id',hidden:true,width:'8%',rowspan:2,sortable:true,},
	  	        {field:'datetime',title:'时间',width:'8%',rowspan:2,sortable:true,},
	  	        {field:'advertisertype',title:'广告源',width:'5%',rowspan:2,sortable:true,formatter: function(value,row,index){
                    if(value==1)
                    {
                        return "竞价平台";
                    }
                    if(value==2)
                    {
                        return "一般网盟";
                    }
                    if(value==3)
                    {
                        return "自主投放";
                    }
                },
                },
	  	        {field:'advertname',title:'广告名称',width:'8%',rowspan:2,sortable:true},
                {field:'adstyle',title:'广告类型',width:'5%',rowspan:2,sortable:true,formatter: function(value,row,index){
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

                },
                },
                {field:'feetype',title:'合作类型',width:'8%',rowspan:2,sortable:true,formatter: function(value,row,index){
                if(value==1)
                {
                    return "CPA";
                }
                if(value==2)
                {
                    return "CPS";
                }
                if(value==3)
				{
                 	return "CPD";
				}
                if(value==4)
				{
					return "CPC";
				}
                 if(value==5)
                {
                    return "CPM";}
                 if(value==6)
				{
                    return "CPT";}
                },
                },
                {field:'income',title:'收入',rowspan:2,width:'8%',sortable:true},
                {title:'后台数据',colspan:3},
                {title:'第三方数据',colspan:3},
                {field:'UserNameByUpdate',title:'修改人',width:'8%',rowspan:2,sortable:true},
                ],
                [
                {field:'yshowcount',title:'展示',width:'6%',sortable:true},
                {field:'yclickcount',title:'点击',width:'6%',sortable:true},
                {field:'yecpm',title:'ecpm',width:'6%',sortable:true},

                {field:'sshowcount',title:'展示',width:'6%',sortable:true},
                {field:'sclickcount',title:'点击',width:'6%',sortable:true},
                {field:'secpm',title:'ecpm',width:'6%',sortable:true},


	    ]],
	    remoteSort:false,//排序不用从服务器请求
	    striped:true,//出现斑马线
	    loading:true,
	    loadMsg:'数据加载中，请稍后.....',
        onDblClickRow:function(rowIndex, rowData) {
            if (editRow != undefined) {
                $("#table").datagrid('endEdit', editRow);
            }
            if (editRow == undefined) {
                $("#table").datagrid('beginEdit', rowIndex);
                editRow = rowIndex;
            }

        },
        onAfterEdit: function (rowIndex, rowData, changes){
            if(changes.sdata!=undefined||changes.price!=undefined) {
                $('#table').datagrid('updateRow', {
                    index: rowIndex, row: {
                        yincome: (rowData.price * rowData.ydata).toFixed(2),
                        sincome: (rowData.price * rowData.sdata).toFixed(2)
                    }
                });
                editRow = undefined;
            }
        },
        onClickRow: function (rowIndex, rowData) {
            if (editRow != undefined) {
                $('#table').datagrid('endEdit', editRow);
            }
        }
	});

});
//保存
function save(){
    $.messager.confirm("操作提示", "您确定要保存吗？", function (data) {
        if (data) {

            $("#table").datagrid('endEdit', editRow);
            //如果调用acceptChanges(),使用getChanges()则获取不到编辑和新增的数据。
            //使用JSON序列化datarow对象，发送到后台。
            var rows = $("#table").datagrid('getChanges');
            var rowstr = JSON.stringify(rows);
            $('#rowstr').val(rowstr);
            $.ajax({
                url: rootPath + '/advertincome/Save.html',
                type: "post",
                data: {'rowstr': rowstr},
                dataType: "json",
                success: function (data) {
                    if (data.code == 12) {
                        $.messager.alert('fail', '无权限访问!  ' + data.errorMessage);
                        return false;
                    }
                    if (data.msg == null) {
                        jQuery.messager.alert('提示:', ' 保存成功!', 'info');
                    }
                    else {
                        jQuery.messager.alert('提示:', ' 保存失败!' + data.msg, 'info');
                    }
                    $('#table').datagrid('reload');
                }
            });
        }
        else {
            return false;
        }
    });
    }
function excel(){
    var ids ="";
    var rows = $('#table').datagrid('getSelections');
    for(var i=0; i<rows.length; i++){
        ids+=rows[i].id+",";
    }
    $('#ids').val(ids.substring(0, ids.length-1));
    document.getElementById("formMain").action=rootPath+"/excel/advertincome/Excel.html";
    document.getElementById("formMain").submit();

}
function query(){
    var startdate=$('#startdate').datebox('getValue');
    var enddate=$('#enddate').datebox('getValue');
	var advertid=$('#advertid').combobox('getValue');
    var adstyle=$('#adstyle').combobox('getValue');
    var advertisertype=$('#advertisertype').combobox('getValue');
    var feetype=$('#feetype').combobox('getValue');

    $('#table').datagrid('load',{
    startdate:startdate,
    enddate:enddate,
    advertid: advertid,
    adstyle: adstyle,
    advertisertype: advertisertype,
    feetype: feetype
});
}
