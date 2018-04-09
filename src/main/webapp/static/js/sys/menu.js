$(function() { 
	
	$.ajax({
		url:rootPath+'/sys/menu/List.html',
		type:"post",
		success:function(data){
			var olddata=JSON.parse(data); 
			var newdata=[];
			for(var item in olddata){
				var nodes=olddata[item].children;
				for(var i in nodes){
					if(nodes[i].children){
						nodes[i].nodes=nodes[i].children;
					}
				};
				newdata.push({
					"pid":olddata[item].pid,
					"parentPageId":olddata[item].parentPageId,
					"id":olddata[item].id,
					"text":olddata[item].text,
					"nodes":nodes
				});
			}
			$('#menu').treeview({
			    color: "#428bca",
			    //backColor: "black",背景色
			    //borderColor:'green',
			    //collapseIcon: "glyphicon glyphicon-minus",//可收缩的节点图标
			    //nodeIcon: "glyphicon glyphicon-user",
			    //emptyIcon: "glyphicon glyphicon-ban-circle",//设置列表树中没有子节点的节点的图标
			   // expandIcon: "glyphicon glyphicon-plus",  //设置列表上中有子节点的图标
			    highlightSearchResults:true,//是否高亮搜索结果 默认true
			    highlightSelected:true,     //是否选中高亮显示
			    onhoverColor: "#f5f5f5",    //鼠标滑过的颜色
			    levels: 0 ,                 //设置初始化展开几级菜单 默认为2
			    selectedIcon: 'glyphicon glyphicon-tint',
			   // selectedBackColor: 'black',  //设置被选中的节点背景颜色
			    //selectedColor : 'red',      //设置被选择节点的字体、图标颜色
			    showBorder:false,                //是否显示边框
			    showCheckbox:true,              //是否显示多选框
			    enableLinks:true,
			    //uncheckedIcon:'',             //设置未选择节点的图标
			    data:newdata,
			});
		}
	})
});

function add(){	
	var row =$('#menu').treeview('getChecked');
	//var row= $('#table').treegrid('getSelected');
	console.log(row);
	if(row.length==0)
	{
		Winedit('添加顶级菜单','','','','');
	}
	else
	{	
		Winedit(row[0].name+"添加子菜单",'',row[0].pid,row[0].parentPageId,row[0].id);
	}
}

function update(){
	var row =$('#menu').treeview('getChecked');
	if(row==null)
	{
		Ewin.confirm({ title: "温馨提示",
	   		 message: "请选择操作的记录!"
	   		 });
			 return false;
	}
	Winedit(row[0].name+"修改中",row[0].id,'','','');
	
}

