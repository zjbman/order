$(function() {

    $("#adtype").combobox({
        data:adtype,
        valueField:'value',
        textField:'text'
    });


	$('#table').datagrid({   
		url:rootPath+'/rpt/publics/adtype/List.html',
		loadFilter: function(data){
			if (data.d){
				return data.d;
			}else {
				return data;
			}
		},
		queryParams: {
			startdate: $('#startdate').datebox('getValue'),
			enddate: $('#enddate').datebox('getValue')
		},
	    columns:[[
            {field:'ck',checkbox:true },
	        {field:'datetime',title:'时间',width:'10%',sortable:true},
            {field:'adtype',title:'广告类型',width:'10%',sortable:true,formatter: function(value,row,index){
                if(value==0||value==-1)
                {
                    return "--";
                }
                if(value==1)
                {
                    return "下载";
                }
                if(value==2)
                {
                    return "跳转";
                }
            }
			},
	     	{field:'requestcount',title:'请求数',width:'8%',sum:true,sortable:true
	        },
	        {field:'sendcount',title:'发送数',width:'8%',sum:true,sortable:true,formatter: function(value,row,index){
            	return '<span style="color:black;font-size:13px;">'+(value*1)+'</span>'+"("+((value/row.requestcount)*100).toFixed(2)+"%)";
            }
	        },
	        {field:'showcount',title:'展示数',width:'8%',sum:true,sortable:true,formatter: function(value,row,index){
            	return '<span style="color:black;font-size:13px;">'+(value*1)+'</span>'+"("+((value/row.sendcount)*100).toFixed(2)+"%)";
            }
	        },
	        {field:'closecount',title:'关闭数',width:'8%',sum:true,sortable:true,formatter: function(value,row,index){
            	return '<span style="color:black;font-size:13px;">'+(value*1)+'</span>'+"("+((value/row.sendcount)*100).toFixed(2)+"%)";
            }
            },
            {field:'clickcount',title:'点击数',width:'8%',sum:true,sortable:true,formatter: function(value,row,index){
                return '<span style="color:black;font-size:13px;">'+(value*1)+'</span>'+"("+((value/row.sendcount)*100).toFixed(2)+"%)";
            }
            },
            {field:'downloadbegincount',title:'开始下载',width:'8%',sum:true,sortable:true,formatter: function(value,row,index){
                return '<span style="color:black;font-size:13px;">'+(value*1)+'</span>'+"("+((value/row.sendcount)*100).toFixed(2)+"%)";
            }
            },
            {field:'downloadendcount',title:'下载完成',width:'8%',sum:true,sortable:true,formatter: function(value,row,index){
                return '<span style="color:black;font-size:13px;">'+(value*1)+'</span>'+"("+((value/row.sendcount)*100).toFixed(2)+"%)";
            }
            },
            {field:'installcount',title:'安装',width:'8%',sum:true,sortable:true,formatter: function(value,row,index){
                return '<span style="color:black;font-size:13px;">'+(value*1)+'</span>'+"("+((value/row.sendcount)*100).toFixed(2)+"%)";
            },
	        },
	    ]],
	    remoteSort:false,//排序不用从服务器请求
	    striped:true,//出现斑马线
	    showFooter : true,//出现统计
	    loading:true,
	    loadMsg:'数据加载中，请稍后.....',
        singleSelect:true,
	    onLoadSuccess : function() {
	    	 $('#table').datagrid('statistics');
/*	    	 rows= $('#table').datagrid("getRows");
	    	 var hourtime=[];
	    	 var install_count=[];
	    	 for(var i=0;i<rows.length;i++)
		      	{
		      	    //获取每一行的数据
	    		    hourtime[i]=rows[i].datetime;
		      		install_count.push(rows[i].install_count*1);
		      	}
	    	 $('#highcharts').highcharts({
	    			exporting:{
	                    enabled:false
	                },
	                credits: {
	                    enabled: false
	                },
	                chart: {
		            	 height:300
		             },
	    	        title: {
	    	            text: '每日概况',
	    	            x: -20 //center
	    	        },
	    	        subtitle: {
	    	            text: '详情',
	    	            x: -20
	    	        },
	    	        xAxis: {
	    	            categories: hourtime
	    	        },
	    	        yAxis: {
	    	            title: {
	    	                text: '数据'
	    	            },
	    	            plotLines: [{
	    	                value: 0,
	    	                width: 1,
	    	                color: '#808080'
	    	            }]
	    	        },
	    	        tooltip: {
	    	            valueSuffix: '个'
	    	        },
	    	        legend: {
	    	            layout: 'vertical',
	    	            align: 'right',
	    	            verticalAlign: 'middle',
	    	            borderWidth: 0
	    	        },
	    	        series: [{
	    	            name: '安装数',
	    	            data: install_count
	    	        }]
	    	    });*/
	    }
	});
    $("#appid").combobox({
        url:rootPath+"/app/Select.html",
        loadFilter:function(data){
            return data;
        },
        valueField:'appkey',
        textField:'name',
        formatter:function formatItem(row){
            var s="";
            s = row.name+"("+row.appkey+")";
            return s;
        }
    });
});
function finddetail(){
    var row= $('#table').datagrid('getSelected');
    if(row==null)
    {
        jQuery.messager.alert('温馨提示','请选择操作的记录!','error');
        return false;
    }
    $('#adtype1').val(row.adtype);
    document.getElementById("formMain").action=rootPath+"/rpt/publics/adtype/getDetail.html";
    document.getElementById("formMain").submit();
}
function query(){
	var startdate=$('#startdate').datebox('getValue');
	var enddate=$('#enddate').datebox('getValue');
    var adtype=$('#adtype').combobox('getValue');
    if(enddate<startdate)
    {
        jQuery.messager.alert('温馨提示','结束时间不能小于起止时间!','error');
        return false;
    }
    $('#table').datagrid('load',{
    startdate: startdate,
    enddate: enddate,
	adtype:adtype
});
}