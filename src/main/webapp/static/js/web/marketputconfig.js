$("#provinceWin").on("hidden.bs.modal",function(){  
	  $(document.body).addClass("modal-open");  
}); 
$("#timeWin").on("hidden.bs.modal",function(){  
	  $(document.body).addClass("modal-open");  
}); 

$('#datetimepicker1').datetimepicker({  
    format: 'YYYY-MM-DD',  
    locale: moment.locale('zh-cn')//,  
}); 

$('#datetimepicker2').datetimepicker({  
    format: 'YYYY-MM-DD',  
    locale: moment.locale('zh-cn')//,  
});
	
$("#adstyle").jSelect({
	data:adstyle,
	datakey:["value","text"],
});

$("#area").setCity();


function Win2edit(marketname,appname,id){
	$('#id').val(id);
	doReset();
	if(id!=null&&id!="")
	{
	 $.ajax({
		  url:rootPath+'/marketconfig/Find.html', 
		  type:"post",
		  data:{"id":id},
		  dataType:"json",
	      async:false,
		  success: function(data){
				if(data.code==12)
				{
			        Ewin.alert({ title:'fail',
			    		 message: '无权限访问!  '+data.errorMessage
			    		 });
					return false;
				}
				console.log(data);
    		  if(data[0].adstyle){
    			  if(data[0].adstyle.indexOf(",")!=-1){
    				  var newkey=data[0].adstyle.split(",");
    				  $('#adstyle').selectVal(newkey);
    			  }else{
    				  $('#adstyle').selectVal([data[0].adstyle]);
    			  }
       		  }

 		      $('#area').val(data[0].area);
 			  $('#useTime').val(data[0].usetime);
 			  $('#proportion').val(data[0].proportion);
 			  $('#startusetime').val(data[0].startusetime);
 			  $('#stopusetime').val(data[0].stopusetime);
 			  $('#remark').val(data[0].remark);
		      if(data[0].isconfig)
			  {
		    	  document.getElementById("isconfig1").checked=true;
			  } 
			  else 
			  {
				  document.getElementById("isconfig").checked=true;
			  }
		  	}
	 });
}
	$("#configWintitle").html(marketname+"--"+appname+"配置中...");
//	$('#configWin').modal('show');
	$('#configWin').modal({backdrop: 'static', keyboard: false});
};



//时间选择面板
function timeSet(text){
$("#timepanel").html(""); 
$("#timeWintitle").html("时间选择面板" );

if(text.value!="")//如果text有值，则赋值给Win
{
	var time=text.value.split(',');
	obj = document.getElementsByName("ct1");
	check_val = [];
	for(var i=0;i<time.length;i++)
	{
	 for(k in obj){
		 if (obj[k].value== time[i])
			 obj[k].checked = true;
	}
	}
}
if(text.value=="")
{
	obj = document.getElementsByName("ct1");
		
	 for(k in obj){
			obj[k].checked = false;
	}
}

$('#timepanel').append("<a class='btn btn-info btn-xs' href='javascript:void(0)' onclick='timeAllCheck()'>全 选</a>" +
		"<a class='btn btn-warning btn-xs' href='javascript:void(0)' onclick='timeNoCheck()'>全不选</a>" +
		"<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick='timeClose()'>取 消</a>" +
		"<a class='btn btn-success btn-xs' href='javascript:void(0)' onclick='timeSure("+text.id+")'>确 定</a>");

$('#timeWin').modal('show');
}

function timeAllCheck(){
	obj = document.getElementsByName("ct1");
	 for(k in obj){
			obj[k].checked = true;
	}
}
function timeNoCheck(){
obj = document.getElementsByName("ct1");
 	 for(k in obj){
 			obj[k].checked = false;
}
}
function timeClose(){
$('#timeWin').modal("hide"); 
}
function timeSure(text){
var time="";
obj = document.getElementsByName("ct1");
check_val = [];
for(k in obj){
	if(obj[k].checked&&obj[k].value!=undefined)
		time+=obj[k].value+",";
}
document.getElementById(text.id).value=","+time;
if(time=="")
{
	document.getElementById(text.id).value="";	
}	
//alert(time);
$('#timeWin').modal("hide");
}

//省份选择面板
function provinceSet(text){

$("#provincepanel").html(""); 
$("#proWintitle").html("省份选择面板"); 
/*$('#provinceWin').window({
	modal:true,
	title:"省份选择面板",
});*/
if(text.value!="")//如果text有值，则赋值给Win
{
	var province=text.value.split(',');
	obj = document.getElementsByName("cp1");
	 for(k in obj){
 			obj[k].checked = false;
 	}
	check_val = [];
	for(var i=0;i<province.length;i++)
	{
		
	 for(k in obj){
		 if (obj[k].value== province[i])
			 obj[k].checked = true;
	}
	}
}
if(text.value=="")//如果text有值，则赋值给Win
{
	obj = document.getElementsByName("cp1");
	 for(k in obj){
			obj[k].checked = false;
	}
}
$('#provincepanel').append("<a class='btn btn-info btn-xs' href='javascript:void(0)' onclick='provinceAllCheck()'>全 选</a>" +
		"<a class='btn btn-warning btn-xs' href='javascript:void(0)' onclick='provinceNoCheck()'>全不选</a>" +
		"<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick='provinceClose()'>取 消</a>" +
		"<a class='btn btn-success btn-xs' href='javascript:void(0)' onclick='provinceSure("+text.id+")'>确 定</a>");
$('#provinceWin').modal("show");
}
function provinceAllCheck(){
obj = document.getElementsByName("cp1");
	 for(k in obj){
			obj[k].checked = true;
	}
}
function provinceNoCheck(){
 obj = document.getElementsByName("cp1");
	 for(k in obj){
			obj[k].checked = false;
	}
}
function provinceClose(){
$('#provinceWin').modal("hide"); 
}
function provinceSure(text){
var province="";
obj = document.getElementsByName("cp1");
check_val = [];
for(k in obj){
	if(obj[k].checked&&obj[k].value!=undefined)
		province+=obj[k].value+",";
}
document.getElementById(text.id).value=province;
if(province=="")
{
	document.getElementById(text.id).value="";	
}	
 $('#provinceWin').modal("hide"); 
}

function saveConfig(){
	var id = $('#id').val();
	var adstyle=$('#adstyle').selectVal();
	var isconfig = "";
	var area=$('#area').val();
	var usetime = $('#useTime').val();	
	var startusetime = $('#startusetime').val(); 
	var stopusetime = $('#stopusetime').val();
	var remark = $('#remark').val();
	var proportion = $('#proportion').val();
	var pusetime = $('#pusetime').val();
      
	 if(document.getElementById("isconfig").checked==true)
	  {
	      isconfig=false;
	  }
	  if(document.getElementById("isconfig1").checked==true)
	  {
		  isconfig=true;
	  }
	
    $.ajax({
        url:rootPath+'/marketconfig/Save2.html',
        type:"post",
        data:{"id":id,'startusetime':startusetime,'stopusetime':stopusetime,'area':area,
        	'remark':remark,'usetime':usetime,'isconfig':isconfig,'proportion':proportion,'adstyle':adstyle,'pusetime':pusetime},
        dataType:"json",
        success: function(data){
            $('#configWin').modal("hide");
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
      	    		 message: '保存成功!',
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
            $('#table').bootstrapTable("refresh");
        }
    });
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
