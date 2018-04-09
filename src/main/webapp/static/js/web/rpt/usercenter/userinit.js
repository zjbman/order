$(function() { 

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
		url:rootPath+'/usercenter/List.html',
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
			return {  

			      startdate: startdate,
			      enddate: enddate
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
	    columns:[

	             {field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
	               	 return formatStringdate(value);}
	               },footerFormatter: function (rows) {return "总计";}},
	                {field:'appName',title:'应用名',sortable:true,},
	                {field:'appChannel',title:'渠道',sortable:true,},
	    	        {field:'activeuser',title:'活跃用户',sortable:true,
	                		footerFormatter: function (rows) {
	                			return sumformat(rows,'activeuser');
	                    }},
	    	        {field:'newuser',title:'新增用户',sortable:true,
	                		footerFormatter: function (rows) {
	                			return sumformat(rows,'newuser');
	                    }},
		    	        {field:'usercount',title:'充值人数',sortable:true,
	                		footerFormatter: function (rows) {
	                			return sumformat(rows,'usercount');
	                    }},
	        	        {field:'oneday',title:'一日留存',sortable:true,formatter: function(value,row,index){
	        	        	return value+'('+((value/row['newuser'])*100).toFixed(2)+'%)';
	        	        },
	                		footerFormatter: function (rows) {
	                			return sumformat2(rows,'oneday','newuser');
	                    }},
	        	        {field:'threeday',title:'三日留存',sortable:true,formatter: function(value,row,index){
	        	        	return value+'('+((value/row['newuser'])*100).toFixed(2)+'%)';
	        	        },
	                		footerFormatter: function (rows) {
	                			return sumformat2(rows,'threeday','newuser');
	                    }},
	        	        {field:'sevenday',title:'七日留存',sortable:true,formatter: function(value,row,index){
	        	        	return value+'('+((value/row['newuser'])*100).toFixed(2)+'%)';
	        	        },
	                		footerFormatter: function (rows) {
	                			return sumformat2(rows,'sevenday','newuser');
	                    }},
	    	     
	                {field:'income',title:'收入',sortable:true,formatter: function(value,row,index){
	                    return (value*1).toFixed(2);},
	            		footerFormatter: function (rows) {
	            			return sumformat(rows,'income');
	                }
	                    
	                    
	    	        }, 
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

function sumformat2(rows,field1,field2) {
	  var keepusercount = 0;
	  var newusercount = 0;
	  for (var i in rows) {
		  keepusercount += rows[i][field1]*1;
		  newusercount += rows[i][field2]*1;
	  }
	  return  keepusercount+'('+((keepusercount/newusercount)*100).toFixed(2)+'%)';
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

function formatDate(date){
	var newDate=date.split("-").join("/");
	var num=(new Date(newDate)).getTime();
	return num;
}
function query(){
	var date=$('#pick').val().split("-");
	var startdate=date[0].replace(" ","").split("/").join("-");
    var enddate=date[1].replace(" ","").split("/").join("-");
	 if(formatDate(startdate)>formatDate(enddate)){
		 Ewin.alert({ title: "温馨提示",
	      		 message: "结束日期不得小于起始日期!"
	    	});
	    	return false;
	 }
    $('#table').bootstrapTable('refresh');
}