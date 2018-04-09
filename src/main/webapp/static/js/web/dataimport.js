var editRow = undefined;
$("#pick").daterangepicker({
	locale:{
  format:"YYYY/MM/DD"

},
startDate:moment().subtract(1, 'days'),
endDate:moment().subtract(1, 'days'),
showCustomRangeLabel:true,
timePicker:false, //显示小时分钟
timePicker24Hour:true, //24小时制
isShowing:true,
ranges: {
   '今天': [moment(), moment()],
   '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
   '最近七天': [moment().subtract(6, 'days'), moment()],
   '最近30天': [moment().subtract(29, 'days'), moment()],
   '本月': [moment().startOf('month'), moment().endOf('month')],
   '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
}
});

$("#file").fileinput({
    language: 'zh',
    uploadUrl: rootPath+"/excel/dataimport/upload.html", //上传的地址
    overwriteInitial: false, //不覆盖已存在的图片  
    allowedFileExtensions: ['xlsx'], //限定上传文件类型
    elErrorContainer: '#errorBlock',
    //下面几个就是初始化预览图片的配置    
    showUpload:true, //是否显示上传按钮
    //showRemove :true, //显示移除按钮
    
    showPreview : true, //是否显示预览
   // showCaption: true,//是否显示标题
    browseClass: "btn btn-primary", //按钮样式  

    overwriteInitial: false, //不覆盖已存在的图片
    slugCallback: function (filename) {
        return filename.replace('(', '_').replace(']', '_');
    },
    dropZoneEnabled: false,//是否显示拖拽区域
    enctype: 'multipart/form-data',
}).on("fileuploaded", function(event, data) {
	console.log(data.response);
	if(data.response=="上传成功") {
		 $("#errorBlock").html("").hide();
	};
    if(data.response)
    {
       $("#errorBlock").html(data.response).show();
    }
});




