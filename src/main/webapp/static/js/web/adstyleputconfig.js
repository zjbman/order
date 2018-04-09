$("#provinceWin").on("hidden.bs.modal",function(){  
	  $(document.body).addClass("modal-open");  
}); 
$("#timeWin").on("hidden.bs.modal",function(){  
	  $(document.body).addClass("modal-open");  
}); 

$("#feetype").jSelect({
  	data:feetype,
  	datakey:["value","text"],
  	multiple:false
});	 

$('.date').datetimepicker({  
    format: 'YYYY-MM-DD',  
    locale: moment.locale('zh-cn')//,  
}); 

var appSelData=[];
$.ajax({
	url: rootPath+"/app/Select.html",
    dataType: 'json',
    async:false,
    success : function(data){
    	appSelData=data;	    	 
      }
});
	
$("#app").jSelect({
  	data:appSelData,
  	datakey:["appkey","name"],
  	multiple:true
});	    	 
$(".app").jSelect({
  	data:appSelData,
  	datakey:["appkey","name"],
  	multiple:false
});

$(".usetime").jSelect({
  	data:timeselect,
  	datakey:["value","text"],
  	multiple:true
});

$tbodyApp=$("#addAppTbody");
$("#addAppBtn").click(function(){
	var newEle=$('<tr><td><input required="required"  name="app" type="text" class="app j-input"></td>'+
			'<td><input required="required"  name="outnum" type="number" class="outnum j-input"></td>'+
		'<td><button type="button" class="btn btn-danger btn-sm delAppBtn">删除</button></td></tr>');
	$tbodyApp.append(newEle);
	$(".app").jSelect({
	  	data:appSelData,
	  	datakey:["appkey","name"],
	  	multiple:false
	});
});
$tbodyApp.on("click",".delAppBtn",function(){
	$(this).parent().parent().remove();
});

$tbody2=$("#addAppTbody2");
$("#addAppBtn2").click(function(){
	$('.date').datetimepicker({  
	    format: 'YYYY-MM-DD',  
	    locale: moment.locale('zh-cn')//,  
	}); 
	$(".usetime").jSelect({
	  	data:timeselect,
	  	datakey:["value","text"],
	  	multiple:true
	});
	var newEle=$('<tr><td><input type="text"  name ="startusetime"  class="date starttime j-input"/>  </td>'+
			'<td><input type="text"  name ="stopusetime"  class="date endtime j-input"/>  </td>'+
			'<td><input required="required"  name="usetime" class="usetime j-input"></td>'+ 
			'<td><input required="required"  name="outnum2" type="text" class="outnum2 j-input"></td>'+
			'<td><button type="button" class="btn btn-danger btn-sm delAppBtn2">删除</button></td></tr>');
	$tbody2.append(newEle);
	
	$('.date').datetimepicker({  
	    format: 'YYYY-MM-DD',  
	    locale: moment.locale('zh-cn')//,  
	}); 
	$(".usetime").jSelect({
	  	data:timeselect,
	  	datakey:["value","text"],
	  	multiple:true
	});
});
$tbody2.on("click",".delAppBtn2",function(){
	$(this).parent().parent().remove();
});

