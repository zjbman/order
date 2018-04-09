$(function() { 	
	$.ajax({
		url: rootPath+"/market/Select.html",
          dataType: 'json',
          async:false,
          success : function(data){
        	  $("#marketid").jSelect({
        		  data:data,
      			 datakey:["id","name"],
      			 multiple:false
         	 });
         	 
           }
 	});
	
	$("#type").jSelect({
		data:advertisertype,
		datakey:["value","text"],
		multiple:false
	});
	
	$("#feetype").jSelect({
		data:feetype,
		datakey:["value","text"],
		multiple:false
	});
	
	$("#balancedate").jSelect({
		data:balancedate,
		datakey:["value","text"],
		multiple:false
	});
    
	$('#table').bootstrapTable({   
		url:rootPath+'/market/List.html',
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
				return {
					"total":data.total,
					"rows":data.rows
				};
			}
		},
		queryParams:function(params) {
			var marketid=$('#marketid').selectVal();
			return {  
			      page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			      rows: params.limit,//页面大小
			      sortName:params.sort,
                  sortOrder:params.order,
			      marketid:marketid			   
			      };  
		},
		
		onClickRow: function(rowIndex, rowData){
			id=rowData.id;
		},
	    columns:[[    
	              {field:'ck',checkbox:true },          
		  	        {field:'id',title:'id',sortable:true,},  
		  	        {field:'marketkey',title:'市场key',sortable:true}, 
		  	        {field:'name',title:'市场名称',sortable:true},
		  	        {field:'cooperation',title:'合作分成',sortable:true},        
	                {field:'marketlink',title:'市场链接',sortable:true},
	                {field:'balancedate',title:'结算周期',sortable:true,formatter: function(value,row,index){
	                    if(value==1)
	                    {
	                        return "周结";
	                    }
	                    if(value==2)
	                    {
	                        return "双周结";
	                    }
	                    if(value==3)
	                    {
	                        return "月结";
	                    }
	                    if(value==4)
	                    {
	                        return "其他";
	                    }
	                },
	                },
		  	        {field:'appname',title:'在投应用',sortable:true,cellStyle:function(value,row,index){
						 return  {
								css: {
									"white-space":"normal"
									 }
							 	};
						 }},
		  	        {field:'update_date',title:'更新时间',sortable:true},
			        {field:'userNameByUpdate',title:'操作者'},
	    ]],
	    
	    height:getTableHeight(),
	    striped:true,//出现斑马线
	    checkboxHeader:false,
	    singleSelect:true,
	    sidePagination: "server",  //分页方式：client客户端分页，server服务端分页（*）
		pagination: true,   //是否显示分页（*）
		pageNumber:1,   //初始化加载第一页，默认第一页
		pageSize:20,   //每页的记录行数（*）
		pageList: [10, 20, 30, 50] //可供选择的每页的行数（*）   
	});

	

});
function add(){

	Winedit("新增","");
}
function update(){
    var row= $('#table').bootstrapTable('getSelections');
    if(row.length==0)
    {
        Ewin.alert({ title:'温馨提示',
      		 message: "请选择操作的记录!"
      		 });
          return false;
    }
    Winedit(row[0].name+"--修改",row[0].id);
}

function allconfig(){
	var row= $('#table').bootstrapTable('getSelections');
    if(row.length==0)
    {
        Ewin.alert({ title:'温馨提示',
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
        Ewin.alert({ title:'温馨提示',
   		 message: "请选择操作的记录!"
   		 });
        return false;
    }
    window.location.href=rootPath+"/marketconfig/Page.html?marketid="+row[0].id;
}

function delet(){
	var row= $('#table').bootstrapTable('getSelections');	
	if(row.length==0)
	{
        Ewin.alert({ title:'温馨提示',
	   		 message: "请选择操作的记录!"
	   		 });
			 return false;
	}
	del(row[0].id);
    }

//编辑面板
function Winedit(name,id){
    $('#id').val("");
	 doReset();
	$("#win1title").html(name);
	if(id!="")
	{	
		 $.ajax({
   		  url:rootPath+'/market/Find.html',
   		  type:"post",
   		  data:{"id":id},
   		  dataType:"json",
   		  success: function(data){
          		   if(data.code==12)
       			  {
          		        Ewin.alert({ title:'fail',
            	    	 message:'无权限访问!  '+data.errorMessage
            	    		});
            		 $('#win1').modal('hide');
         			 return false;
       			  }	
          		 $('#id').val(data[0].id);
    		      $('#name').val(data[0].name);
    		      $('#username').val(data[0].username);
    		      $('#remark').val(data[0].remark);
    		      $('#cooperation').val(data[0].cooperation);
      		      $('#balancedate').selectVal(data[0].balancedate);
      		      $('#marketlink').val(data[0].marketlink);

   		  }, error:function(e){
  			  console.log(e);
  		  }
   	 });
	}
	$('#win1').modal('show');
}
//保存
function save(){
	 var id=$('#id').val();	
     var name=$('#name').val();
     var remark=$('#remark').val();  
     var username=$('#username').val();
	 var cooperation=$('#cooperation').val();
	 var marketlink=$('#marketlink').val();
	 var balancedate=$('#balancedate').selectVal();
	 $('#balancedate').trigger('change');
	  
	 $.ajax({
		  url:rootPath+'/market/Save.html',
		  type:"post",
		  data:{"id":id,'username':username,'cooperation':cooperation,'marketlink':marketlink,
			   'name':name,'remark':remark,'balancedate':balancedate},
		  dataType:"json",
		  success: function(data){
			  	$('#win1').modal('hide');
      		      if(data.code==12)
   			     {
      		        Ewin.alert({ title:'fail',
    		    		 message: '无权限访问!  '+data.errorMessage
    		    		 });
 				   return false;
   			     }	
      			 if(data.msg==null)
      			 {
      		        Ewin.alert({ title:'提示',
    		    		 message: ' 保存成功!',
    		    		 icon:"glyphicon-ok"
    		    		 });
      			 }
      			 else
      			 {
      		        Ewin.alert({ title:'提示',
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
		  url:rootPath+'/market/Delete.html',
 		  type:"post",
 		  data:{"id":id},
 		  dataType:"json",
 		  success: function(data){
        		      if(data.code==12)
     			     {
        		          Ewin.alert({ title:'fail',
         		    		 message: '无权限访问!  '+data.errorMessage
         		    		});  
          		    	  $('#win1').modal('hide');
       				   return false;
     			     }	
        			 if(data.msg==null)
        			 {
        			        Ewin.alert({ title:'提示',
          		    		 message: ' 删除成功!',
          		    		 icon:"glyphicon-ok"
          		    		 }); 
        			 }
        			 else
        			 {
        			        Ewin.alert({ title:'提示',
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

function doReset()
{
var tbl_content = document.getElementById("ctable");
var inputs = tbl_content.getElementsByTagName("input");
for(var k=0;k<inputs.length;k++)
{
inputs[k].value="";
}
} 