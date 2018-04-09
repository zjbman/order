var id=0;
function formatdata(data){
	var newdata=[];
	for(var item in data){
		if(data[item].children){
			var nodes=data[item].children;
			for(var i in nodes){
				if(nodes[i].children){
					nodes[i].nodes=nodes[i].children;
				}
			};
			newdata.push({
				"id":data[item].id,
				"text":data[item].text,
				"nodes":nodes
			});
		}else{
			newdata.push({
				"id":data[item].id,
				"text":data[item].text
			});
		}
	}
	return newdata;
}

$(function() { 
	
	$.ajax({
		url:rootPath+"/sys/menu/Select.html",
		type:"post",
		success:function(data){
			//console.log(data)
			var newdata=formatdata(JSON.parse(data));		
			$('#menuid').treeview({
			    onhoverColor: "#f5f5f5",    //鼠标滑过的颜色
			    levels: 0 ,                 //设置初始化展开几级菜单 默认为2
			    showCheckbox:true,              //是否显示多选框
			    data:newdata,
			    showBorder:false
			});
		},
		error:function(er){
			console.log(er)
		}
	});

	$.ajax({
		url:rootPath+"/sys/group/Select.html",
		type:"post",
		success:function(data){
			//console.log(data)
			var newdata=formatdata(JSON.parse(data))
		
			$('#groupid').treeview({
			    onhoverColor: "#f5f5f5",    //鼠标滑过的颜色
			    levels: 0 ,                 //设置初始化展开几级菜单 默认为2
			    selectedIcon: 'glyphicon glyphicon-tint',
			    showBorder:false,                //是否显示边框
			    showCheckbox:true,              //是否显示多选框
			    data:newdata,
			    onNodeChecked:function(e,node){
					ClearTree();//默认树全不选中
					 $.ajax({
				   		  url:rootPath+"/sys/groupmenu/Find.html",
				   		  type:"post",
				   		  data:{'groupid':node.id},
				   		  dataType:"json",
				   		  success: function(data){
				   			  if(data.code==12){
				   				  Ewin.confirm({ 
				   					  title: "fail",
				   					  message:"无权限访问!"+data.errorMessage
				   				  });
				   				  return false;
				   			  }	
				   			  
				   			  var allnodes= $('#menuid').treeview('getEnabled');
				   		 	  var datalen=data.length;
				   		 	  
				   		 	  for(var i=0;i<datalen;i++){  
				   		 		  for(var k in allnodes){
				   		 			  if(allnodes[k].id==data[i].menuid){
				   		 				  $('#menuid').treeview('checkNode',allnodes[k].nodeId);
				   		 				  break;
					          		}
				   		 		  }
			
			  				}
				   		  }
				   	 });
					$('#menuid').treeview('expandAll',
							{ levels: 3, silent: true }
					);
			    	
		  		},
		  		onNodeUnchecked:function(e,node){
		  			ClearTree()
		  		}
			});
		},
		error:function(er){
			console.log(er)
		}
	});
	
	
	
	
	function ClearTree(){
		
		$('#menuid').treeview('uncheckAll', { silent: true });
		
			
	}
	
	
});
	


function save(){
	var menunodes = $('#menuid').treeview('getChecked', ['checked','indeterminate']);
	var groupnodes = $('#groupid').treeview('getChecked');
    var menuid="";
	if(groupnodes.length!=1)
	{
		Ewin.confirm({ title: "温馨提示",
	   		 message: "请选择一个用户组!"
	   		 });
			 return false;
	}
	if(menunodes.length<1)
	{
		Ewin.confirm({ title: "温馨提示",
	   		 message: "请至少选择一个菜单!"
	   		 });
			 return false;
	}
	for(var i=0;i<menunodes.length;i++)
	{
		menuid+=menunodes[i].id+",";
	}	
 	 $.ajax({
		  url:rootPath+'/sys/groupmenu/Save.html',
		  type:"post",
		  data:{'groupid':groupnodes[0].id,'menuid':menuid},
		  dataType:"json",
		  success: function(data){
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
		  }
	 });
}