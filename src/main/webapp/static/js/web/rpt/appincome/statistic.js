$(function() { 
	  $.ajax({
			url: rootPath+"/app/Select.html",
	        dataType: 'json',
	        async:false,
	        success : function(data){
	        	$("#appid").jSelect({
	        		  data:data,
	      			 datakey:["id","name"],
	      			 multiple:false
	         	 });
	         	 
	           }
	 	});
	  $("#pick").daterangepicker({
			locale:{
	      format:"YYYY/MM/DD"
	    },
	    startDate:moment().subtract(1, 'days'),
	    endDate:moment().subtract(1, 'days'),
	    showCustomRangeLabel:true,
	    timePicker:false, //显示小时分钟
	    timePicker24Hour:true, //24小时制
	    isShowing:true,
	    ranges: {
	       '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	       '最近七天': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
	       '最近30天': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
	       '本月': [moment().startOf('month'), moment().endOf('month')],
	       '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	    }
	});
	var tableh=window.innerHeight>0? window.innerHeight:window.screen.height;
	$('#table').bootstrapTable({   
		url:rootPath+'/rpt/appincome/statistic/List.html',
		method: 'post',   //请求方式（*）
        dataType: "json",
        contentType : "application/x-www-form-urlencoded",
        responseHandler: function(data){
			if(data.code==12)
			{
				Ewin.alert({ title: "fail",
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
			var date=$('#pick').val().split("-");
			var startdate=date[0].replace(" ","").split("/").join("-");
		    var enddate=date[1].replace(" ","").split("/").join("-");
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
		striped:true,//出现斑马线
	    checkboxHeader:false,
	    singleSelect:true,
	    showFooter: true,
		height:tableh,
	    columns:[[
            {field:'btSelectItem',checkbox:true },
            {field:'appid',title:'应用id',sortable:true,visible:false},
            {field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
           	 return formatStringdate(value);}
           },footerFormatter: function (rows) {return "总计";}},
            {field:'appname',title:'应用名',width:'4%',sortable:true},
            {field:'yshowcount',title:'y展示',width:'4%',styler: function (value, row, index) {
                return 'background-color:#C4E1FF;color:black;';
            },sortable:true,footerFormatter: function (rows) {
                return sumformat(rows,'yshowcount');
            }},
            {field:'yclickcount',title:'y点击',width:'4%',styler: function (value, row, index) {
                return 'background-color:#C4E1FF;color:black;';
            },sortable:true,footerFormatter: function (rows) {
                return sumformat(rows,'yclickcount');
            }},
            {field:'ytoplaycount',title:'y开始播放',width:'4%',styler: function (value, row, index) {
                return 'background-color:#C4E1FF;color:black;';
            },sortable:true,footerFormatter: function (rows) {
                return sumformat(rows,'ytoplaycount');
            }},
            {field:'ytoendplaycount',title:'y结束播放',width:'4%',styler: function (value, row, index) {
                return 'background-color:#C4E1FF;color:black;';
            },sortable:true,footerFormatter: function (rows) {
                return sumformat(rows,'ytoendplaycount');
            }},
            {field:'yloadpageclick',title:'y落地页点击',width:'4%',styler: function (value, row, index) {
                return 'background-color:#C4E1FF;color:black;';
            },sortable:true,footerFormatter: function (rows) {
                return sumformat(rows,'yloadpageclick');
            }},
            
            {field:'yinstallcount',title:'y安装',width:'4%',styler: function (value, row, index) {
                return 'background-color:#C4E1FF;color:black;';
            },sortable:true,footerFormatter: function (rows) {
                return sumformat(rows,'yinstallcount');
            }},
            {field:'ytotalincome',title:'y收入',width:'4%',styler: function (value, row, index) {
                return 'background-color:#C4E1FF;color:black;';
            },sortable:true,formatter: function(value,row,index){
                return (value*1).toFixed(2);
            },footerFormatter: function (rows) {
                return sumformat(rows,'ytotalincome');
            }},
            {field:'yecpm',title:'yecpm',width:'4%',styler: function (value, row, index) {
                return 'background-color:#C4E1FF;color:black;';
            },sortable:true,formatter: function(value,row,index){
                return (value*1).toFixed(2);
            }
            },
            {field:'yarup',title:'yarup',width:'4%',styler: function (value, row, index) {
                return 'background-color:#C4E1FF;color:black;';
            },sortable:true,formatter: function(value,row,index){
                return (value*1).toFixed(2);
            }
            },

            {field:'sshowcount',title:'s展示',width:'4%',styler: function (value, row, index) {
                return ' background-color:FFEEDD;color:black;';
            },sortable:true,footerFormatter: function (rows) {
                return sumformat(rows,'sshowcount');
            }},
            {field:'sclickcount',title:'s点击',width:'4%',styler: function (value, row, index) {
                return ' background-color:FFEEDD;color:black;';
            },sortable:true,footerFormatter: function (rows) {
                return sumformat(rows,'sclickcount');
            }},
            {field:'stoplaycount',title:'s开始播放',width:'4%',styler: function (value, row, index) {
                return ' background-color:FFEEDD;color:black;';
            },sortable:true,footerFormatter: function (rows) {
                return sumformat(rows,'stoplaycount');
            }},
            {field:'stoendplaycount',title:'s结束播放',width:'4%',styler: function (value, row, index) {
                return ' background-color:FFEEDD;color:black;';
            },sortable:true,footerFormatter: function (rows) {
                return sumformat(rows,'stoendplaycount');
            }},
            {field:'sloadpageclick',title:'s落地页点击',width:'4%',styler: function (value, row, index) {
                return ' background-color:FFEEDD;color:black;';
            },sortable:true,footerFormatter: function (rows) {
                return sumformat(rows,'sloadpageclick');
            }},
            {field:'sinstallcount',title:'s安装',width:'4%',styler: function (value, row, index) {
                return ' background-color:FFEEDD;color:black;';
            },sortable:true,footerFormatter: function (rows) {
                return sumformat(rows,'sinstallcount');
            }},
            {field:'sactivecount',title:'s激活',width:'4%',styler: function (value, row, index) {
                return ' background-color:FFEEDD;color:black;';
            },sortable:true,footerFormatter: function (rows) {
                return sumformat(rows,'sactivecount');
            }},
            {field:'stotalincome',title:'s收入',width:'4%',styler: function (value, row, index) {
                return ' background-color:FFEEDD;color:black;';
            },sortable:true,formatter: function(value,row,index){
                return (value*1).toFixed(2);
            },footerFormatter: function (rows) {
                return sumformat(rows,'stotalincome');
            }},
            {field:'revenue',title:'s收益（$）',width:'4%',styler: function (value, row, index) {
                return ' background-color:FFEEDD;color:black;';
            },sortable:true,formatter: function(value,row,index){
                return (value*1).toFixed(2);
            },footerFormatter: function (rows) {
                return sumformat(rows,'revenue');
            }},
            {field:'secpm',title:'secpm',width:'4%',styler: function (value, row, index) {
                return ' background-color:FFEEDD;color:black;';
            },sortable:true,formatter: function(value,row,index){
                return (value*1).toFixed(2);
            }
            },
            {field:'sarup',title:'sarup',width:'4%',styler: function (value, row, index) {
                return ' background-color:FFEEDD;color:black;';
            },sortable:true,formatter: function(value,row,index){
                return (value*1).toFixed(2);
            },
            },
	    ]],
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
function finddetail(){
	var row= $('#table').bootstrapTable('getSelections');
    if(row.length==0)
    {
    	Ewin.alert({ title: "温馨提示",
   		 message: "请选择操作的记录!"
   		 });
        return false;
    }
    $('#app1').val(row[0].appid);
    $('#appname').val(row[0].appname);
    
    var url=rootPath+"/rpt/appincome/statistic/getDetail.html";
    openDetail(url);
  
}
function formatDate(date){
	var newDate=date.split("-").join("/");
	var num=(new Date(newDate)).getTime();
	return num;
}
function query(){
	var date=$('#pick').val().split("-");
	var startdate=date[0].replace(" ","").split("/").join("-");
    var enddate=date[1].replace(" ","").split("/").join("-");
	 console.log(startdate,enddate);
	 if(formatDate(startdate)>formatDate(enddate)){
		 Ewin.alert({ title: "温馨提示",
	      		 message: "结束日期不得小于起始日期!"
	    	});
	    	return false;
	 }
    $('#table').bootstrapTable('refresh');
}