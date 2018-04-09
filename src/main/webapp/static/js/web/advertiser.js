$(function() { 
	
	$("#type").jSelect({
		data:advertisertype,
		datakey:["value","text"],
		multiple:false
	});

	$("#adsource").jSelect({
		data:advertisertype,
		datakey:["value","text"],
		multiple:false
	});
	
	$("#balancedate").jSelect({
		 data:balancedate,
		 datakey:["value","text"],
		 multiple:false
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
  
	$.ajax({
		url: rootPath+"/sys/user/Select.html",
          dataType: 'json',
          success : function(data){
        	  $("#managername").jSelect({
        		  data:data,
        		  datakey:["id","username"],
        		  multiple:false
        	  });
          }
	});

	$('#table').bootstrapTable({   
		url:rootPath+'/advertiser/List.html',
		method:'post',
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
			var advertiserid=$('#advertiserid').selectVal();
			var adsource=$('#adsource').selectVal();
			console.log(advertiserid,adsource);
			return {  
			      page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			      rows: params.limit,//页面大小
			      sortName:params.sort,
                  sortOrder:params.order,
			      advertiserid:advertiserid,
			      adsource:adsource,
			      };  
		},
		height:getTableHeight(),
	    columns:[   
	            {field:'btSelectItem',checkbox:true},          
	  	        {field:'id',title:'id',sortable:true},  
	  	        {field:'managername',title:'业务员'}, 
	  	        {field:'type',title:'广告源',sortable:true,formatter: function(value,row,index){
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
	  	        {field:'name',title:'广告主',sortable:true},
	  	        {field:'balancedate',title:'结算周期',width:'6%',sortable:true,formatter: function(value,row,index){
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
  		        },},
	  	        {field:'tel',title:'手机号码',width:'10%',sortable:true,},   
	  	        {field:'qq',title:'QQ',width:'10%',sortable:true,},   
	  	        {field:'address',title:'地址',width:'13%',sortable:true},
	  	        {field:'remark',title:'备注',width:'8%',sortable:true},
//		        {field:'UserNameByCreate',title:'建立人',width:'6%',sortable:true},
		        {field:'UserNameByUpdate',title:'操作者',width:'6%'},
	    ],
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
//编辑面板
function Winedit(name,id){
	doReset();
	$("#win1title").html(name);	
	if(id!="")
	{	
		 $.ajax({
   		  url:rootPath+'/advertiser/Find.html',
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
          		  $('#qq').val(data[0].qq);
          		  $('#tel').val(data[0].tel);
     		      $('#name').val(data[0].name);
     		      $('#linkman').val(data[0].linkman);
     		      $('#address').val(data[0].address);
     		      $('#remark').val(data[0].remark);
     		      $('#managername').selectVal(data[0].managername);
     		      /*$('#managername').val(data[0].managername);
     		      $('#managername').trigger('change'); */
     		      $('#username').val(data[0].username);
     		      $('#password').val(data[0].password);
     		      
     		      $('#balancedate').selectVal(data[0].balancedate);
			      /*$('#balancedate').val(data[0].balancedate);
			      $('#balancedate').trigger('change');*/ 
			      $('#type').selectVal(data[0].type);
			      
    		     /* $('#type').val(data[0].type);
    		      $('#type').trigger('change'); */
   		  },
   		  error:function(e){
   			  console.log(e);
   		  }
   	 });
	}
	$('#win1').modal('show');
}
//保存
function save(){
	 var id=$('#id').val();	
     var type=$('#type').selectVal();
 	 var qq=$('#qq').val();
 	 var tel=$('#tel').val();
 	 var name=$('#name').val();
 	 var linkman=$('#linkman').val();
 	 var address=$('#address').val();
 	 var remark=$('#remark').val();
     var balancedate=$('#balancedate').selectVal();
     var managerid=$('#managername').selectVal();
     var username=$('#username').val();
     var password=$('#password').val();
	 $.ajax({
		  url:rootPath+'/advertiser/Save.html',
		  type:"post",
		  data:{"id":id,'type':type,'balancedate':balancedate,'managerid':managerid,'username':username,'password':password,
			   'qq':qq,'tel':tel,'name':name,'linkman':linkman,'address':address,'remark':remark},
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
      				Ewin.alert({ title: '提示:',
      		    		 message: ' 保存成功!',
      		    		 icon:"glyphicon-ok"
      		    		 });
      			 }
      			 else
      			 {
      				Ewin.alert({ title: '提示:',
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
		  url:rootPath+'/advertiser/Delete.html',
 		  type:"post",
 		  data:{"id":id},
 		  dataType:"json",
 		  success: function(data){
        		      if(data.code==12){
        		    	  Ewin.alert({ title: "fail",
           		    		 message: '无权限访问!  '+data.errorMessage
           		    		});  
        		    	  $('#win1').modal('hide');
     				   return false;
     			     }	
        			 if(data.msg==null)
        			 {
        				 Ewin.alert({ title: '提示:',
          		    		 message: ' 删除成功!',
          		    		 icon:"glyphicon-ok"
        				 });
        			 }
        			 else
        			 {
        				 Ewin.alert({ title: '提示:',
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
