$(function() { 
	$.ajax({
		url: rootPath+"/app/Select.html",
          dataType: 'json',
          async:false,
          success : function(data){
        	 // console.log(data)
        	  $("#appid").jSelect({
        		  data:data,
      			 datakey:["id","name"],
      			 multiple:false
         	 });
         	 
           }
 	});
	
	$.ajax({
		url: rootPath+"/market/Select.html",
          dataType: 'json',
          async:false,
          success : function(data){
        	 // console.log(data)
        	  $("#marketid").jSelect({
        		  data:data,
       			 datakey:["id","name"],
       			 multiple:false
          	 });
          	 
            }
  	});
		
	$("#state").jSelect({
		data:adswitch,
		datakey:["value","text"],
		multiple:false
	});
	
	$('#marketid').selectVal(marketid1);
	$('#table').bootstrapTable({
        url: rootPath+'/marketconfig/List.html',  //请求后台的URL（*）
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
			var appid=$('#appid').selectVal();
			var marketid=$('#marketid').selectVal();
			var isconfig=$('#state').selectVal();
			return {  
			      page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			      rows: params.limit,//页面大小
			      sortName:params.sort,
                  sortOrder:params.order,
                  appid: appid,
                  marketid:marketid,
                  isconfig:isconfig,
			      };  
		},
		onClickRow: function(rowIndex, rowData){
			id=rowData.id;
		},
		
        columns:[
          {field:'btSelectItem',checkbox:true},           
		  {field:'id',title:'id' ,sortable:true,visible:false}, 
		  {field:'marketid',title:'marketid' ,sortable:true,visible:false}, 
		  {field:'marketname',title:'市场'},
		  {field:'marketkey',title:'市场key'},
		  {field:'appname',title:'应用'},
		  {field:'isconfig',title:'广告开关',sortable:true,formatter:function(value,row,index){
		     if(value==false)
		     {
		      return  "<a style='color:blue;'>关</a>";
		     }
		     if(value==true)
		     {
			   return "<a style='color:red;'>开</a>";
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
		{field:'proportion',title:'配量比例',sortable:true},  
		{field:'remark',title:'备注',sortable:true},
        {field:'update_date',title:'配置更新',sortable:true},
        {field:'UserNameByUpdate',title:'修改人'}
       ],
		height:getTableHeight(),
	    striped:true,//出现斑马线
	    checkboxHeader:false,
	    singleSelect:true,
	    sidePagination: "server",  //分页方式：client客户端分页，server服务端分页（*）
		pagination: true,   //是否显示分页（*）
		pageNumber:1,   //初始化加载第一页，默认第一页
		pageSize:20,   //每页的记录行数（*）
		pageList: [10, 20, 30, 50], //可供选择的每页的行数（*）   
  });
});
	
function config(){
	var row= $('#table').bootstrapTable('getSelections');
    if(row.length==0)
    {
        Ewin.alert({ title:'温馨提示',
   		 message: "请选择操作的记录!"
   		 });
        return false;
    }
    Win2edit(row[0].marketname,row[0].appname,row[0].id);
}

function query(){
	   $('#table').bootstrapTable('refresh');
}
