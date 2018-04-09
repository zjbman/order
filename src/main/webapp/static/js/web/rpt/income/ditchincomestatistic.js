$(function() {
	$.ajax({
		url: rootPath+"/app/Select.html",
        dataType: 'json',
        async:false,
        success : function(data){
        	$("#appname").jSelect({
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
        	$("#appditch").jSelect({
      		  data:data,
  			 datakey:["id","name"],
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
		url:rootPath+'/DitchIncome/List.html',
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
				return data;
			}
		},
		queryParams:function(params) {
			var date=$('#pick').val().split("-");
			var startdate=date[0].replace(" ","").split("/").join("-");
		    var enddate=date[1].replace(" ","").split("/").join("-");
		    var appname=$('#appname').selectVal();
		    var appditch=$('#appditch').selectVal();
			return {  
			      page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			      rows: params.limit,//页面大小
			      startdate: startdate,
			      enddate: enddate,
			      appname:appname,
			  	  appditch:appditch,
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
            {field:'appname',title:'应用名',sortable:true,},
            {field:'ditchname',title:'渠道',sortable:true,},
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
	        {field:'showcount',title:'展示数',sortable:true,
            		footerFormatter: function (rows) {
            			return sumformat(rows,'showcount');
                }},
	     
            {field:'income',title:'收入',sortable:true,formatter: function(value,row,index){
                return (value*1).toFixed(2);},
        		footerFormatter: function (rows) {
        			return sumformat(rows,'income');
            }
	        }, 
	        {field:'ecpa',title:'ecpa',sortable:true,formatter: function(value,row,index){
                return (value*1).toFixed(2);},},
            {field:'avg_rq',title:'平均活跃请求',sortable:true,formatter: function(value,row,index){
                return (value*1).toFixed(2);},},
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
function excel(){ 
    document.getElementById("formMain").action=rootPath+"/excel/Marketexport/Excel.html";
    document.getElementById("formMain").submit();
}
function o7excel(){ 
	 document.getElementById("formMain").action=rootPath+"/excel/o7export/Excel.html";
	 document.getElementById("formMain").submit();
}