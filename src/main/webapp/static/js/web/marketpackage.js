$(function() { 
    $("#feetype").combobox({
        data:feetype,
        valueField:'value',
        textField:'text'
    });
	$('#table').datagrid({   
		url:rootPath+'/marketPackageConfig/List.html',
		loadFilter: function(data){
			if(data.code==12)
			{
				$.messager.alert('fail', '无权限访问!  '+data.errorMessage);
				return false;
			}	
			if (data.d){
				return data.d;
			} else {
				return data;
			}
		},
	    columns:[[    
	            {field:'ck',checkbox:true },          
	  	        {field:'id',title:'id',width:'5%',sortable:true,},  
	  	        {field:'marketpackagekey',title:'市场包key',width:' 5%',sortable:true},
	  	        {field:'name',title:'名称',width:'10%',sortable:true},
	  	        {field:'appname',title:'应用名称',width:'10%',sortable:true},
	  	        {field:'marketname',title:'市场名称',width:'10%',sortable:true},
	  	        {field:'marketsortname',title:'排序名称',width:'10%',sortable:true},
	  	        {field:'freetype',title:'合作模式',width:'5%',sortable:true,formatter: function(value,row,index){
                    if(value==1)
                    {
                        return "CPA";
                    }
                    if(value==2)
                    {
                        return "CPS";
                    }
                    if(value==3)
                    {
                        return "CPD";
                    }
                    if(value==4)
                    {
                        return "CPC";
                    }
                    if(value==5)
                    {
                        return "CPM";}
                    if(value==6)
                    {
                        return "CPT";}
                },
                },
                {field:'adstyle',title:'投放类型',width:'14%',sortable:true,formatter: function(value,row,index){
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
	  	        {field:'remark',title:'备注',width:'10%',sortable:true},
		        {field:'UserNameByCreate',title:'建立人',width:'5%',sortable:true},
		        {field:'UserNameByUpdate',title:'修改人',width:'5%',sortable:true},
	    ]],
	    remoteSort:false,//排序不用从服务器请求
	    striped:true,//出现斑马线
	    loading:true,
	    pageSize:20,
	    pagination:true,//使用分页
	    loadMsg:'数据加载中，请稍后.....',
	    singleSelect:true,
	});
	var p = $('#table').datagrid('getPager');  
	$(p).pagination({  
	    pageSize: 20,//每页显示的记录条数，默认为10  
	    pageList: [20,30,40],//可以设置每页记录条数的列表  
	    beforePageText: '第',//页数文本框前显示的汉字  
	    afterPageText: '页    共 {pages} 页',  
	    displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
	});
	$("#marketpackageid").combobox({
  		url:rootPath+"/marketPackage/Select.html",
  		loadFilter:function(data){
  			return data;
  		},
  	    valueField:'id',   
  	    textField:'name'
    });
	
	$("#qappid").combobox({
  		url:rootPath+"/app/Select.html",
  		loadFilter:function(data){
  			return data;
  		},
  	    valueField:'id',   
  	    textField:'name'
    });
	
	$("#qmarketid").combobox({
  		url:rootPath+"/market/Select.html",
  		loadFilter:function(data){
  			return data;
  		},
  	    valueField:'id',   
  	    textField:'name'
    });
	
});
function add(){
	Winedit("新增","");
}
function update(){
    var row= $('#table').datagrid('getSelected');
    if(row==null)
    {
        jQuery.messager.alert('温馨提示','请选择操作的记录!','error');
        return false;
    }
    Winedit(row.name+"--修改",row.id);
}
function config(){
    var row= $('#table').datagrid('getSelected');
    if(row==null)
    {
        jQuery.messager.alert('温馨提示','请选择操作的记录!','error');
        return false;
    }
    Win2edit(row.name+"--配置",row.id);
}
function delet(){
	var row= $('#table').datagrid('getSelected');	
	if(row==null)
	{
		 jQuery.messager.alert('温馨提示','请选择操作的记录!','error');  
		 return false;
	}
	del(row.id);
    }
//编辑面板
function Winedit(name,id){
	$('#win1').window({
		title:name,
		collapsible:true,
		minimizable:true,//定义是否显示最小化按钮。	true
		maximizable:true,//定义是否显示最大化按钮。	true
		closable:true,	//定义是否显示关闭按钮。	true
		closed:true,	//定义是否关闭窗口。	false
		draggable:true,	//定义窗口是否可拖拽。	true
		resizable:true,	//定义窗口是否可调整尺寸。	true
		shadow:true,  //如果设置为 true，当窗口能够显示阴影的时候将会显示阴影。	
	});
	
	$("#appid").combobox({
  		url:rootPath+"/app/Select.html",
  		loadFilter:function(data){
  			return data;
  		},
  	    valueField:'id',   
  	    textField:'name'
    });	
	$("#marketid").combobox({
  		url:rootPath+"/market/Select.html",
  		loadFilter:function(data){
  			return data;
  		},
  	    valueField:'id',   
  	    textField:'name'
    });	
	$("#marketsortid").combobox({
  		url:rootPath+"/marketsort/Select.html",
  		loadFilter:function(data){
  			return data;
  		},
  	    valueField:'id',   
  	    textField:'name'
    });	
	
    $("#freetype").combobox({
        data:feetype,
        valueField:'value',
        textField:'text'
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
       				  $.messager.alert('fail', '无权限访问!  '+data.errorMessage);
       			      $('#win1').window('close');
       				   return false;
       			  }	
          		  $('#id').val(data[0].id);
     		      $('#name').textbox('setValue',data[0].name);
     		      $('#remark').textbox('setValue',data[0].remark);
     		      $('#freetype').combobox('setValue',data[0].freetype);
     		      $('#appid').combobox('setValue',data[0].appid);
     		      $('#marketid').combobox('setValue',data[0].marketid);
     		      $('#marketsortid').combobox('setValue',data[0].marketsortid);
   		  }
   	 });
	}
	$('#win1').window('open');
}
//保存
function save(){
	 var id=$('#id').val();	
     var freetype=$('#freetype').combobox('getValue');  
 	 var name=$('#name').textbox('getValue');
 	 var remark=$('#remark').textbox('getValue');
	 var appid=$('#appid').combobox('getValue');
	 var marketid=$('#marketid').combobox('getValue');
	 var marketsortid=$('#marketsortid').combobox('getValue');
	 $.ajax({
		  url:rootPath+'/marketPackage/Save.html',
		  type:"post",
		  data:{"id":id,'freetype':freetype,'remark':remark,'name':name,'appid':appid,'marketid':marketid,'marketsortid':marketsortid},
		  dataType:"json",
		  success: function(data){
			     $('#win1').window('close');
      		      if(data.code==12)
   			     {
   				  $.messager.alert('fail', '无权限访问!  '+data.errorMessage);
   				   return false;
   			     }	
      			 if(data.msg==null)
      			 {
      				 jQuery.messager.alert('提示:',' 保存成功!','info');  
      			 }
      			 else
      			 {
      				 jQuery.messager.alert('提示:',' 保存失败!'+data.msg,'info'); 
      			 }	 
      			 $('#table').datagrid('reload');
		  }
	 });
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
     				  $.messager.alert('fail', '无权限访问!  '+data.errorMessage);
     				  $('#win1').window('close');
     				   return false;
     			     }	
        			 if(data.msg==null)
        			 {
        				 jQuery.messager.alert('提示:',' 删除成功!','info');  
        			 }
        			 else
        			 {
        				 jQuery.messager.alert('提示:',' 删除失败!'+data.msg,'info'); 
        			 }	 
        			 $('#table').datagrid('reload');
 		  }
 	 });
}
function query(){
//	var marketpackageid=$('#marketpackageid').combobox('getValue');
	var qappid=$('#qappid').combobox('getValue');
	var qmarketid=$('#qmarketid').combobox('getValue');
    $('#table').datagrid('load',{
//    	marketpackageid: marketpackageid,
    	qappid:qappid,
    	qmarketid:qmarketid
});
}
