   $.ajax({
		url: rootPath+"/market/Select.html",
        dataType: 'json',
        async:false,
        success : function(data){
        	$("#ditch").jSelect({
        	  	data:data,
        	  	datakey:["id","name"],
        	  	multiple:true
        	});	
          }
	});
    
	$("#feetype").jSelect({
		data:feetype,
	  	datakey:["value","text"],
	  	multiple:false
    });
	$('#datetimepicker1').datetimepicker({  
	    format: 'YYYY-MM-DD',  
	    locale: moment.locale('zh-cn')//,  
	}); 
	
	$('#datetimepicker2').datetimepicker({  
	    format: 'YYYY-MM-DD',  
	    locale: moment.locale('zh-cn')//,  
	});

	$.ajax({
		url: rootPath+"/app/Select.html",
        dataType: 'json',
        async:false,
        success : function(data){
        	$("#app").jSelect({
        		data:data,
        	  	datakey:["appkey","name"],
        	  	multiple:true
        	});
        	 
          }
	});
	
$("#provinceWin").on("hidden.bs.modal",function(){  
	  $(document.body).addClass("modal-open");  
}); 
$("#timeWin").on("hidden.bs.modal",function(){  
	  $(document.body).addClass("modal-open");  
}); 
	
function Win2edit(name,id){
	$('#id').val(id);
	$("#configWintitle").html(name+"配置中...");
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

$("#confirmsave").click(function(){
	$("#confirmwin").modal("hide"); 
	var id = $('#id').val();
	var isconfig = "";
	var enableimsi = "";
	var outnum = $('#outnum').val();
	var feetype=$('#feetype').val();
	var price=$('#price').val();
	var yarea=$('#yarea').val();
	var twoconfirm=$('#twoconfirm').val();
	var larea=$('#larea').val();
	var darea=$('#darea').val();
	var weight = $('#weight').val();
	var wclick = $('#wclick').val();
	var publishcity = $('#publishcity').val();
	var usetime = $('#useTime').val();	
	var startusetime = $('#startusetime').val(); 
	var stopusetime = $('#stopusetime').val();
	var remark = $('#remark').val();
	var ditch = $('#ditch').val();
	var app = $('#app').val();
      
	 if(document.getElementById("isconfig").checked==true)
	  {
	      isconfig=false;
	  }
	  if(document.getElementById("isconfig1").checked==true)
	  {
		  isconfig=true;
	  }
	  if(document.getElementById("enableimsi").checked==true)
	  {
		  enableimsi=true;
	  }
	  if(document.getElementById("enableimsi1").checked==true)
	  {
		  enableimsi=false;
	  }
	if(outnum==null||outnum==""){
		outnum=0;
	}     
	if(twoconfirm==null||twoconfirm==""){
		twoconfirm=0;
	} 
	if(weight==null||weight==""){
		weight=0;
	} 
	if(wclick==null||wclick==""){
		wclick=0;
	} 
	if(price==null||price==""){
		price=0;
	} 
	if(feetype==null||feetype==""){
		feetype=1;
	} 
	
    $.ajax({
        url:rootPath+'/adstyleconfig/Save.html',
        type:"post",
        data:{"id":id,'weight':weight,'wclick':wclick,'usetime':usetime,'price':price,'feetype':feetype
    		,'outnum':outnum,'publishcity':publishcity,'startusetime':startusetime,'stopusetime':stopusetime,'twoconfirm':twoconfirm,
    		'app':app,'yarea':yarea,'larea':larea,'darea':darea,'remark':remark,'ditch':ditch,'isconfig':isconfig,'enableimsi':enableimsi},
        dataType:"json",
        success: function(data){
            $('#configWin').modal("hide");
            if(data.code==12)
            {
            	Ewin.confirm({ title: "fail",
   	    		 message: '无权限访问!  '+data.errorMessage
            	});
                return false;
            }
            if(data.msg==null)
            {
            	Ewin.confirm({ title: "提示:",
      	    		 message: '保存成功!',
      	    		 icon:"glyphicon-ok"
               	});
            }
            else
            {
            	Ewin.confirm({ title: "提示:",
     	    		 message: ' 保存失败!',
     	    		 icon:"glyphicon-remove"
              	});
            }
            $('#table').bootstrapTable("refresh");
        }
    });
})


function saveConfig(){
	$("#confirmwin").modal("show");
	
}
