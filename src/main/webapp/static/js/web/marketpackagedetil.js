$(function() { 	
	$("#qappid").val(qappid);
	$('#table').bootstrapTable({	
		url:rootPath+'/marketPackageConfig/List.html',
		type: 'post',   //请求方式（*）
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
			var qappid=$('#qappid').val();
			var qmarketid=$('#qmarketid').val();
			return {  
			      page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			      rows: params.limit,//页面大小
			      sortName:params.sort,
                  sortOrder:params.order,
			      qappid:qappid,
			      qmarketid:qmarketid
			      };  
		},
		onClickRow: function(rowIndex, rowData){
			id=rowData.id;
		},
	    columns:[    
	            {field:'ck',checkbox:true },  
	            {field:'id',title:'id',sortable:true,}, 
	            {field:'marketpackageid',title:'市场id',sortable:true,visible:false},
	  	        {field:'appname',title:'应用'},
	  	        {field:'marketname',title:'市场'},
	  	        {field:'marketkey',title:'市场key'},
			    {field:'adstyle',title:'广告样式',formatter: function(value,row,index){
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
							type+="做梦视频,";
						  }
					   	if(value.indexOf("11")>-1)
						{
							type+="拉起视频,";
						  } 
					   	if(value.indexOf("12")>-1)
						{
							type+="原生广告,";
						  } 
		  		    	}
		  	        	return type;
		  			},
		  		    },
			    {field:'name',title:'包名',sortable:true},  
			    {field:'onlinetype',title:'上线状态',formatter:function(value,row,index){
			         if(value==1)
				     {
					   return "<a style='color:red;'>未上线</a>";
				     }
				      if(value==2)
				     {
					   return "<a>已上线</a>";
				     }
                    if(value==3)
                    {
                       return "<a style='color:#1cff5f;'>停止</a>";
                    }
			    },
			    },
			    {field:'marketpackagelink',title:'市场包链接',sortable:true},
		        {field:'marketonline_date',title:'上线时间',sortable:true},		      
		        {field:'updateDate',title:'更新时间',sortable:true},
		        {field:'configupdate_date',title:'配置更新',sortable:true},		        
		        {field:'UserNameByUpdate',title:'操作者'},
		        {field:'packageUserIdByUpdate',title:'修改人'},
	        
	    ],
	    striped:true,//出现斑马线
	    checkboxHeader:false,
	    singleSelect:true,
	    sidePagination: "server",  //分页方式：client客户端分页，server服务端分页（*）
		pagination: true,   //是否显示分页（*）
		pageNumber:1,   //初始化加载第一页，默认第一页
		pageSize:20,   //每页的记录行数（*）
		pageList: [10, 20, 30, 50], //可供选择的每页的行数（*）   
	});
	$.ajax({
		url: rootPath+"/app/Select.html",
          dataType: 'json',
          success : function(data){
        	 // console.log(data)
        	  $("#qappid").select2({
        		 data:mapData(data,"id","name"),
        		 language: "zh-CN",
        		 allowClear: true,
        		 placeholder:""
        	 });
        	 
          }
	});
	
	$.ajax({
		url: rootPath+"/market/Select.html",
          dataType: 'json',
          success : function(data){
        	 // console.log(data)
        	  $("#qmarketid").select2({
        		 data:mapData(data,"id","name"),
        		 language: "zh-CN",
        		 allowClear: true,
        		 placeholder:""
        	 });
        	 
          }
	});
});



function config(){
    var row= $('#table').bootstrapTable('getSelections');
    if(row.length==0)
    {
    	Ewin.confirm({ title: "温馨提示",
      		 message: "请选择操作的记录!"
      		 });
          return false;
    }
    Win2edit(row[0].appname+"--"+row[0].marketname,row[0].marketpackageid);
}

function back(){
	window.history.back();; //刷新上一页
}

function relation(){
	var id = $("#qappid").val();
    Winedit1("关联市场",id);
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
	  Winedit(row[0].name+"--修改",row[0].marketpackageid);
    }

function query(){
//	var appid=$('#qappid').val();
//	var marketid=$('#qmarketid').val();
//    window.location.href=rootPath+'/app/DetilePage.html?id='+appid+'&marketid='+marketid;
	 $('#table').bootstrapTable('refresh');
};

