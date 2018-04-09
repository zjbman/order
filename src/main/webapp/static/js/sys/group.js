$(function() { 
	$.ajax({
		url: rootPath+"/sys/group/Select.html",
          dataType: 'json',
          async:false,
          success : function(data){
        	  $("#groupid").jSelect({
        		  data:data,
      			 datakey:["id","name"],
      			 multiple:false
         	 });
         	 
           }
 	});
	$('#table').bootstrapTable({   
		url:rootPath+'/sys/group/List.html',
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
			var groupid=$('#groupid').selectVal();
			return {  
			      page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			      rows: params.limit,//页面大小
			      groupid:groupid
			      };  
		},
		onClickRow: function(rowIndex, rowData){
			id=rowData.id;
		},
	    columns:[[    
	        {field:'ck',checkbox:true },     
	        {field:'id',title:'id',sortable:true,},   
	        {field:'name',title:'用户组名称',sortable:true,},   
	        {field:'remark',title:'备注',sortable:true,},  
	        {field:'UserNameByCreate',title:'建立人',sortable:true},
	        {field:'createDate',title:'建立时间',sortable:true},
	        {field:'UserNameByUpdate',title:'修改人',sortable:true},
	        {field:'updateDate',title:'修改时间',sortable:true},
	    ]],
	    striped:true,//出现斑马线
	    checkboxHeader:false,
	    singleSelect:true,
	    sidePagination: "client",  //分页方式：client客户端分页，server服务端分页（*）
		pagination: true,   //是否显示分页（*）
		pageNumber:1,   //初始化加载第一页，默认第一页
		pageSize:20,   //每页的记录行数（*）
		pageList: [10, 20, 30, 50]
	});

});

function add(){
	Winedit("新增","");
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
	  Winedit(row[0].name+"--修改",row[0].id);
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
	del(row[0].id);
    }

//新增面板
function Winedit(name,id){
	$('#id').val("");
	doReset();
	if(id!="")
	{	
		 $.ajax({
   		  url:rootPath+'/sys/group/Find.html',
   		  type:"post",
   		  data:{"id":id},
   		  dataType:"json",
   		  success: function(data){
   			 if(data.code==12)
  			  {
   		        Ewin.alert({ title: "fail",
       	    	 message:'无权限访问!  '+data.errorMessage
       	    		});
       		 $('#win1').modal('hide');
    			 return false;
  			  }	
   			 		  $('#id').val(data[0].id);
          		      $('#name').val(data[0].name);
          		      $('#remark').val(data[0].remark);
   		  }
   	 });
	}
	$("#win1title").html(name);
	$('#win1').modal('show');
}

function save(){
	 var id=$('#id').val();	
	 var name=$('#name').val();
	 var remark=$('#remark').val();
	 $.ajax({
		  url:rootPath+'/sys/group/Save.html',
		  type:"post",
		  data:{"id":id,"name":name,"remark":remark},
		  dataType:"json",
		  success: function(data){
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
   		        Ewin.alert({ title: "提示",
 		    		 message: ' 保存失败!',
 		    		 icon:"glyphicon-remove"
 		    		 });
   			 }
   			$('#table').bootstrapTable('refresh');
		  }
	 });
}

function del(id){
	$.ajax({
 		  url:rootPath+'/sys/group/Delete.html',
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
			        Ewin.alert({ title: "fail",
 		    		 message: ' 删除成功!',
 		    		 icon:"glyphicon-ok"
 		    		 }); 
			 }
			 else
			 {
			        Ewin.alert({ title: "提示",
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