//新增面板
function Winedit(name,id,apid,aparentPageId,aid){
	$('#id').val("");
	$("#aid").val(aid);
	$("#aparentPageId").val(aparentPageId);
    $("#apid").val(apid);
	 if(apid!=0&&aparentPageId!=0)//最下级菜单
	 {
		 Ewin.confirm({ title: "温馨提示",
	   		 message: "该菜单是最下级，不能添加子菜单!"
	   		 });
	       return false;
	 }	
	 $("#display").select2({
	     data:mapData(yesOrno,"value","text"),
		    language: "zh-CN",
		    allowClear: true
	 });
	
	if(id!="")
	{	
		 $.ajax({
   		  url:rootPath+'/sys/menu/Find.html',
   		  type:"post",
   		  data:{"id":id},
   		  dataType:"json",
   		  success: function(data){
          		     if(data.code==12)
       			    {
       				  $.messager.alert('fail', '无权限访问!  '+data.errorMessage);
       				  $('#EditPanel').dialog('close'); 
       				   return false;
       			    }	
          		     
          		      $('#name').val(data[0].name);
          		      $('#remark').val(data[0].remark);
          		      $('#display').val(data[0].display);
          		      $('#url').val(data[0].url);
          		      $('#orderNum').val(data[0].orderNum);
          		      $('#apid').val(data[0].pid);
          		      $('#aparentPageId').val(data[0].parentPageId);
          		      $('#id').val(data[0].id);
   		  }
   	 });
	}
//	$('#EditPanel').dialog({
//		modal:true,
//		title:name,
//		buttons: [{ 
//            text: '保 存', 
//            iconCls: 'icon-save', 
//            handler: function () {
//            	 var pid="";
//            	 var parentPageId=""; 
//            	 if(apid==0&&aparentPageId==0)//添加顶级菜单页面
//            	 {
//            		 pid=aid;
//                	 parentPageId=0;
//            	 }
//            	 if(apid!=0&&aparentPageId==0)//添加业务层方法
//            	 {
//            		 pid=apid;
//                	 parentPageId=aid;
//            	 }
//            	 if(pid==""&&parentPageId=="")
//            	 {
//            		 pid=0;
//                	 parentPageId=0;
//            	 }
//            	 var name=$('#name').textbox('getValue');
//            	 var remark=$('#remark').textbox('getValue');
//            	 var url=$('#url').textbox('getValue');
//            	 var orderNum=$('#orderNum').textbox('getValue');
//            	 var display=$('#display').combobox('getValue');
//            	 
//            	 $.ajax({
//            		  url:rootPath+'/sys/menu/Save.html',
//            		  type:"post",
//            		  data:{"id":id,"name":name,"remark":remark,"pid":pid,
//            			  "parentPageId":parentPageId,"url":url,"orderNum":orderNum,"display":display},
//            		  dataType:"json",
//            		  success: function(data){
//            				 $('#EditPanel').dialog('close'); 
//                   		     if(data.code==12)
//                			    {
//                				  $.messager.alert('fail', '无权限访问!  '+data.errorMessage);
//                				   return false;
//                			     }	
//       	        			 if(data.msg==null)
//       	        			 {
//       	        				 jQuery.messager.alert('提示:',' 保存成功!','info');  
//       	        			 }
//       	        			 else
//       	        			 {
//       	        				 jQuery.messager.alert('提示:',' 保存失败!'+data.msg,'info'); 
//       	        			 }	 
//       	        			 $('#table').treegrid('reload');
//            		  }
//            	 });
//            	
//            } 
//        }, { 
//            text: '取 消', 
//            iconCls: 'icon-cancel', 
//            handler: function () { 
//                $('#EditPanel').dialog('close'); 
//            } 
//        }] 
//
//	});
	$("#win1title").html(name);
	$('#win1').modal('show');
}

function save(){
	 var id=$('#id').val();	
	 var pid="";
	 var parentPageId="";
	 var apid=$('#apid').val();
	 var aid=$('#aid').val();
	 var aparentPageId=$('#aparentPageId').val();
	 var display=$('#display').val();
	 if(apid==0&&aparentPageId==0)//添加顶级菜单页面
	 {
		 pid=aid;
    	 parentPageId=0;
	 }
	 if(apid!=0&&aparentPageId==0)//添加业务层方法
	 {
		 pid=apid;
    	 parentPageId=aid;
	 }
	 if(apid==""&&aparentPageId=="")
	 {
		 pid=0;
    	 parentPageId=0;
	 }
	 var name=$('#name').val();
	 var remark=$('#remark').val();
	 var url=$('#url').val();
	 var orderNum=$('#orderNum').val();
	 //var display=$('#display').val();
	 $.ajax({
		  url:rootPath+'/sys/menu/Save.html',
		  type:"post",
		  data:{"id":id,"name":name,"remark":remark,"pid":pid,
			  "parentPageId":parentPageId,"url":url,"orderNum":orderNum,
			  "display":display},
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

function delet(){
	var row =$('#menu').treeview('getChecked');
	if(row.length==0)
	{
		Ewin.confirm({ title: "温馨提示",
	   		 message: "请选择操作的记录!"
	   		 });
			 return false;
	}
	alert(row[0].id);
	del(row[0].id);
    }

function del(id){
	$.ajax({
 		  url:rootPath+'/sys/menu/Delete.html',
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
 		  }
 	 });
}

