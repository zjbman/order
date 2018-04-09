/**
 * Created by Administrator on 2017/3/30 0030.
 */
//编辑面板
function Win2edit(name,id){
	$('#daterimepicker1').datetimepicker({  
	format: 'YYYY-MM-DD',  
    locale: moment.locale('zh-cn')//,  
	}); 
	
	$("#adstyle").select2({
	     data:mapData(adstyle,"value","text"),
	     	multiple:true,
		    language: "zh-CN"
	 });
	$("#onlinetype").select2({
	     data:mapData(onlinetype,"value","text"),
		    language: "zh-CN"
	 });
    if(id!="")
    {
        $.ajax({
            url:rootPath+'/marketPackageConfig/Find.html',
            type:"post",
            data:{"marketpackageid":id},
            dataType:"json",
            success: function(data){
                if(data.code==12)
                {
                	 Ewin.confirm({ title: "fail",
       		    		 message: '无权限访问!  '+data.errorMessage
       		    	  });
         			 $('#win1').modal('hide');
      				   return false;
                }
                $('#id').val(data[0].id);
                $('#adstyle').val(data[0].adstyle);
                $('#adstyle').trigger('change'); 
                $('#onlinetype').val(data[0].onlinetype);
                $('#onlinetype').trigger('change'); 
                $('#marketonlineDate').val(data[0].marketonlineDate);

            }
        });
    }
    $("#configWintitle").html(name+"-配置中...");
	$('#configWin').modal('show');

}
function saveConfig(){
	var onlinetype=$('#onlinetype').val();
	var marketonlineDate=$('#marketonlineDate').val();
    var adstyle=$('#adstyle').val();
    var id=$('#id').val();
    $.ajax({
        url:rootPath+'/marketPackageConfig/Save.html',
        type:"post",
        data:{"id":id,'adstyle':adstyle,'onlinetype':onlinetype,'marketonlineDate':marketonlineDate},
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
