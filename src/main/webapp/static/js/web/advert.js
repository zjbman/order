$(function() { 
	
	$.ajax({
		url: rootPath+"/advert/Select.html",
          dataType: 'json',
          async:false,
          success : function(data){
        	  $("#advertid").jSelect({
     			 data:data,
     			 datakey:["id","name"],
     			 multiple:false
     		 });
        	 
          }
	});
	
	$.ajax({
		url: rootPath+"/advertiser/Select.html",
        dataType: 'json',
        async:false,
        success : function(data){
        	$("#advertiserid").jSelect({
     			 data:data,
     			 datakey:["id","name"],
     			 multiple:false
     		 });
        	 
          }
	});
	
	$("#adsource").jSelect({
		data:advertisertype,
		datakey:["value","text"],
		multiple:false
	});
	
	
	$("#state").jSelect({
		 data:adstate,
		 datakey:["value","text"],
		 multiple:false
	});
	
	
	$('#startUseTime').datetimepicker({  
	    format: 'YYYY-MM-DD',  
	    locale: moment.locale('zh-cn')  
	}); 
	
	$('#stopUseTime').datetimepicker({  
	    format: 'YYYY-MM-DD',  
	    locale: moment.locale('zh-cn') 
	}); 
	
	$('#table').bootstrapTable({
        url: rootPath+'/advert/List.html',  //请求后台的URL（*）
        method: 'post',   //请求方式（*）
        dataType: "json",
        contentType : "application/x-www-form-urlencoded",
        height:getTableHeight(),
        responseHandler: function(data){
			if(data.code==12)
			{
		    	Ewin.confirm({ title:'fail',
		    		 message: '无权限访问!  '+data.errorMessage
		    		 });
				return false;
			}	
			if (data.d){
				return data.d;
			} else {
				return {
					"total":data.total,
					"rows":data.rows
				};
			}
		},
		queryParams:function(params) {
			var advertiserid=$('#advertiserid').selectVal();
			var advertid=$('#advertid').selectVal();
			var adsource=$('#adsource').selectVal();

			return {  
			      page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			      rows: params.limit,//页面大小
			      sortName:params.sort,
                  sortOrder:params.order,
			      advertiserid: advertiserid,
				  advertid:advertid,
				  adsource:adsource
			      };  
		},

		striped:true,//出现斑马线
	    checkboxHeader:false,
	    singleSelect:true,
	    sidePagination: "server",  //分页方式：client客户端分页，server服务端分页（*）
		pagination: true,   //是否显示分页（*）
		pageNumber:1,   //初始化加载第一页，默认第一页
		pageSize:20,   //每页的记录行数（*）
		pageList: [10, 20, 30, 50], //可供选择的每页的行数（*）   
        columns:[
          {field:'btSelectItem',checkbox:true},           
		  {field:'id',title:'id' ,sortable:true,},  
		  {field:'adsource',title:'广告源',formatter: function(value,row,index){
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
		  {field:'advertisername',title:'广告主'},
		  {field:'name',title:'广告', sortable:true},
		  {field:'advertkey',title:'广告key',sortable:true},
		  {field:'operationpattern',title:'运营模式',formatter:function(value,row,index){
		     if(value==1)
		     {
		      return  "<a>正式</a>";
		     }
		     if(value==2)
		     {
			   return "<a style='color:blue;'>测试</a>";
		     }
		 },
		  },
		 {field:'adtype',title:'广告类型',sortable:true,formatter: function(value,row,index){
			if(value==1)
			{
			    return "下载";
			}
			if(value==2)
			{
			    return "跳转";
			}
			if(value==3)
			{
				return "单机";
			}
			if(value==4)
			{
				return "插件";
			}
			},
		 },
		 {field:'adstate',title:'在投样式',formatter: function(value,row,index){
			 var type="";
				if(value!=undefined)
				{	
			if(value.indexOf("1")>-1)
			{
				type+="插屏,";
			}
			if(value.indexOf("2")>-1)
			{
				type+="banner,";
			}
			if(value.indexOf("3")>-1)
			{
				type+="全屏,";
			}
			if(value.indexOf("4")>-1)
			{
				type+="开屏,";
			}
			 if(value.indexOf("5")>-1)
			{
				type+="视频,";
			 }
		   	if(value.indexOf("6")>-1)
			{
				type+="开屏视频,";
			  } 
		   	if(value.indexOf("7")>-1)
			{
				type+="动画中心视频,";
			  } 
		   	if(value.indexOf("8")>-1)
			{
				type+="游戏墙,";
			  } 
		   	if(value.indexOf("9")>-1)
			{
				type+="做梦视频";
			  } 
		   	if(value.indexOf("11")>-1)
			{
				type+="拉起视频,";
			  } 
			   	return type;
					
			 }else{
				 return type;
			 }
			 
		 },}, 
        {field:'create_date',title:'建立时间',sortable:true,},
        {field:'update_date',title:'更新时间',sortable:true,},
        {field:'UserNameByUpdate',title:'修改人',}
       ]

  });
	
	
	  
	
});
	
function add(){
	window.open(rootPath+'/advert/EditPage.html',"pageframe");
}
function allconfig(){
	var row= $('#table').bootstrapTable('getSelections');
    if(row.length==0)
    {
    	Ewin.confirm({ title: "温馨提示",
   		 message: "请选择操作的记录!"
   		 });
        return false;
    }
    
    Win2edit(row[0].name+"--一键",row[0].id);
}

function config(){
	var row= $('#table').bootstrapTable('getSelections');
    if(row.length==0)
    {
    	Ewin.confirm({ title: "温馨提示",
   		 message: "请选择操作的记录!"
   		 });
        return false;
    }
    window.location.href=rootPath+"/adstyleconfig/Page.html?advertid="+row[0].id;
}
function update(){
    var row= $('#table').bootstrapTable('getSelections');
    if(row.length==0)
    {
    	Ewin.confirm({ title: "温馨提示",
   		 message: "请选择操作的记录!"
   		 });
        return false;
    }
    window.open(rootPath+'/advert/EditPage.html?id='+row[0].id,"pageframe");
}

function delet(){
	  var row= $('#table').bootstrapTable('getSelections');
	    if(row.length==0)
	    {
	    	Ewin.confirm({ title: "温馨提示",
	   		 message: "请选择操作的记录!"
	   		 });
	        return false;
	    }
	del(row[0].id);
    }
//删除
function del(id){
	$.ajax({
		  url:rootPath+'/advert/Delete.html',
 		  type:"post",
 		  data:{"id":id},
 		  dataType:"json",
 		  success: function(data){
		      if(data.code==12){
		    	  Ewin.confirm({ title: "fail",
   		    		 message: '无权限访问!  '+data.errorMessage
   		    		});  
		    	  $('#win1').modal('hide');
				   return false;
			     }	
			 if(data.msg==null)
			 {
				 Ewin.confirm({ title: '提示:',
  		    		 message: ' 删除成功!',
  		    		 icon:"glyphicon-ok"
  		    		 });
			 }
			 else
			 {
				 Ewin.confirm({ title: '提示:',
 		    		 message: '  删除失败!',
 		    		 icon:"glyphicon-remove"
 		    		 });
			 }	 
			 $('#table').bootstrapTable('refresh');
	  }
 	 });
}
function query(){
	$('#table').bootstrapTable('refresh');
}
