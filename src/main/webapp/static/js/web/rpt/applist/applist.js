var n =0;
	realHour=1;//实时查询的时间 表示几个小时前
	startdate="";
	enddate="";	
	data=[];
	
	query();
	$('#table').bootstrapTable({   
		url:rootPath+'/rpt/applist/statistic/List.html',
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
			var appinstallname=$('#appinstallname').val();
			var appinstallpackagename=$('#appinstallpackagename').val();
			console.log(startdate+"---->"+enddate);
			return {  
		    	page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			    rows: params.limit,//页面大小
			    startdate: startdate,
			    enddate: enddate,
			    appinstallname:appinstallname,
			    appinstallpackagename:appinstallpackagename   
			      };  
		},
	    columns:[[    
		  	        {field:'appinstallname',title:'应用',sortable:true,},  
		  	        {field:'appinstallpackagename',title:'包名',sortable:true}, 
		  	        {field:'installcount',title:'安装数',sortable:true},
	    ]],
		striped:true,//出现斑马线
	    checkboxHeader:false,
	    singleSelect:true,
	    showFooter: true,
	});

	var startdate2 =moment().subtract(7, 'days').format("YYYYMMDD"); 
	var enddate2 = moment().subtract(1, 'days').format("YYYYMMDD"); 
	console.log(startdate2+"---->"+enddate2);
	 $.ajax({
		  url:rootPath+'/rpt/applist/statistic/count.html',
		  type:"post",
		  data:{"startdate2":startdate2,"enddate2":enddate2},
		  dataType:"json",
		  success: function(data){
			  if (data.d){
					return data.d;
				} else {
					if(data.rows[0]){
					$("#count").html(data.rows[0].applistcount);
					}
					$("#date").html(formatStringdate(startdate2)+"至"+formatStringdate(enddate2));
					return data.rows;
				}
 		  }
	 });



//昨天，近3天，近7天
$("#yesterday").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
	n=0;
	realHour=1;
});
$("#day3").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
	n=0;
	realHour=3;
});
$("#day7").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
	n=0;
	realHour=7;
});


function getRealTime(n,day){
	var startDate =moment().subtract(day, 'days').subtract(n, 'hours').startOf("hours").format("YYYYMMDD"); 
	var endDate = moment().subtract(day, 'days').subtract(1, 'hours').startOf("hours").format("YYYYMMDD"); 
	if(n==0){ //表示整天
		startDate =moment().subtract(day, 'days').startOf("days").format("YYYYMMDD"); 
		endDate = moment().subtract(1, 'days').startOf("days").format("YYYYMMDD"); 
	}
	return{
		startDate:startDate,
		endDate:endDate
	}
}


function query(){
	var data1= getRealTime(n,realHour);
	startdate=data1.startDate;
	enddate=data1.endDate;
    $('#table').bootstrapTable('refresh');

}