function Win2edit(name,adstyle,id){
	$('#id').val(id);
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
  
	if(id!=null&&id!="")
	{
		doReset();
		
	 $.ajax({
		  url:rootPath+'/adstyleconfig/Find.html', 
		  type:"post",
		  data:{"id":id},
		  dataType:"json",
		  success: function(data){
				if(data.code==12)
				{
					Ewin.confirm({ title:'fail',
			    		 message: '无权限访问!  '+data.errorMessage
			    		 });
					return false;
				}
 			  if(data[0].app){
 				  if(data[0].app.indexOf(",")!=-1){
 					  var newkey=data[0].app.split(",");
 					  $('#app').selectVal(newkey);
 				  }else{
 					  $('#app').selectVal([data[0].app]);
 				  }
 	   		  }
 		      $('#twoconfirm').val(data[0].twoconfirm);
 			  $('#weight').val(data[0].weight);
 			  $('#price').val(data[0].price);
 			  if(data[0].feetype){
 				 $('#feetype').selectVal([data[0].feetype]);
 	   		  }
 			 
 			  $('#publishcity').val(data[0].publishcity);
 			  $('#remark').val(data[0].remark);
 			  
 			  if(data[0].apprestrict){
 				  var appre=JSON.parse(data[0].apprestrict);
 				 var addEle='<tr><td><input required="required"  name="app" type="text" class="app j-input"></td>'+
 						'<td><input required="required"  name="outnum" type="number" class="outnum j-input"></td>'+
 						'<td><button type="button" class="btn btn-danger btn-sm delAppBtn">删除</button></td></tr>';
 				 
					 $tbodyApp.html("");
 				  for(i in appre){
 					  var val=appre[i];
 					 var tr=$tbodyApp.find("tr");
 					 
 					 var lentr1=tr.length;
 					 
 					 $tbodyApp.append($(addEle));
 					 
 					$(".app").jSelect({
 					  	data:appSelData,
 					  	datakey:["appkey","name"],
 					  	multiple:false
 					});
 					var tr2= $tbodyApp.find("tr").eq(lentr1);
 					tr2.find(".app").jSelect("val",i);
 					tr2.find(".outnum").val(val);
 					 
 				  }
 			  }

 			 if(data[0].publishrestrict){
 				 var publ=JSON.parse(data[0].publishrestrict);
 				var addEle='<tr><td><input type="text"  name ="startusetime"  class="date starttime j-input"/>  </td>'+
 				        '<td><input type="text"  name ="stopusetime"  class="date endtime j-input"/>  </td>'+
 			 			'<td><input required="required"  name="usetime" class="usetime j-input"></td>'+ 
 			 			'<td><input required="required"  name="outnum2" type="text" class="outnum2 j-input"></td>'+
 			 			'<td><button type="button" class="btn btn-danger btn-sm delAppBtn2">删除</button></td></tr>';
 				$tbody2.html("");
				  for(i in publ){
					 var tr=$tbody2.find("tr");
					 var lentr1=tr.length;
					 $tbody2.append($(addEle));
					 $(".usetime").jSelect({
						  	data:timeselect,
						  	datakey:["value","text"],
						  	multiple:true
						});
					var tr2= $tbody2.find("tr").eq(lentr1);
					tr2.find(".starttime").datetimepicker({  
					    format: 'YYYY-MM-DD',  
					    locale: moment.locale('zh-cn') 
					    
					}).val(publ[i].startusetime); 

					tr2.find(".endtime").datetimepicker({  
					    format: 'YYYY-MM-DD',  
					    locale: moment.locale('zh-cn')
					    
					}).val(publ[i].stopusetime);; 
					
					var publArr=publ[i].usetime.indexOf(",")!=-1?publ[i].usetime.split(","):[publ[i].usetime];
					console.log(publ[i].usetime,publArr);
					tr2.find(".usetime").jSelect("val",publArr);
					
					tr2.find(".outnum2").val(publ[i].outnum);
					 
				  }
 				 
 			 }
	   		  if(data[0].ditch){
				  if(data[0].ditch.indexOf(",")!=-1){
					  var newkey=data[0].ditch.split(",");
					  $('#ditch').selectVal(newkey);
				  }else{
					  $('#ditch').selectVal([data[0].ditch]);
				  }
	   		  }
 			 
		      if(data[0].isconfig)
			  {
		    	  document.getElementById("isconfig1").checked=true;
			  } 
			  else 
			  {
				  document.getElementById("isconfig").checked=true;
			  }
		      
		      if(data[0].substitution)
			  {
		    	  document.getElementById("substitution1").checked=true;
			  } 
			  else 
			  {
				  document.getElementById("substitution").checked=true;
			  }
		      if(data[0].enableimsi)
			  {
				  document.getElementById("enableimsi").checked=true;
			  } 
			  else if(data[0].enableimsi==false)
			  {
				  document.getElementById("enableimsi1").checked=true;
			  }
		  	},

	 });
}
	var adname = "";
		if(adstyle==1){
			adname="插屏";
		}else if(adstyle==2){
			adname="banner";
		}else if(adstyle==3){
			adname="全屏";
		}else if(adstyle==4){
			adname="开屏";
		}else if(adstyle==5){
			adname="视频";
		}else if(adstyle==6){
			adname="开屏视频";
		}else if(adstyle==7){
			adname="动画中心视频";
		}else if(adstyle==8){
			adname="游戏墙";
		}else if(adstyle==9){
			adname="做梦视频";
		}else if(adstyle==11){
			adname="拉起广告";
		}else if(adstyle==12){
			adname="原生广告";
		}
	$("#configWintitle").html(name+"--"+adname+"配置中...");
//	$('#configWin').modal('show');
	$('#configWin').modal({backdrop: 'static', keyboard: false});
};
////时间选择面板
//function timeSet(text){
//$("#timepanel").html(""); 
//$("#timeWintitle").html("时间选择面板" );
//
//if(text.value!="")//如果text有值，则赋值给Win
//{
//	var time=text.value.split(',');
//	obj = document.getElementsByName("ct1");
//	check_val = [];
//	for(var i=0;i<time.length;i++)
//	{
//	 for(k in obj){
//		 if (obj[k].value== time[i])
//			 obj[k].checked = true;
//	}
//	}
//}
//if(text.value=="")
//{
//	obj = document.getElementsByName("ct1");
//		
//	 for(k in obj){
//			obj[k].checked = false;
//	}
//}
//
//$('#timepanel').append("<a class='btn btn-info btn-xs' href='javascript:void(0)' onclick='timeAllCheck()'>全 选</a>" +
//		"<a class='btn btn-warning btn-xs' href='javascript:void(0)' onclick='timeNoCheck()'>全不选</a>" +
//		"<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick='timeClose()'>取 消</a>" +
//		"<a class='btn btn-success btn-xs' href='javascript:void(0)' onclick='timeSure("+text.id+")'>确 定</a>");
//
//$('#timeWin').modal('show');
//}
//
//function timeAllCheck(){
//	obj = document.getElementsByName("ct1");
//	 for(k in obj){
//			obj[k].checked = true;
//	}
//}
//function timeNoCheck(){
//obj = document.getElementsByName("ct1");
// 	 for(k in obj){
// 			obj[k].checked = false;
//}
//}
//function timeClose(){
//$('#timeWin').modal("hide"); 
//}
//function timeSure(text){
//var time="";
//obj = document.getElementsByName("ct1");
//check_val = [];
//for(k in obj){
//	if(obj[k].checked&&obj[k].value!=undefined)
//		time+=obj[k].value+",";
//}
//document.getElementById(text.id).value=","+time;
//if(time=="")
//{
//	document.getElementById(text.id).value="";	
//}	
////alert(time);
//$('#timeWin').modal("hide");
//}

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
	var isconfig = "";
	var enableimsi = "";
	var twoconfirm=$('#twoconfirm').val();
	var feetype=$('#feetype').jSelect("val");
	var price=$('#price').val();
	var weight = $('#weight').val();
	var publishcity = $('#publishcity').val();
	var remark = $('#remark').val();
	var ditch = $('#ditch').jSelect("val");
	var app = $('#app').jSelect("val");
	
	
	var $addapp=$(".app");
	var $addXl=$(".outnum");
	var apprestrict={};
	var len1=$addapp.length;
	for(var i=0;i<len1;i++){
		var valapp=$addapp.eq(i).jSelect("val");
		var valxl=$addXl.eq(i).val();
		if(valapp!=""&&valxl!=""){
			apprestrict[valapp]=valxl;
		}
	}
	var apprestrict2=JSON.stringify(apprestrict);
	
	var $addstarttime=$(".starttime");
	var $addendtime=$(".endtime");
	var $addusetime=$(".usetime");
	var $addoutnum2=$(".outnum2");
	var publishrestrict=[];
	var len1=$addstarttime.length;
	for(var i=0;i<len1;i++){
		var valstarttime=$addstarttime.eq(i).val();
		var valendtime=$addendtime.eq(i).val();
		var valoutnum2=$addoutnum2.eq(i).val();
		var valusetime=$addusetime.eq(i).jSelect("val");
		
		if(valoutnum2!=""){
			if(valstarttime==""){
				alert("请填写开始时间");
				return false;
			}
		}
		if(valstarttime!=""){
			var args={
					"startusetime":valstarttime,
					"stopusetime":valendtime,
					"outnum":valoutnum2,
					"usetime":valusetime,
			};
			publishrestrict.push(args);
		}
	}
	var publishrestrict2=JSON.stringify(publishrestrict);
	     
	 if(document.getElementById("isconfig").checked==true)
	  {
	      isconfig=false;
	  }
	  if(document.getElementById("isconfig1").checked==true)
	  {
		  isconfig=true;
	  }
	  
	 if(document.getElementById("substitution").checked==true)
	  {
		  substitution=false;
	  }
	  if(document.getElementById("substitution1").checked==true)
	  {
		  substitution=true;
	  }
	  
	  if(document.getElementById("enableimsi").checked==true)
	  {
		  enableimsi=true;
	  }
	  if(document.getElementById("enableimsi1").checked==true)
	  {
		  enableimsi=false;
	  }
    $.ajax({
        url:rootPath+'/adstyleconfig/Save2.html',
        type:"post",
        data:{"id":id,'weight':weight,'price':price,'feetype':feetype,'substitution':substitution
    		,'publishcity':publishcity,'twoconfirm':twoconfirm,'app':app,'remark':remark,'ditch':ditch,
    		'isconfig':isconfig,'enableimsi':enableimsi,'publishrestrict':publishrestrict2,'apprestrict':apprestrict2},
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
}

function doReset()
{	
	$(".app").val("");
	$(".outnum").val("");
	$('.date').datetimepicker({  
	    format: 'YYYY-MM-DD',  
	    locale: moment.locale('zh-cn')  
	}).val(""); 
	$(".usetime").val("");
	$(".outnum2").val("");
	$("#app").jSelect("val",[]);
	$("#ditch").jSelect("val",[]);	
var tbl_content = document.getElementById("jichutable");

if(tbl_content!=null){
	var inputs = tbl_content.getElementsByTagName("input");
	for(var k=0;k<inputs.length;k++)
	{
	inputs[k].value="";
	}
}
} 
