$(function() { 

	$.ajax({
		url:rootPath+"/market/Select.html",
	    dataType: 'json',
        async:false,
	    success : function(data){
	    	$("#relevanceMarket").jSelect({
	    		 data:data,
	 			 datakey:["marketkey","name"],
	 			 multiple:true
	    	});
	    	 
	      }
	});	
	
	$.ajax({
		url:rootPath+"/sdkupdate/Select.html",
	    dataType: 'json',
	    async:false,
	    success : function(data){
	    	$("#sdkupdateid").jSelect({
	    		 data:data,
	 			 datakey:["id","filename"],
	 			 multiple:false
	    	});
	    	 
	      }
	});


    $('#table').bootstrapTable({
		url: rootPath+'/sdkupdate/List.html',
		method: 'post',   //请求方式（*）
	    dataType: "json",
	    contentType : "application/x-www-form-urlencoded",
	    height:getTableHeight(),
	    striped:true,//出现斑马线
	    checkboxHeader:false,
	    singleSelect:true,
	    sidePagination: "server",  //分页方式：client客户端分页，server服务端分页（*）
		pagination: true,   //是否显示分页（*）
		pageNumber:1,   //初始化加载第一页，默认第一页
		pageSize:20,   //每页的记录行数（*）
		pageList: [10, 20, 30, 50], //可供选择的每页的行数（*）  
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
		    var sdkupdateid=$('#sdkupdateid').selectVal();
            var typeid=$('#typeid').selectVal();
			return {  
				page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			    rows: params.limit,//页面大小
			    sdkupdateid: sdkupdateid,
                typeid: typeid
			};
		},
		 
	       
		columns:[   
		         {field:'ck',checkbox:true },          
		         {field:'id',title:'id',sortable:true,},  
		         {field:'filename',title:'文件名',sortable:true},
		         {field:'address',title:'热更地址',sortable:true,cellStyle:function(value,row,index){
					 return  {
							css: {
								"white-space":"normal"
								 }
						 	};
					 }},
				 {field:'type',title:'类型',sortable:true,formatter:function(value,row,index){
					 if(value==1)
					 {
					  return  "猫的SDK";
					 }
					 if(value==2)
					 {
					   return "外放的SDK";
					 }
					 if(value==3)
					 {
					   return "统计sdk";
					 }
					 if(value==4)
                     {
                         return "其他";
                     }
					 },
					 },
		         {field:'disable',title:'状态',sortable:true,formatter:function(value,row,index){
		             if(value==true){
		                 return "<a style='color:red;'>停用</a>";
		             }
		             if(value==false)
		             {
		                 return "<a>启用</a>";
		             }
		         },
		 		},
		         {field:'remark',title:'更新内容',sortable:true,cellStyle:function(value,row,index){
					 return  {
						css: {
							"white-space":"normal"
							 }
					 	};
				 }},
		         {field:'updateDate',title:'更新时间',sortable:true},
		         {field:'UserNameByCreate',title:'建立人',sortable:true},
		         {field:'UserNameByUpdate',title:'修改人',sortable:true}
		         ]
	    
	});
	
});

$("#type").jSelect({
	 data:sdkUpdateType,
	 datakey:["value","text"],
	 multiple:false
});

$("#typeid").jSelect({
	 data:sdkUpdateType,
	 datakey:["value","text"],
	 multiple:false
});

function add(){
	Winedit("新增","");
}

function update(){
	var row=getSelectRow();
	if(row){
		Winedit(row[0].filename+"--修改",row[0].id);
	}
}


function delet(){
	deletFormat(rootPath+'/sdkupdate/Delete.html')
}
//编辑面板

function Winedit(name,id){
	$("#win1title").html(name);
	doReset();
	if(id!="")
	{	
		$.ajax({
			url:rootPath+'/sdkupdate/Find.html',
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
	      $('#filename').val(data[0].filename);
		  if(data[0].relevanceMarket){
			  if(data[0].relevanceMarket.indexOf(",")!=-1){
				  var newkey=data[0].relevanceMarket.split(",");
				  $('#relevanceMarket').selectVal(newkey);
			  }else{
				  $('#relevanceMarket').selectVal([data[0].relevanceMarket]);
			  }
   			
   		  }
	      $('#address').val(data[0].address);
	      $('#remark').val(data[0].remark);
	      $('#type').selectVal(data[0].type);
	      if(data[0].disable)
		  {
	    	  document.getElementById("disable").checked=true;
				
		  } 
		  else if(data[0].disable==false)
		  {
			  document.getElementById("disable1").checked=true;
			  }
	  }
 });
}
$('#win1').modal('show');
}
//保存
function save(){
	var id;
	if($("#win1title").html() == "新增"){
		id = null;
	}else{
		id=$('#id').val();
	}
		
	var filename=$('#filename').val();
	var address=$('#address').val();
	var remark=$('#remark').val();
	var type=$('#type').selectVal();
	var disable = "";
	var relevanceMarket=$('#relevanceMarket').jSelect("val");
	if(document.getElementById("disable").checked==true){
	 disable=true;
 }
 if(document.getElementById("disable1").checked==true)
 {
	 disable=false;
 }
 
    if(filename==null||filename==""||address==null||address=="")
{

	Ewin.confirm({ title: "温馨提示",
   		 message: "文件名和热更地址不能为空!"
	   		 });
			 return false;
    }
    
    
  $.ajax({
	  url:rootPath+'/sdkupdate/Save.html',
	  type:"post",
	  data:{"id":id,'filename':filename,'address':address,
		  'remark':remark,'relevanceMarket':relevanceMarket,
		  'type':type,'disable':disable},
	  dataType:"json",
	  success: function(data){
		  $('#win1').modal('hide');
	  		if(isDataOk(data,"保存成功","保存失败")){
	  			$('#table').bootstrapTable('refresh');
	  			}
	  }
	 });
}

function doReset()
{
var tbl_content = document.getElementById("ctable");
var inputs = tbl_content.getElementsByTagName("input");
for(var k=0;k<inputs.length;k++)
{
	if(inputs[k].type=="radio"){
		inputs[k].checked="";
	}
inputs[k].value="";
}
} 
		
		
		
		