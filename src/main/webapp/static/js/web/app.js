$(function() { 
	var tableh=window.innerHeight>0? window.innerHeight:window.screen.height;

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
	
	$("#apptype").jSelect({
		data:apptype,
		datakey:["value","text"],
		multiple:false
	});

	$('#daterimepicker1').datetimepicker({  
    	format: 'YYYY-MM-DD',  
	    locale: moment.locale('zh-cn')  
	}); 
    
	$('#table').bootstrapTable({
		url:rootPath+'/appconfig/List.html',
		method: 'post',   //请求方式（*）
	    dataType: "json",
	    contentType : "application/x-www-form-urlencoded",
        height:getTableHeight(),
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
				return {
					"total":data.total,
					"rows":data.rows
				};
			}
		},
		queryParams:function(params) {
			var appid=$('#appid').selectVal();
			return {  
			      page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			      rows: params.limit,//页面大小
			      sortName:params.sort,
                  sortOrder:params.order,
			      appid:appid
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
	    columns:[[    
				{field:'ck',checkbox:true },          
				{field:'appid',title:'id',sortable:true,},  
				{field:'appkey',title:'应用key',sortable:true},
				{field:'name',title:'应用名称',sortable:true},
				{field:'englishname',title:'英文名称',sortable:true},
				{field:'apptype',title:'应用类型',sortable:true,formatter:function(value,row,index){
				 if(value==1)
				 {
				  return  "会说话系列";
				 }
				 if(value==2)
				 {
				   return "休闲跑酷";
				 }
				 if(value==3)
				 {
				   return "休闲射击";
				 }
				 if(value==4)
				 {
				   return "儿童益智";
				 }
				 if(value==5)
				 {
				   return "其他";
				     }
				 },
				 },
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
				{field:'packagename',title:'包名',sortable:true},
				{field:'online_date',title:'上线时间',sortable:true},
				{field:'updateDate',title:'更新时间',sortable:true},
				{field:'configupdate_date',title:'配置更新',sortable:true},		
				{field:'UserNameByUpdate',title:'操作者'},
				{field:'appUserIdByUpdate',title:'修改人',sortable:true}				
	    ]],	    
	});

});
function add(){
	Winedit("新增","");
}
function config(){
    var row= $('#table').bootstrapTable('getSelections');
    if(row.length==0)
    {
        Ewin.alert({ title: "温馨提示",
      		 message: "请选择操作的记录!"
   		  });
           return false;
    }
    Win2edit(row[0].name+"--配置",row[0].appid);
    
}
function update(){
	var row= $('#table').bootstrapTable('getSelections');
	if(row.length==0)
	{
        Ewin.alert({ title: "温馨提示",
	   		 message: "请选择操作的记录!"
	   		 });
	       return false;
	}
	  Winedit(row[0].name+"--修改",row[0].appid);
    }

function delet(){
	var row= $('#table').bootstrapTable('getSelections');	
	if(row.length==0)
	{
        Ewin.alert({ title: "温馨提示",
	   		 message: "请选择操作的记录!"
	   		 });
			 return false;
	}
	del(row[0].appid);
    }

//进入市场包详情页面
function detile(){
	var row= $('#table').bootstrapTable('getSelections');	
    if(row.length==0)
    {
        Ewin.alert({ title: "温馨提示",
	   		 message: "请选择操作的记录!"
	   		 });
			 return false;
    }
    window.location.href=rootPath+"/app/DetilePage.html?id="+row[0].appid;
   }

//编辑面板
function Winedit(name,id){
 $("#win1title").html(name);
  $('#id').val("");
  doReset();
	if(id!="")
	{	
		 $.ajax({
   		  url:rootPath+'/app/Find.html',
   		  type:"post",
   		  data:{"id":id},
   		  dataType:"json",
   		  success: function(data){
          		   if(data.code==12)
       			  {
          		        Ewin.alert({ title: "温馨提示",
            	    	 message:'无权限访问!  '+data.errorMessage
            	    		});
            		 $('#win1').modal('hide');
         			 return false;
       			  }	
          		  $('#id').val(data[0].id);
     		      $('#name').val(data[0].name);
     		      $('#englishname').val(data[0].englishname);
      		      $('#apptype').selectVal(data[0].apptype);
     		      $('#apptype').trigger('change'); 
     		      $('#packagename').val(data[0].packagename);
     		      $('#ditch').val(data[0].ditch);
     		      $('#versioncode').val(data[0].versioncode);
     		      $('#versionname').val(data[0].versionname);
     		      $('#remark').val(data[0].remark);

   		  },
   		  error:function(e){
  		  }
   	 });
	}
	$('#win1').modal('show');
}

//保存
function save(){
	
	 var id=$('#id').val();	
	 var name=$('#name').val();
	    if(name==null||name=="")
	    {

	        Ewin.alert({ title: "温馨提示",
		   		 message: "名字不能为空!"
		   		 });
				 return false;
	    }
	    	
	    var englishname=$('#englishname').val();
	    var apptype=$('#apptype').selectVal();
	    $('#apptype').trigger('change'); 

	    if(apptype==null||apptype=="")
	    {

	        Ewin.alert({ title: "温馨提示",
		   		 message: "类型不能为空!"
		   		 });
				 return false;
	    }

     var packagename=$('#packagename').val();
 	 var versioncode=$('#versioncode').val();
 	 var remark=$('#remark').val();
 
	 $.ajax({
		  url:rootPath+'/app/Save.html',
		  type:"post", 
		  data:{"id":id,'name':name,'packagename':packagename,'englishname':englishname,
			  'remark':remark,'versioncode':versioncode,'apptype':apptype},
		  dataType:"json",
		  success:function(data){
			     $('#win1').modal('hide');
      		      if(data.code==12)
   			     {
                      Ewin.alert({ title: "fail",
     		    		 message: '无权限访问!  '+data.errorMessage
     		    		 });
  				   return false;
   			     }	
      			 if(data.msg==null)
      			 {
                     Ewin.alert({ title: "提示",
     		    		 message: ' 保存成功!',
     		    		 icon:"glyphicon-ok"
     		    		 });
      			 }
      			 else
      			 {
                     Ewin.alert({ title: "fail",
    		    		 message: ' 保存失败!',
    		    		 icon:"glyphicon-remove"
    		    		 });
      			 }
      			$('#table').bootstrapTable('refresh');
		  }
	 });
}
//删除
function del(id){
	$.ajax({
		  url:rootPath+'/app/Delete.html',
 		  type:"post",
 		  data:{"id":id},
 		  dataType:"json",
 		  success: function(data){
        		      if(data.code==12)
     			     {
                          Ewin.alert({ title: "fail",
        		    		 message: '无权限访问!  '+data.errorMessage
        		    		});  
         		    	  $('#win1').modal('hide');
      				   return false;
     			     }	
        			 if(data.msg==null)
        			 {
                         Ewin.alert({ title: "提示",
          		    		 message: ' 删除成功!',
          		    		 icon:"glyphicon-ok"
          		    		 }); 
        			 }
        			 else
        			 {
                         Ewin.alert({ title: "fail",
         		    		 message: '  删除失败!',
         		    		 icon:"glyphicon-remove"
         		    		 });
        			 }	 
        			 $('#table').bootstrapTable('refresh');
 		  },error:function(e){
  		  }
 	 });
}
function query(){
    $('#table').bootstrapTable('refresh');

}

function doReset()
{
var tbl_content = document.getElementById("ctable");
var inputs = tbl_content.getElementsByTagName("input");
for(var k=0;k<inputs.length;k++)
{
inputs[k].value="";
}
} 
