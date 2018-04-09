/**
 * Created by Administrator on 2017/3/30 0030.
 */
//编辑面板
var editRow1 = undefined;
var data1 = "";
var data2 = "";
var appid1='';
var isopen= [{ "value": '0', "text": "关闭" },{ "value": '1', "text": "开启" }];

function Win2edit(name,id){
	$("#adstyle").jSelect({
	data:adstyle,
	datakey:["value","text"],
	});
	
  
    if(id!="")
    {
        $.ajax({
            url:rootPath+'/appconfig/Find.html',
            type:"post",
            data:{"appid":id},
            dataType:"json",
            success: function(data){
                if(data.code==12)
                {
                    Ewin.alert({ title: "fail",
      		    		 message: '无权限访问!  '+data.errorMessage
      		    	  });
        			 $('#win1').modal('hide');
     				   return false;
                }
                $('#id').val(data[0].id);
      		  if(data[0].adstyle){
    			  if(data[0].adstyle.indexOf(",")!=-1){
    				  var newkey=data[0].adstyle.split(",");
    				  $('#adstyle').selectVal(newkey);
    			  }else{
    				  $('#adstyle').selectVal([data[0].adstyle]);
    			  }
       		  }
      		console.log(data[0]);
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
    
    $("#win2title").html(name+"-配置中...");
	$('#win2').modal('show');
}




function saveConfig(){
    var adstyle=$('#adstyle').selectVal();
    var id=$('#id').val();
	 if(document.getElementById("isconfig").checked==true)
	  {
	      isconfig=false;
	  }
	  if(document.getElementById("isconfig1").checked==true)
	  {
		  isconfig=true;
	  }
    $.ajax({
        url:rootPath+'/appconfig/Save.html',
        type:"post",
        data:{"id":id,"adstyle":adstyle,'isconfig':isconfig},
        dataType:"json",
        success: function(data){
            $('#win2').modal("hide");
            if(data.code==12)
            {
                Ewin.alert({ title: "fail",
  	    		 message: '无权限访问!  '+data.errorMessage
               	});
                   return false;
            }
            if(data.msg==null)
            {
                Ewin.alert({ title: "提示",
 	    		 message: '保存成功!',
 	    		 icon:"glyphicon-ok"
              	});
            }
            else
            {
                Ewin.alert({ title: "提示",
	    		 message: ' 保存失败!',
	    		 icon:"glyphicon-remove"
             	});
            }
            $('#table').bootstrapTable("refresh");
        }
    });
}
