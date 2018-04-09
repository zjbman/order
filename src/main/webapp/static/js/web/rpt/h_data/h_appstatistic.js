$(function() { 
	  $.ajax({
			url: rootPath+"/app/Select.html",
	        dataType: 'json',
	        async:false,
	        success : function(data){
	        	$("#appid").jSelect({
	        		  data:data,
	                  async:false,
	        			 datakey:["id","name"],
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
	    timePickerIncrement:5,//只显示5分钟
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
	var tableh=window.innerHeight>0? window.innerHeight:window.screen.height;
	$('#table').bootstrapTable({   
		url:rootPath+'/rpt/h_data/h_appstatistic/AppList.html',
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
			if(data.rows.length>0){
			creatHighcharts(data);
			}
			if (data.d){
				return data.d;
			} else {
				return  data.rows;
			}
		},
		queryParams:function(params) {
			var date=$('#pick').val().split("-");
			var startdate=date[0].split("/").join("-");
		    var enddate=date[1].split("/").join("-");
		    var appid=$('#appid').selectVal();
			return {  
			      page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			      rows: params.limit,//页面大小
			      startdate: startdate,
			      enddate: enddate,
			      appid:appid
			      };  
		},
		onClickRow: function(rowIndex, rowData){
			id=rowData.id;
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
            {field:'appname',title:'应用名',sortable:true},
	        {field:'activeusercount',title:'活跃用户',sortable:true,
            	footerFormatter: function (rows) {
                    return sumformat(rows,'activeusercount');
                }},
	        {field:'requestcount',title:'请求数',sortable:true,
                	footerFormatter: function (rows) {
                        return sumformat(rows,'requestcount');
                    }},
	        {field:'sendcount',title:'发送数',sortable:true,
                    	footerFormatter: function (rows) {
                            return sumformat(rows,'sendcount');
                        }},
	        {field:'totalshowcount',title:'展示数',sortable:true,
                        	footerFormatter: function (rows) {
                                return sumformat(rows,'totalshowcount');
                            }},
            {field:'avg_aq',title:'平均活跃请求',sortable:true,formatter: function(value,row,index){
                return (value*1).toFixed(2);}},
            {field:'fillrate',title:'填充率',sortable:true,formatter: function(value,row,index){
            	return ((value*100).toFixed(2))+"%";}
	        }
	    ],
	  
	});
	
  

    
});

function formatNum(num){
  if(Math.floor(num)==num){
    return num;
  }else{
    return num.toFixed(2);
  }
}
  
function sumformat(rows,field) {
  var count = 0;
  for (var i in rows) {
      count += rows[i][field]*1;
  }
  return formatNum(count);
}
function aveformat(rows,field){
  var count = 0;
  var len=rows.length;
  for (var i in rows) {
      count += rows[i][field]*1;
  }
  var ornum=count/len;

  return formatNum(ornum);
  
}
function openDetail(url){
	    var formMain=document.getElementById("formMain");
	    formMain.action=url;
	    formMain.submit();
}
function adstyledetail(){
 
    var url=rootPath+"/rpt/h_data/h_appstatistic/getAdstyleDetail.html";
    openDetail(url);
    
    
}

function advertdetail(){
   
    var url=rootPath+"/rpt/h_data/h_appstatistic/getAdvertDetail.html";
    openDetail(url);
    
    
}
function formatDate(date){
	var newDate=date.split("-").join("/");
	var num=(new Date(newDate)).getTime();
	return num;
}
function query(){
	var date=$('#pick').val().split("-");
	var startdate=date[0].split("/").join("-");
    var enddate=date[1].split("/").join("-");
	 if(formatDate(startdate)>formatDate(enddate)){
	    	Ewin.confirm({ title: "温馨提示",
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

	var avg_aq=new Array();//平均活跃请求
	for(var i =0;i<requestcount.length;i++){
		if(activeusercount[i]!=0){
		avg_aq.push(formatNum(requestcount[i]/activeusercount[i])*1);
		}
		else{
			avg_aq.push(0);
		}
	}

	var fillrate=new Array();//填充率
	for(var i =0;i<sendcount.length;i++){
		if(requestcount[i]!=0){
		fillrate.push(formatNum(sendcount[i]/requestcount[i]*100)*1);
		}
		else{
			fillrate.push(0);
		}
	}
	var temp1=data.rows[data.rows.length-1].datetime;
	var datetime=new Array();
	for( var i = 0; i < data.rows.length; i++){
		if(temp1==data.rows[data.rows.length-i-1].datetime){
			if(temp1==data.rows[0].datetime){
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
	    text: '应用小时报表'
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
	    { name: '平均活跃请求',
		 data: avg_aq,
		 visible: false,
		 yAxis: 4,       
	    },
	    { name: '填充率',
			 data: fillrate,
			 visible: false,
			 yAxis: 5,       
		}]
	}
)};