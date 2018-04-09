$(function() {
	/*$('#startDate').datebox({  
	    required:true
	});*/
	$('#startdate1').datebox({  
	});
	$.ajax({
		  url:rootPath+'/rpt/index/devwarn/List.html',
		  type:"post",
		  data:{'querytype':1},
		  dataType:"json",
		  success: function(data){
				if(data.rows.length>0)
				{
					var url=rootPath+'rpt/dev/DevWarnAction!getRptList';
					$.messager.show({
						title:'通  知',
						msg:'<div font-siez="15px">有开发者存在异常，<a href="'+url+'">点击此处查看详情</a></div>',
						width:400,
						height:250,
						timeout:20000,
						showType:'slide'
				    });
				}
		  }
	 });

	$('#dg').datagrid({   
		url:rootPath+'/rpt/index/advertquery/List.html',
		loadFilter: function(data){
			if (data.d){
				return data.d;
			} else {
				return data;
			}
		},
	    columns:[[    
	        {field:'moblie',title:'运营商',width:'4%',formatter: function(value,row,index){ 
	        	if(value==1)
	        	{
	        		return "移动";
	        	}
	        	if(value==2)
	        	{
	        		return "联通";
	        	}
	        	if(value==3)
	        	{
	        		return "电信";
	        	}
	        }
	        }, 
	        {field:'province1',title:'北京',width:'2%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province2',title:'上海',width:'2%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province3',title:'天津',width:'2%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province4',title:'重庆',width:'2%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province5',title:'河北',width:'2%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province6',title:'河南',width:'2%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province7',title:'云南',width:'2%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province8',title:'辽宁',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province9',title:'黑龙江',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province10',title:'湖南',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province11',title:'安徽',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province12',title:'山东',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province13',title:'新疆',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province14',title:'江苏',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province15',title:'浙江',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province16',title:'江西',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province17',title:'湖北',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province18',title:'广西',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province19',title:'甘肃',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province20',title:'山西',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province21',title:'内蒙古',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province22',title:'陕西',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province23',title:'吉林',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province24',title:'福建',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province25',title:'贵州',width:'3%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province26',title:'广东',width:'2%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province27',title:'青海',width:'2%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province28',title:'西藏',width:'2%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province29',title:'四川',width:'2%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province30',title:'宁夏',width:'2%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
	        {field:'province31',title:'海南',width:'2%',formatter: function(value,row,index){
            	if(value>7)
            	{	
	        	return '<span style="color:black;font-size:13px;">'+value+'</span>';
            	}
            	else
            	{
            	return '<span style="color:red;font-size:13px;">'+value+'</span>';	
            	}	
			}},
            ],
	    ],
	    remoteSort:false,//排序不用从服务器请求
	    striped:true,//出现斑马线
	    showFooter : true,//出现统计
	    loading:true,
	    loadMsg:'数据加载中，请稍后.....',
	    onLoadSuccess : function() {
	        $('#dg').datagrid('statistics');
	        rows= $('#dg').datagrid("getData");
	        var moblie="";
	        var yad=0;
	        var lad=0;
	        var dad=0;
	      	for(var i=0;i<rows.length;i++)
	      	{
	      	//获取每一行的数据
	      		moblie[i]=rows[i].moblie;
	      	}
	      	yad=rows.rows[0].total;
	      	lad=rows.rows[1].total;
	      	dad=rows.rows[2].total;
	      	$('#highcharts').highcharts({
	      		exporting:{
                    enabled:false
                },
                credits: {
                    enabled: false
                },
	            chart: {
	            	height:200,
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false
	            },
	            title: {
	                text: '广告运营商分布'
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: true,
	                        color: '#000000',
	                        connectorColor: '#000000',
	                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
	                    }
	                }
	            },
	            series: [{
	                type: 'pie',
	                name: '运营商广告总数',
	                data: [
	                    ['移动',yad],
	                    ['联通',lad],
	                    ['电信',dad]
	                ]
	            }]
	        });
	    }
	});
		$('#dg2').datagrid({   
		url:rootPath+'/rpt/index/queryall/List.html',
		loadFilter: function(data){
			if (data.d){
				return data.d;
			} else {
				return data;
			}
		},
	    columns:[[    
	        {field:'usercount',title:'请求用户数',width:'8%',sortable:true,}, 
	        {field:'requestcount',title:'请求总数',width:'8%',sortable:true},   
	        {field:'colseadcount',title:'关闭广告',width:'8%',sum:true,sortable:true},  
            {field:'apkinfocount',title:'apkinfo无效',width:'8%',sum:true,sortable:true},
            {field:'chinacount',title:'非中国地区',width:'8%',sum:true,sortable:true},
            {field:'noadcount',title:'无广告返回',width:'8%',sum:true,sortable:true},
            {field:'send_count',title:'发送数',width:'8%',sum:true,sortable:true},
            {field:'show_count',title:'展示数',width:'8%',sum:true,sortable:true},
            {field:'click_count',title:'点击数',width:'9%',sum:true,sortable:true},
            {field:'download_count',title:'下载数',width:'9%',sum:true,sortable:true},
            {field:'install_count',title:'安装数',width:'9%',sum:true,sortable:true},
	    ]],
	    remoteSort:false,//排序不用从服务器请求
	    striped:true,//出现斑马线
	    loading:true,
	    loadMsg:'数据加载中，请稍后.....',
	    onLoadSuccess : function() {
	    	 $('#dg2').datagrid('statistics');
	    }
	});
		$('#dg3').datagrid({   
		url:rootPath+'/rpt/index/querypublishcount/List.html',
		loadFilter: function(data){
			if (data.d){
				return data.d;
			} else {
				return data;
			}
		},
	    columns:[[    
	        {field:'advertisername',title:'广告主',width:'18%',sortable:true,}, 
	        {field:'advertname',title:'广告',width:'13%',sortable:true,}, 
	        {field:'feetype',title:'合作模式',width:'13%',sortable:true,formatter: function(value,row,index){ 
	        	if(value==1)
	        	{
	        		return "CPA";
	        	}
	        	if(value==2)
	        	{
	        		return "CPC";
	        	}
	        	if(value==3)
	        	{
	        		return "CPM";
	        	}
	        	if(value==4)
	        	{
	        		return "CPD";
	        	}
	        	if(value==5)
	        	{
	        		return "CPS";
	        	}
	        },
	        }, 
	        {field:'public_count',title:'投放总数量',width:'13%',sortable:true,formatter: function(value,row,index){
        		if(value=="0")
        		{
        			return "不限量";
        		}
        		else
        		{
        			return value;
        		}
	        }
            },
            {field:'out_send',title:'外放数量',width:'13%',sortable:true,formatter: function(value,row,index){
            	if(value=="0")
        		{
        			return "不限量";
        		}
            	else if (value=="-1")
            	{
            		return "停止投放";
            	}	
        		else
        		{
        			return value;
        		}
            }
            }, 
	        {field:'out_count',title:'外放已发送',width:'13%',sortable:true,formatter: function(value,row,index){
	        	if((value/row.out_send)>0.9&&row.out_send!="0")
        		{
        			return "<span style='color:red;font-size:13px;'>"+value+"("+(value/row.out_send).toFixed(2)*100+"%)</span>";
        		}
        		else
        		{
        			return value+"("+(value/row.out_send).toFixed(2)*100+"%)";
        		}
            }
            },  
            {field:'send_count',title:'平台已发送',width:'13%',sortable:true,formatter: function(value,row,index){
            	    var count=row.public_count-row.out_send;
            	    if(row.public_count=="0")
            	    {
            	    	return value+"(不限量)";
            	    }
	        		if((value/count)>0.9&&row.public_count!="0")
	        		{
	        			return "<span style='color:red;font-size:13px;'>"+value+"("+((value/count)*100).toFixed(2)+"%)</span>";
	        		}
	        		else
	        		{
	        			var count=row.public_count-row.out_send;
	        			return value+"("+((value/count)*100).toFixed(2)+"%)";
	        		}
	        		
            }
	     },
	    ]],
	    remoteSort:false,//排序不用从服务器请求
	    striped:true,//出现斑马线
	    loading:true,
	    loadMsg:'客官稍等，人家在努力加载呢.....',
	});
	
	$('#dg4').datagrid({   
		url:rootPath+'/rpt/index/querydevrecord/List.html',
		loadFilter: function(data){
			if (data.d){
				return data.d;
			} else {
				return data;
			}
		},
	    columns:[[    
	        {field:'hourtime',title:'小时',width:'15%',sortable:true,}, 
	        {field:'send_count',title:'已发送',width:'15%',sum:true,sortable:true},
	        {field:'show_count',title:'展示',width:'15%',sum:true,sortable:true,formatter: function(value,row,index){
            	return '<span style="color:black;font-size:13px;">'+(value*1)+'</span>'+"("+((value/row.send_count)*100).toFixed(2)+"%)";
			}},
	        {field:'click_count',title:'点击',width:'15%',sum:true,sortable:true,formatter: function(value,row,index){
            	return '<span style="color:black;font-size:13px;">'+(value*1)+'</span>'+"("+((value/row.send_count)*100).toFixed(2)+"%)";
			}},
	        {field:'download_count',title:'下载',width:'15%',sum:true,sortable:true,formatter: function(value,row,index){
            	return '<span style="color:black;font-size:13px;">'+(value*1)+'</span>'+"("+((value/row.send_count)*100).toFixed(2)+"%)";
			}},
	        {field:'install_count',title:'安装',width:'15%',sum:true,sortable:true,formatter: function(value,row,index){
            	return '<span style="color:black;font-size:13px;">'+(value*1)+'</span>'+"("+((value/row.send_count)*100).toFixed(2)+"%)";
			}},
	    ]],
	    remoteSort:false,//排序不用从服务器请求
	    striped:true,//出现斑马线
	    showFooter : true,//出现统计
	    loading:true,
	    loadMsg:'数据加载中，请稍后.....',
	    onLoadSuccess : function() {
	    	 $('#dg4').datagrid('statistics');
	    	 rows= $('#dg4').datagrid("getRows");
	    	 var hourtime=[];
	    	 var send_count=[];
	    	 var show_count=[];
	    	 var click_count=[];
	    	 var download_count=[];
	    	 var install_count=[];
	    	 for(var i=0;i<rows.length;i++)
		      	{
		      	    //获取每一行的数据
	    		    hourtime[i]=rows[i].hourtime;
	    		    send_count.push(rows[i].send_count*1);
	    		    show_count.push(rows[i].show_count*1);
		      		click_count.push(rows[i].click_count*1);
		      		download_count.push(rows[i].download_count*1);
		      		install_count.push(rows[i].install_count*1);
		      	}
	    	 $('#highcharts4').highcharts({
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
	    	            text: '时间段数据',
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
	    	            name: '发送数',
	    	            data: send_count
	    	        }, {
	    	            name: '展示数',
	    	            data: show_count
	    	        }, {
	    	            name: '点击数',
	    	            data: click_count
	    	        },{
	    	            name: '下载数',
	    	            data: download_count
	    	        },{
	    	            name: '安装数',
	    	            data: install_count
	    	        }]
	    	    });
	    }
	});
});

/*function query(){
	var startDate=$('#startDate').datetimebox('getValue');
    $('#dg3').datagrid('load',{
    dateDate: startDate
});
} */
function query1(){
    var startdate=$('#startdate1').datetimebox('getValue');
        $('#dg4').datagrid('load',{
        startdate: startdate
    });
}