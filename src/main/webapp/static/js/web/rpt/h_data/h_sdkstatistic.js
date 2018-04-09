 $.ajax({
	url: rootPath+"/app/Select.html",
    dataType: 'json',
    async:false,
    success : function(data){
    	$("#appid").jSelect({
  		  data:data,
			 datakey:["id","name"],
 	 });
 	 
   }
});
$.ajax({
	url: rootPath+"/market/Select.html",
    dataType: 'json',
    async:false,
    success : function(data){
    	$("#marketid").jSelect({
  		  data:data,
			 datakey:["id","name"],
			 multiple:false
 	 });
 	 
   }
});

$.ajax({
	url: rootPath+"/sdkupdate/Select.html",
    dataType: 'json',
    async:false,
    success : function(data){
    	$("#sdkversion").jSelect({
  		  data:data,
			 datakey:["fileversion","fileversion"],
 	 });
 	 
   }
});


$("#pick").daterangepicker({
	locale:{
  format:"YYYY/MM/DD HH:mm"
},
startDate:moment().subtract(5, 'Hours'),
endDate:moment().subtract(0, 'days'),
showCustomRangeLabel:true,
timePicker:true, //显示小时分钟
timePicker24Hour:true, //24小时制
isShowing:true,
ranges: {
   '今天': [moment(), moment()],
   '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
   '最近七天': [moment().subtract(6, 'days'), moment()],
   '最近30天': [moment().subtract(29, 'days'), moment()],
   '本月': [moment().startOf('month'), moment().endOf('month')],
   '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
}
});

$(function() { 
	var tableh=window.innerHeight>0? window.innerHeight:window.screen.height;
	$('#table').bootstrapTable({   
		url:rootPath+'/rpt/h_sdk/h_statistic/List.html',
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
			console.log(data);
			if(data.rows.length>0){
			creatHighcharts(data);
			}
			if (data.d){
				return data.d;
			} else {
				return data.rows;
			}
        },
		queryParams:function(params) {
			var date=$('#pick').val().split("-");
			var startdate=date[0].split("/").join("-");
		    var enddate=date[1].split("/").join("-");
		    var sdkversion1=$('#sdkversion').selectVal();
		    var appid=$('#appid').selectVal();
		    var marketid=$('#marketid').selectVal();
		    return {  
		    	page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			    rows: params.limit,//页面大小
			    startdate: startdate,
			    enddate: enddate,
			    sdkversion1:sdkversion1,
			    appid:appid,
			    marketid:marketid
			 };   
		},
		height:tableh,
		striped:true,//出现斑马线
	    checkboxHeader:false,
	    singleSelect:true,
	    showFooter: true,
	    columns:[
             {field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
               	 return formatStringdate(value);}
               },footerFormatter: function (rows) {return "总计";}},
		    {field:'sdkversion',title:'版本',sortable:true},
		            {field:'appname',title:'应用名',sortable:true},
		            {field:'marketname',title:'市场',sortable:true},
		           
			        {field:'activeusercount',title:'活跃用户',sortable:true,
		            	footerFormatter: function (rows) {
		                    return sumformat(rows,this);
		                }},
			        {field:'requestcount',title:'请求数',sortable:true,
		                	footerFormatter: function (rows) {
		                        return sumformat(rows,this);
		                    }},
			        {field:'sendcount',title:'发送数',sortable:true,formatter: function(value,row,index){
			        	if (row.requestcount!=0){
			        	return value+"("+formatNum(value/row.requestcount*100)*1+"%)";
			        	}
			        	else{
			        		return value;
			        	}
			        },footerFormatter:function (rows) {
		                            return sumformat(rows,this);
		                        }},
			        {field:'showcount',title:'展示数',sortable:true,formatter: function(value,row,index){
			        	if (row.sendcount!=0){
				        	return value+"("+formatNum(value/row.sendcount*100)*1+"%)";
				        	}
				        	else{
				        		return value;
				        	}
			        },footerFormatter: function (rows) {
		                                return sumformat(rows,this);
		                            }},
		            {field:'clickcount',title:'点击数',sortable:true,formatter: function(value,row,index){
		            	if (row.showcount!=0){
				        	return value+"("+formatNum(value/row.showcount*100)*1+"%)";
				        	}
				        	else{
				        		return value;
				        	}
		            },footerFormatter: function (rows) { return sumformat(rows,this);}},
			    ]
	});
	
});
   

