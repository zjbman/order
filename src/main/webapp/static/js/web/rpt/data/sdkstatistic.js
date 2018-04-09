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
 	 });	 
   }
});

$.ajax({
	url: rootPath+"/sdkupdate/Select.html",
    dataType: 'json',
    async:false,
    success : function(data){   	
    	var temp =data[0].fileversion; 
    	for(var i = 0; i < data.length;i++){
    		if(data[i].fileversion>temp){
    			temp=data[i].fileversion;
    		}
    		else{
    			continue;
    		}
    	}
    	console.log(temp);
    	$("#sdkversion").jSelect({
  		  data:data,
			 datakey:["fileversion","fileversion"],
 	 });
    	 $('#sdkversion').selectVal([temp]); 	 
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


$(function() { 
	var tableh=window.innerHeight>0? window.innerHeight:window.screen.height;
	$('#table').bootstrapTable({   
		url:rootPath+'/rpt/sdk/statistic/List.html',
		method: 'post',   //请求方式（*）
        dataType: "json",
        contentType : "application/x-www-form-urlencoded",
        responseHandler: function(data){
			if(data.code==12)
			{
                Ewin.alert({ title:'fail',
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
		    var sdkversion1=$('#sdkversion').selectVal();
		    console.log("最大版本"+sdkversion1);
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
	var startdate=date[0].replace(" ","").split("/").join("-");
    var enddate=date[1].replace(" ","").split("/").join("-");
	 if(formatDate(startdate)>formatDate(enddate)){
	    	Ewin.confirm({ title: "温馨提示",
	      		 message: "结束日期不得小于起始日期!"
	    	});
	    	return false;
	 }
    $('#table').bootstrapTable('refresh');
}