$(function() {
	$('#startdate').datetimepicker({  
	    format: 'YYYY-MM-DD',  
	    locale: moment.locale('zh-cn')
	}); 
	
	$('#enddate').datetimepicker({  
	    format: 'YYYY-MM-DD',  
	    locale: moment.locale('zh-cn')
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
		url: rootPath+"/app/Select.html",
          dataType: 'json',
          async:false,
          success : function(data){
        	 $("#appid").jSelect({
        		 data:data,
     			 datakey:["id","name"],
     			 multiple:false,
     			  right:0
        	 });
        	 
          }
	});
	
	  
	 $("#adstyle").jSelect({
		 data:adstyle,
		 datakey:["value","text"],
		 multiple:false
	 });
	 $("#adtype").jSelect({
		 data:advertisertype,
		 datakey:["value","text"],
		 multiple:false
	 });
	 
	 var rown=0;
	$('#table').bootstrapTable({   
		url:rootPath+'/excel/dataimport/List.html',
		method: 'post',   //请求方式（*）
	    dataType: "json",
	    contentType : "application/x-www-form-urlencoded",
	    height:getTableHeight(),
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
				return data.rows ;
			}
		},
		onClickRow: function(rowIndex, rowData){
			id=rowData.id;
		},
		
		queryParams:function(params) {
			var date=$('#pick').val().split("-");
			var startdate=date[0].replace(" ","").split("/").join("-");
		    var enddate=date[1].replace(" ","").split("/").join("-");
			var advertid=$('#advertid').selectVal();
		    var adstyle=$('#adstyle').selectVal();
		    var advertiserid=$('#advertiserid').selectVal();
		    var appid=$('#appid').selectVal();
		    var adtype=$('#adtype').selectVal();
			return {  
			      page: params.offset/params.limit+1, //当前页码,默认是上面设置的1(pageNumber)
			      rows: params.limit,//页面大小
			      startdate:startdate,
			      enddate:enddate,
			      advertid: advertid,
			      adstyle: adstyle,
			      advertiserid: advertiserid,
			      appid:appid,
			      adtype:adtype
			      };  
		},
		striped:true,//出现斑马线
	    checkboxHeader:false,
	    singleSelect:true,
	       
        columns:[
              [ 
                {field:'btSelectItem',checkbox:true,rowspan:2,colspan:1 },
                {field:'id',title:'id',visible:false,sortable:true,rowspan:2,colspan:1},
	  	        {field:'datetime',title:'时间',sortable:true,rowspan:2,colspan:1},
		  	    {field:'adtype',title:'广告源',sortable:true,rowspan:2,colspan:1,formatter: function(value,row,index){
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
	  	        {field:'advertname',title:'广告名称',sortable:true,rowspan:2,colspan:1},
	  	        {field:'advertisername',title:'广告主名称',sortable:true,rowspan:2,colspan:1},
	  	        {field:'appname',title:'应用名称',sortable:true,rowspan:2,colspan:1},
                {field:'adstyle',title:'广告样式',rowspan:2,colspan:1,sortable:true,formatter: function(value,row,index){
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
                },
                }, 
                {title:'第三方数据',colspan:9,rowspan:1},
                {title:'后台数据',colspan:7,rowspan:1},
                
                ],
                
                [
			    {field:'stotalincome',title:'收入',sortable:true,editable: { type: 'number',step:"0.01",required: "required"},
	                formatter: function(value,row,index){
	                    return (value*1).toFixed(2);
                }},
                
                {field:'revenue',title:'收益（$）',sortable:true,editable: { type: 'number',step:"0.01",required: "required"},
                formatter: function(value,row,index){
                    return (value*1).toFixed(2);
                }},
                
                {field:'sshowcount',title:'展示',width:'4%',sortable:true,editable: { type: 'number',required: "required",
                }},
                {field:'sclickcount',title:'点击',width:'4%',sortable:true,editable: { type: 'number',required: "required",
                }},
                {field:'stoplaycount',title:'开始播放',width:'4%',sortable:true,editable: { type: 'number',required: "required",
                }},
                {field:'stoendplaycount',title:'结束播放',width:'4%',sortable:true,editable: { type: 'number',required: "required",
                }},
                {field:'sloadpageclick',title:'落地页点击',width:'4%',sortable:true,editable: { type: 'number',required: "required",
                }},
                {field:'sinstallcount',title:'安装',width:'4%',sortable:true,editable: { type: 'number',required: "required",
                }},
                {field:'sactivecount',title:'激活',width:'4%',sortable:true,editable: { type: 'number',required: "required",
                }},
                
                
                
                {field:'ytotalincome',title:'收入',width:'4%',sortable:true,formatter: function(value,row,index){
                    return (value*1).toFixed(2);
                },},
                {field:'yshowcount',title:'展示',width:'4%',sortable:true},
                {field:'yclickcount',title:'点击',width:'4%',sortable:true},
                {field:'ytoplaycount',title:'开始播放',width:'4%',sortable:true},
                {field:'ytoendplaycount',title:'结束播放',width:'4%',sortable:true},
                {field:'yloadpageclick',title:'落地页点击',width:'4%',sortable:true},
                {field:'yinstallcount',title:'安装',width:'4%',sortable:true},
                
                
                          
	    ]],
	    
	    rowStyle: function (row, index) {
            //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];
            var strclass = "";
            if (row.sshowcount >0 && row.yshowcount >0) {
            	if((1-(row.sshowcount/row.yshowcount))>=0.1||(1-(row.sshowcount/row.yshowcount))<0){
            		  strclass = 'danger';
            		  return {classes: strclass};
            	}
            	else{
            		var strclass = "";
            	}
            	 
            }
            if (row.sclickcount >0 && row.yclickcount >0) {
            	if((1-(row.sclickcount/row.yclickcount))>=0.1||(1-(row.sclickcount/row.yclickcount))<0){
            		  strclass = 'danger';
            		  return {classes: strclass}; 
            	}else{
            		var strclass = "";
            	}
            	
            }
            if (row.stoplaycount >0 && row.ytoplaycount >0) {
            	if((1-(row.stoplaycount/row.ytoplaycount))>=0.1||(1-(row.stoplaycount/row.ytoplaycount))<0){
            		  strclass = 'danger';
            		  return {classes: strclass}; 
            	}else{
            		 var strclass = "";
            	}
            	
            }
            if (row.stoendplaycount >0 && row.ytoendplaycount >0) {
            	if((1-(row.stoendplaycount/row.ytoendplaycount))>=0.1||(1-(row.stoendplaycount/row.ytoendplaycount))<0){
            		  strclass = 'danger';
            		  return {classes: strclass}; 
            	}else{
            		var strclass = "";
            	}
            	 
            }
            
            if (row.sloadpageclick >0 && row.yloadpageclick >0) {
            	if((1-(row.sloadpageclick/row.yloadpageclick))>=0.1||(1-(row.sloadpageclick/row.yloadpageclick))<0){
            		  strclass = 'danger';
            		  return {classes: strclass}; 
            	}else{
            		var strclass = "";
            	}
            	 
            }
            return {classes: strclass};
        },

	    onEditableSave:function(field,row,oldVal,$el){
	    	if(row[field]==oldVal) return;
	    	rown=row;
	       	$("#confirmwin").modal("show");
        }
//		function(row,index) {
//			return class;
//			}
		
		
	});
	    
	$("#confirmsave").click( function () {
  	  $.ajax({
              url: rootPath + '/excel/dataimport/Save.html',
              type: "post",
              data: {'rowstr': JSON.stringify(rown)},
              dataType: "json",
              success: function (data) {
                  if (data.code == 12) {
                  	Ewin.confirm({ 
                  		title: "fail",
                  		 message:"无权限访问!",
                  		 icon: "glyphicon-remove" 
                  	});
       				   return false;
                  }
                  if (data.msg == null) {
                  	$("#confirmwin").modal("hide");
                  	Ewin.confirm({ 
                  		title: "提示:",
                  		 message:" 保存成功!",
                  		 icon: "glyphicon-ok" 
                  	});
                  	 
                  }
                  else {
                  	Ewin.confirm({ 
                  		title: "提示:",
                  		 message:"保存失败!",
                  	});
                  }
              }
          });
  	})
	
	
});

function formatDate(date){
	var newDate=date.split("-").join("/");
	var num=(new Date(newDate)).getTime();
	return num;
}
function query(){
		var date=$('#pick').val().split("-");
		var startdate=date[0].replace(" ","").split("/").join("-");
	    var enddate=date[1].replace(" ","").split("/").join("-");
		 if(formatDate(startdate)>formatDate(enddate)){
		        Ewin.alert({ title: "温馨提示",
		      		 message: "结束日期不得小于起始日期!"
		    	});
		    	return false;
		 }
	    $('#table').bootstrapTable('refresh');

}

function subfile(){
	$("#uploadform").ajaxSubmit(function(message) { 
		var tip=message.replace(/\'/g,"").replace(/\"/g,"");
		$("#subtips").css("display","block").html(tip);
		if(tip=="上传成功"){
			$("#subtips").css("color","green");
		}else{
			$("#subtips").css("color","red");
		}
		
	}); 

	return false; 
	
}

function excel(){
	 
    document.getElementById("formMain").action=rootPath+"/excel/exception/Excel.html";
    document.getElementById("formMain").submit();

}