function formatNum(num){
  if(Math.floor(num)==num){
    return num;
  }else{
    return num.toFixed(0);
  }
}
  
function sumformat(rows,th) {
	var field = th.field;
	var count = 0;
	var reg=/\([^\(\)]*?\)/;
	for (var i in rows) {
		if(rows[i][field].toString().match(reg)){
			rows[i][field]=rows[i][field].toString().replace(reg,"");
		}
		count += rows[i][field]*1;
	}
	return formatNum(count);
}
function aveformat(rows){
	var field = this.field;
	var count = 0;
	var len=rows.length;
	for (var i in rows) {
      count += rows[i][field]*1;
	}
  var ornum=count/len;

  return formatNum(ornum);
  
}

function formatDate(date){
	var newDate=date.split("-").join("/");
	var num=(new Date(newDate)).getTime();
	return num;
}
function query(){
	var date=$('#pick').val().split("-");
	var startdate=date[0].split("/").join("-");;
    var enddate=date[1].split("/").join("-");;
	 if(formatDate(startdate)>formatDate(enddate)){
	        Ewin.alert({ title: "温馨提示",
	      		 message: "结束日期不得小于起始日期!"
	    	});
	    	return false;
	 }
    $('#table').bootstrapTable('refresh');
}

function creatHighcharts(data){
	var activeusercount=new Array();//活跃用户
	var temp=data.rows[data.rows.length-1].datetime;
	var sum=0;
	for( var i = 0; i < data.rows.length; i++){
		if(temp==data.rows[data.rows.length-i-1].datetime){
			sum+=data.rows[data.rows.length-i-1].activeusercount;
			if(i==data.rows.length-1){
				activeusercount.push(sum);
			}
		}
		else{
			activeusercount.push(sum);
			temp =data.rows[data.rows.length-i-1].datetime;
			sum=data.rows[data.rows.length-i-1].activeusercount;
			if(i==data.rows.length-1){
				activeusercount.push(sum);
			}
		}
	
	}		

	var temp2=data.rows[data.rows.length-1].datetime;
	var sum2=0;
	var requestcount=new Array();//请求
	for( var i = 0; i < data.rows.length; i++){
		if(temp2==data.rows[data.rows.length-i-1].datetime){
			sum2+=data.rows[data.rows.length-i-1].requestcount;
			if(i==data.rows.length-1){
				requestcount.push(sum2);
			}
		}
		else{
			requestcount.push(sum2);
			temp2 =data.rows[data.rows.length-i-1].datetime;
			sum2=data.rows[data.rows.length-i-1].requestcount;
			if(i==data.rows.length-1){
				requestcount.push(sum2);
			}
		}
	}		

	var sendcount=new Array();//发送
	var temp3=data.rows[data.rows.length-1].datetime;
	var sum3=0;
	for( var i = 0; i < data.rows.length; i++){
		if(temp3==data.rows[data.rows.length-i-1].datetime){
			sum3+=data.rows[data.rows.length-i-1].sendcount;
			if(i==data.rows.length-1){
				sendcount.push(sum3);
			}
		}
		else{
			sendcount.push(sum3);
			temp3 =data.rows[data.rows.length-i-1].datetime;
			sum3=data.rows[data.rows.length-i-1].sendcount;
			if(i==data.rows.length-1){
				sendcount.push(sum3);
				break;
			}
		}
	}	

	var temp4=data.rows[data.rows.length-1].datetime;
	var sum4=0;
	var showcount=new Array();//展示
	for( var i = 0; i < data.rows.length; i++){
		if(temp4==data.rows[data.rows.length-i-1].datetime){
			sum4+=data.rows[data.rows.length-i-1].showcount;
			if(i==data.rows.length-1){
				showcount.push(sum4);
			}
		}
		else{
			showcount.push(sum4);
			temp4 =data.rows[data.rows.length-i-1].datetime;
			sum4=data.rows[data.rows.length-i-1].showcount;
			if(i==data.rows.length-1){
				showcount.push(sum4);
				break;
			}
		}
	}	

	var temp5=data.rows[data.rows.length-1].datetime;
	var sum5=0;
	var clickcount=new Array();//点击
	for( var i = 0; i < data.rows.length; i++){
		if(temp5==data.rows[data.rows.length-i-1].datetime){
			sum5+=data.rows[data.rows.length-i-1].clickcount;
			if(i==data.rows.length-1){
				clickcount.push(sum5);
			}
		}
		else{
			clickcount.push(sum5);
			temp5 =data.rows[data.rows.length-i-1].datetime;
			sum5=data.rows[data.rows.length-i-1].clickcount;
			if(i==data.rows.length-1){
				clickcount.push(sum5);
				break;
			}
		}
	}		

	var temp1=data.rows[data.rows.length-1].datetime;
	var datetime=new Array();
	for( var i = 0; i < data.rows.length; i++){
		if(temp1==data.rows[data.rows.length-i-1].datetime){
			if(i==data.rows.length-1){
				datetime.push(temp1.substring(8));
			}
			continue;
		}
		else{
			datetime.push(temp1.substring(8));
			temp1 =data.rows[data.rows.length-i-1].datetime;
		}
	}
	Highcharts.chart('container', { 
	title: {
	    text: 'sdk小时报表'
	},
	subtitle: {
	    text: ''
	},
	chart : {
		      zoomType: 'x'
	},//变焦类型
	ignoreHiddenSeries:true,
	xAxis: { 
	  categories : datetime
	        },  
	yAxis: {
	    title: {
	        text: ''
	    }
	},
	credits: {  
	    enabled: false     //不显示LOGO 
	},
	legend: {
		 itemStyle : {
		        'fontSize' : '13px'
		    },
	    layout: 'horizontal',
	    align: 'center',
	    verticalAlign: "bottom",
	    	cursor: 'pointer'
	  //  backgroundColor:"#87CEEB"
	},
	plotOptions: {
		   area: {
		         fillColor: {
		            linearGradient: { x1: 0, y1: 0},
		            stops: [
		               [0, Highcharts.getOptions().colors[0]],
		               [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
		            ]
		         },
		         marker: {
		            radius: 2
		         },
		         lineWidth: 1,
		         states: {
		            hover: {
		               lineWidth: 1
		            }
		         },
		         threshold: null
		      },
	    line: {
	        dataLabels: {
	            enabled: true          // 开启数据标签
	        },
	        enableMouseTracking: true // 关闭鼠标跟踪，对应的提示框、点击事件会失效
	    }, 
	    series: {
            events: {
                legendItemClick: function(e) {
                    var index = this.index;
                    var series = this.chart.series;

                    if (!series[index].index.visible) {
                        for (var i = 0; i < series.length; i++) {
                            var s = series[i];
                            i === index ? s.show() : s.hide();
                        }
                    }
                    return false;
                }
            }
        }
    },
	yAxis: [{
		title: {
			text:null,
			},
	      opposite: false,
	    lineWidth: 1,
	},
	{
		title: {
			text:null,
			},
			lineWidth: 0,
	    opposite: false,
	},
	{
		title: {
			text:null,
			},
			lineWidth: 0
	},
	{
		title: {
			text:null,
			},
			lineWidth: 0
	},
	{
		title: {
			text:null,
			},
			lineWidth: 0
	}, 
	{
		title: {
			text:null,
			},
			lineWidth: 0
	}],
	series: [{
	    name: '活跃用户',
	    data: activeusercount,
	    visible: true
	    },
	    { name: '请求数',
		 data: requestcount,
		 visible: false,
		 yAxis: 1,
	    },
	    { name: '发送数',
		 data: sendcount,
		 visible: false,
		 yAxis: 2,
	    },
	    { name: '展示数',
		  data: showcount,
		  visible: false,
		  yAxis: 3,
	    },
	    { name: '点击数',
		 data: clickcount,
		 visible: false,
		 yAxis: 4,       
	}]
	}
)};


