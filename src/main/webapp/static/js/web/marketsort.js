$(function() { 
	$("#type").combobox({
        data:advertisertype,
        valueField:'value',
        textField:'text'
    });
    $("#feetype").combobox({
        data:feetype,
        valueField:'value',
        textField:'text'
    });
    $("#balancedate").combobox({
        data:balancedate,
        valueField:'value',
        textField:'text'
    });
	$('#table').datagrid({   
		url:rootPath+'/marketsort/List.html',
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
		onClickRow: function(rowIndex, rowData){
			id=rowData.id;
		},
	    columns:[[    
	            {field:'ck',checkbox:true },          
	  	        {field:'id',title:'id',width:'5%',sortable:true,},  
	  	        {field:'name',title:'名称',width:'10%',sortable:true},
	  	        {field:'state',title:'类型',width:'10%',sortable:true,formatter: function(value,row,index){
  		        	if(value==1)
  		        	{
  		        		return "开启";
  		        	}
  		        	if(value==0)
  		        	{
  		        		return "关闭";
  		        	}

  		        },
  		        },
	  	        {field:'remark',title:'备注',width:'50%',sortable:true},
		        {field:'UserNameByCreate',title:'建立人',width:'10%',sortable:true},
		        {field:'UserNameByUpdate',title:'修改人',width:'10%',sortable:true},
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
	if(id!="")
	{	
		 $.ajax({
   		  url:rootPath+'/marketsort/Find.html',
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
                  $('#sort').val(data[0].sort);
                  if(data[0].state==1)
                  {
                  document.getElementById("state").checked=true;
                  }
                  if(data[0].state==0)
                  {
                  document.getElementById("state1").checked=true;
                  }
          }
   	 });
	}
	$('#win1').window('open');
}
//保存
function save(){
     var state=null;
	 var id=$('#id').val();	
 	 var name=$('#name').textbox('getValue');
     var remark=$('#remark').textbox('getValue');
     var sort=$('#sort').val();
     if(document.getElementById("state").checked==true)
     {
         state=1;
     }
     if(document.getElementById("state1").checked==true)
     {
         state=0;
     }
	 $.ajax({
		  url:rootPath+'/marketsort/Save.html',
		  type:"post",
		  data:{"id":id,'name':name,'remark':remark,'state':state,'sort':sort},
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
		  url:rootPath+'/marketsort/Delete.html',
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
	var marketid=$('#marketid').combobox('getValue');
    $('#table').datagrid('load',{
    	marketid: marketid
    });
}

//排序选择面板
var data=[]; //所有选项数据
var nums=[]; //排序选项数据

//显示所有选项
function showData(json){
	$("#sortdata").html('');
	var len=json.length;
	for(var i=0;i<len;i++){
		var data="<span class='checkwrap'><input type='number' id='ct"+i+"' name='"+json[i].marketkey+"' class='num' onblur='nowSort(this)'><font size='3px'>"+json[i].name+"</font></span>";
		$("#sortdata").append(data);   		 
	}
}


function sortSet(text){
	//排序选择面板数据
	$.getJSON(rootPath+'/market/Select.html', function(json) {
		showData(json);
		data=json;

		if(text.value!=""){ //如果text有值，则按序号赋值给Win
			var time=text.value.split(',');
			var tl=time.length;
	    	var n=1;
	    	
	    	//初始化nums
	    	if(nums.length==0){ 	
	    		for(var t=0;t<tl;t++){
	    			if(time[t]!=""){
	    				for(var i=0;i<data.length;i++){
	    					if(time[t]==data[i].marketkey){
	    						nums.push({
	    	    					"snum":n, //排序数字
	    	    					"key":data[i].marketkey, //marketkey值
	    	    					"name":data[i].name
	    	    				});
	    						n++;
	    						break;
	    					}				
		    			}
	    			}
    				
    			
	    		}
	    	}else{ //如果nums已经有值
	    		var nl=nums.length;
	    		for(var t=0;t<tl;t++){
	    			for(var i=0;i<nl;i++){
	    				//修改nums中排序序号从1开始
	    				if(time[t]==nums[i].key){ 
	    					nums[i].snum=n;
	    					n++;
	    					break;
	    				}
	    			}
	    		}
	    	}
	    	shownum(nums);
	    }else{
	    	nums=[];
	    }
	
	});
	 
	$('#sortWin').window({
	    modal:true,
	    title:"排序选择面板" 
	});
	$('#sortWin').window('open');
}

function timeClose(){
	$('#sortWin').window('close'); 
}
function timeSure(){
	
	//将key值按顺序显示
	var text=document.getElementById("sort");
	var sortval=',';
    var len=nums.length;
    for(var i=0;i<len;i++){
    	sortval+=nums[i].key+",";
    }
    text.value=sortval;

	$('#sortWin').window('close'); 
}

//搜索
function toSearch(){
	var text = $("#search").val();
	if(text==""){
		return;
	}else{
		var obj=document.getElementsByClassName("num");
		var le=obj.length;
		
		for(var i=0;i<le;i++){
			$(".checkwrap").eq(i).css("background","none");
			
			//搜索结果变红色
			var name=obj[i].nextSibling.innerHTML;
			if(name.match(text)){
				obj[i].parentNode.style.background="red";
			}
			
			//查找已经选中的变黄色
			 for(var s=0;s<nums.length;s++){ 
				  if(nums[s].key==obj[i].name){
					  obj[i].parentNode.style.background="yellow";
				  }
			  }
			
		}
	
	}
 
}
function nowSort(ts){
	var mark=true;
	for(var i=0;i<nums.length;i++){ 
		if(nums[i].key==ts.name){ //若数据已经存在
			if(ts.value!=""){ 
				nums[i].snum=ts.value; 
			}else{  
				ts.parentNode.style.background="";
				nums.splice(i,1);
			}
			mark=false;
			break;
		}
	}
	if(ts.value!=""){
		if(mark){
			nums.push({
				"snum":ts.value, //排序数字
				"key":ts.name, //marketkey值
				"name":ts.nextSibling.innerHTML
			});
		}
		//对num进行排序
		var ln=nums.length-1;
	    for(var unfix=ln; unfix>0; unfix--){
	      for(var ii=0;ii<unfix;ii++){
	        if(nums[ii].snum*1>nums[ii+1].snum*1){
	            var temp = nums[ii];
	            nums.splice(ii,1,nums[ii+1]);
	            nums.splice(ii+1,1,temp);
	        }
	      }
	    }
	}
	shownum(nums);
}
//右侧排序部分显示排序结果
function shownum(nums){
	var nl=nums.length;
	
	//右侧排序区
	$("#sortdetail").html("");
	for(var d=0;d<nl;d++){
		var item="<li><span>"+nums[d].snum+"</span>&nbsp;"+nums[d].name+"</li>";
		$("#sortdetail").append(item);
	}
	
	//左侧标黄
	var obj = document.getElementsByClassName("num");
	var l=obj.length;

	for(var i=0;i<l;i++){
		for(var k=0;k<nl;k++){ 	
			if (obj[i].name == nums[k].key){
				obj[i].value = nums[k].snum;			
				obj[i].parentNode.style.background="yellow";
				break;
			}
		
		}
	
	}
	
}
