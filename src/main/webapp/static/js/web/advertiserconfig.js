/**
 * Created by Administrator on 2017/3/30 0030.
 */
//编辑面板
function Win2edit(name,id){
    $("#adstyle").combobox({
        data:adstyle,
        multiple:true,
        valueField:'value',
        textField:'text'
    });
    $('#win2').window({
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
            url:rootPath+'/advertiserconfig/Find.html',
            type:"post",
            data:{"advertiserid":id},
            dataType:"json",
            success: function(data){
                if(data.code==12)
                {
                    $.messager.alert('fail', '无权限访问!  '+data.errorMessage);
                    $('#win1').window('close');
                    return false;
                }
                $('#id').val(data[0].id);
                $('#adstyle').combobox('setValues',data[0].adstyle);
            }
        });
    }
    $('#win2').window('open');
}
function saveConfig(){
    var adstyle="";
    var temadstyle=$('#adstyle').combobox('getValues');
    for(var j=0;j<temadstyle.length;j++){
        adstyle+=temadstyle[j]+",";
    }
    var id=$('#id').val();
    $.ajax({
        url:rootPath+'/advertiserconfig/Save.html',
        type:"post",
        data:{"id":id,"adstyle":adstyle.substring(0, adstyle.length-1)},
        dataType:"json",
        success: function(data){
            $('#win2').window('close');
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
