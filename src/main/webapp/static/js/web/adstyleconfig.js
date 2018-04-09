$(function() { 
	$.ajax({
		url: rootPath+"/advert/Select.html",
          dataType: 'json',
          async:false,
          success : function(data){
        	  $("#advertid").jSelect({
        		  data:data,
        		  datakey:["id","name"],
        		  multiple:false
        	  });
          }
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
	
	$("#state").jSelect({
	  	data:adstate,
	  	datakey:["value","text"],
	  	multiple:false
  	});
	
	$("#adstyle").jSelect({
	  	data:adstyle,
	  	datakey:["value","text"],
	  	multiple:false
  	});	
	
	$('#advertid').selectVal(advertid1);

	$('#table').bootstrapTable({
        url: rootPath+'/adstyleconfig/List.html',  //请求后台的URL（*）
        method: 'post',   //请求方式（*）
        dataType: "json",
        contentType : "application/x-www-form-urlencoded",
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
			var advertiserid=$('#advertiserid').selectVal();
			var advertid=$('#advertid').selectVal();
			var isconfig=$('#state').selectVal();
			var adstyle=$('#adstyle').selectVal();
			return {  
			      page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			      rows: params.limit,//页面大小s
			      sortName:params.sort,
                  sortOrder:params.order,
			      advertiserid: advertiserid,
				  advertid:advertid,
				  isconfig:isconfig,
				  adstyle:adstyle
			      };  
		},
		onClickRow: function(rowIndex, rowData){
			id=rowData.id;
		},
		height:getTableHeight(),
		striped:true,//出现斑马线
	    checkboxHeader:false,
	    singleSelect:true,
	    sidePagination: "server",  //分页方式：client客户端分页，server服务端分页（*）
		pagination: true,   //是否显示分页（*）
		pageNumber:1,   //初始化加载第一页，默认第一页
		pageSize:20,   //每页的记录行数（*）
		pageList: [10, 20, 30, 50], //可供选择的每页的行数（*）   
        columns:[
          {field:'btSelectItem',checkbox:true},           
		  {field:'id',title:'id' ,sortable:true,visible:false}, 
		  {field:'advertisername',title:'广告主'},
		  {field:'advertName',title:'广告名称'},
		  {field:'isconfig',title:'广告状态',sortable:true,formatter:function(value,row,index){
		     if(value==false)
		     {
		      return  "<a style='color:blue;'>停止投放</a>";
		     }
		     if(value==true)
		     {
			   return "<a style='color:red;'>继续投放</a>";
		     }
		},
		  },
		  {field:'adstyle',title:'广告样式',sortable:true,formatter: function(value,row,index){
	          if(value==1)
			     {
				   return "插屏";
			     }
	          if(value==2)
			     {
				   return "banner";
			     }
	          if(value==3)
			     {
				   return "全屏";
			     }
	          if(value==4)
			     {
				   return "开屏";
			     }
	          if(value==5)
			     {
				   return "视频";
			     }
	          if(value==6)
			     {
				   return "开屏视频";
			     }
	          if(value==7)
			     {
				   return "动画中心视频";
			     }
	          if(value==8)
			     {
				   return "游戏墙";
			     }
	          if(value==9)
			     {
				   return "做梦视频";
			     }
	          if(value==11)
			     {
				   return "拉起广告";
			     }
	          if(value==12)
			     {
				   return "原生广告";
			     }
	          
			},
		  },
	    {field:'sendcount',title:'实时发送数',sortable:true},
		{field:'feetype',title:'结算方式',sortable:true,formatter: function(value,row,index){
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
		    return "CPM";
		}
		 if(value==6)
		{
		    return "CPT";}
		},
		},   
		{field:'substitution',title:'替补开关',sortable:true,formatter: function(value,row,index){
			 if(value==false)
				{
				 return  "<a style='color:blue;'>关</a>"; 
				}
			 if(value==true)
				{
				 return  "<a style='color:red;'>开</a>"; 
				} 

		 },},

		{field:'price',title:'单价(元)',sortable:true},
	    {field:'weight',title:'权重',sortable:true},
	    {field:'score',title:'分数',sortable:true},
		{field:'publishrestrict',title:'投放排期',formatter: function(value,row,index){
			var type="";
			if(value!=null&&value!="[]"){
				var publ=JSON.parse(value);
				  for(i in publ){
					 if(publ[i].startusetime)type+="开始："+publ[i].startusetime;
					 if(publ[i].stopusetime)type+= " 结束："+publ[i].stopusetime;
					 if(publ[i].usetime.length>0)type+= " 时段："+ publ[i].usetime;
					 if(publ[i].outnum.length>0)type+= " 整体限量："+publ[i].outnum;
					  type+= "<br>";
				  }
				  return type;
			}else{
				return "";
			};
			 
		 },cellStyle:function(value,row,index){
			 return  {
					css: {
						"white-space":"normal",
						 }
				 	};
			 }},

//		{field:'apprestrict',title:'应用限量',sortable:true},
        {field:'update_date',title:'配置更新',sortable:true},
        {field:'UserNameByUpdate',title:'修改人'}
       ]
  });
	
});
	
function config(){
	var row= $('#table').bootstrapTable('getSelections');
    if(row.length==0)
    {
    	Ewin.confirm({ title: "温馨提示",
   		 message: "请选择操作的记录!"
   		 });
        return false;
    }
    Win2edit(row[0].advertName,row[0].adstyle,row[0].id);
}

function query(){
	   $('#table').bootstrapTable('refresh');
}