//编辑面板
function Winedit(name,id){
	$.ajax({
		url: rootPath+"/marketsort/Select.html",
          dataType: 'json',
          success : function(data){
        	 // console.log(data)
        	  $("#marketsortid").select2({
        		 data:mapData(data,"id","name")
        	  });
        	 
          	}
    	});
	if(id!="")
	{	
		 $.ajax({
   		  url:rootPath+'/marketPackage/Find.html',
   		  type:"post",
   		  data:{"id":id},
   		  dataType:"json",
   		  success: function(data){
   			  
          		   if(data.code==12)
       			  {
          			 Ewin.confirm({ title: "fail",
            	    	 message:'无权限访问!  '+data.errorMessage
            	    		});
            		 $('#win1').modal('hide');
         			 return false;
       			  }	
          		  $('#id').val(data[0].id);
     		      $('#name').val(data[0].name);
     		      $('#remark').val(data[0].remark);
     		      $('#appid').val(data[0].appid);
     		      $('#marketid').val(data[0].marketname);
     		      $('#marketsortid').val(data[0].marketsortid);
     		      $('#marketpackagelink').val(data[0].marketpackagelink);
     		     
   		  }
   	 });
	}
	$("#win1title").html(name);
	$('#win1').modal('show');
}

//关联市场
function Winedit1(name,id){
	$.ajax({
		url: rootPath+"/market/Select.html",
          dataType: 'json',
          success : function(data){
        	 // console.log(data)
        	  $("#marketid1").select2({
        		 data:mapData(data,"id","name"),
        		 allowClear: true,
        		 placeholder:"",
        	  });
        	 
          	}
    	});
	
	$.ajax({
		url: rootPath+"/marketsort/Select.html",
          dataType: 'json',
          success : function(data){
        	 // console.log(data)
        	  $("#marketsortid1").select2({
        		 data:mapData(data,"id","name"),
        		 allowClear: true,
        		 placeholder:""
        	  });
        	 
          	}
    	});
	$("#id").val(id);
	$("#win2title").html(name);
	$('#win2').modal('show');
}


function addsave(){
	 var id=$('#id').val();
	 var marketid=$('#marketid1').val();
	 var name=$('#name1').val();
	 var marketpackagelink=$('#marketpackagelink1').val();
	 var remark=$('#remark1').val();
	 var marketsortid=$('#marketsortid1').val();
	 $.ajax({
		  url:rootPath+'/marketPackage/Save.html',
		  type:"post",
		  data:{'remark':remark,'name':name,'marketpackagelink':marketpackagelink,
			  'marketid':marketid,'marketsortid':marketsortid,'appid':id},
		  dataType:"json",
		  success: function(data){
			     $('#win2').modal('hide');
     		      if(data.code==12)
  			     {
     		    	Ewin.confirm({ title: "fail",
   		    		 message: '无权限访问!  '+data.errorMessage
   		    		 });
				   return false;
  			     }	
     			 if(data.msg==null)
     			 {
     				Ewin.confirm({ title: '提示:',
   		    		 message: ' 保存成功!',
   		    		 icon:"glyphicon-ok"
   		    		 });
     			 }
     			 else
     			 {
     				Ewin.confirm({ title: '提示:',
  		    		 message: ' 保存失败!',
  		    		 icon:"glyphicon-remove"
  		    		 });
     			 }	 
     			 $('#table').bootstrapTable('refresh');
		  }
	 });
}



//保存
function save(){
	 var id=$('#id').val();	
 	 var name=$('#name').val();
 	 var marketpackagelink=$('#marketpackagelink').val();
 	 var remark=$('#remark').val();
	 var marketsortid=$('#marketsortid').val();
	 var appid = qappid;
	 $.ajax({
		  url:rootPath+'/marketPackage/Save.html',
		  type:"post",
		  data:{"id":id,'remark':remark,'name':name,'marketpackagelink':marketpackagelink,
			 'marketsortid':marketsortid,'appid':appid},
		  dataType:"json",
		  success: function(data){
			     $('#win1').modal('hide');
      		      if(data.code==12)
   			     {
      		    	Ewin.confirm({ title: "fail",
    		    		 message: '无权限访问!  '+data.errorMessage
    		    		 });
 				   return false;
   			     }	
      			 if(data.msg==null)
      			 {
      				Ewin.confirm({ title: '提示:',
    		    		 message: ' 保存成功!',
    		    		 icon:"glyphicon-ok"
    		    		 });
      			 }
      			 else
      			 {
      				Ewin.confirm({ title: '提示:',
   		    		 message: ' 保存失败!',
   		    		 icon:"glyphicon-remove"
   		    		 });
      			 }	 
      			 $('#table').bootstrapTable('refresh');
		  }
	 });
}

//删除
function delet(){
	var row= $('#table').bootstrapTable('getSelections');	
	if(row.length==0)
	{
		Ewin.confirm({ title: "温馨提示",
	   		 message: "请选择操作的记录!",
	   		 });
			 return false;
	}
	del(row[0].id);
    }


//删除
function del(id){
	$.ajax({
		  url:rootPath+'/marketPackage/Delete.html',
 		  type:"post",
 		  data:{"id":id},
 		  dataType:"json",
 		  success: function(data){
        		      if(data.code==12)
     			     {
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


