var pwdField = $("#password");
var pwdVal = pwdField.attr('placeholder');
var pwdId = pwdField.attr('id');
var pwdPlaceholder = $("#password");

var userd=getCookie("luser")||"";
var pwdd=getCookie("lpwd")||"";
var checkd=getCookie("ischeck")||false;

if(!isSupportPlaceholder()) {

	// 遍历所有input对象, 除了密码框
	$('input').not("input[type='password']").each(
  		function() {
    	var self = $(this);
    	var val = self.attr("placeholder");
    	input(self, val);
  		}
	);

	// 对password框的特殊处理	
    // 重命名该input的id为原id后跟1
    pwdField.after('<input id="' + pwdId +'1" type="text" value='+pwdVal+' autocomplete="off" />');
		pwdPlaceholder = $('#' + pwdId + '1');
	   pwdPlaceholder.show();
	   pwdField.hide();

    pwdPlaceholder.focus(function(){
      pwdPlaceholder.hide();
      pwdField.show();
      pwdField.focus();
    });
      
    pwdField.blur(function(){
      if(pwdField.val() == '') {
        pwdPlaceholder.show();
        pwdField.hide();
      }
    });
}
	

$("#username").keydown(function(e){
	if (e.keyCode == 13){
		pwdPlaceholder.focus();
	}
});  
$("#password").keydown(function(e){
	if (e.keyCode == 13){
		sub();
}
});


$("#rempwd").click(function(){
	console.log($("#rempwd").is(':checked'));
});


//记住密码
if(checkd){
	$("#username").val(userd);
	$("#password").val(pwdd);
	$("#rempwd").attr("checked","checked");
}


//设置cookie
var passKey = '4c05c54d952b11e691d76c0b843ea7f9';
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" +cvalue + "; " + expires;
}
 //获取cookie
 function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
     for(var i=0; i<ca.length; i++) {
         var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1){
           var cnameValue = c.substring(name.length, c.length);
           return cnameValue;
        } 
     }
     return "";
 }
 //清除cookie  
 function clearCookie(cname) {  
     setCookie(cname, "", -1);  
 }


function sub(){
	var ischeck=$("#rempwd").is(':checked');
	if(ischeck){
		var luser=$("#username").val();
		var lpwd=$("#password").val();
		
		setCookie("luser",luser, 30);
		setCookie("lpwd",lpwd, 30);
		setCookie("ischeck",ischeck, 30);
	}else{
		clearCookie("luser");
		clearCookie("lpwd");
		clearCookie("ischeck");
	}
	void(document.getElementById('loginForm').submit());
}

// 判断浏览器是否支持placeholder属性
function isSupportPlaceholder() {
  var input = document.createElement('input');
  return 'placeholder' in input;
}

// jQuery替换placeholder的处理
function input(obj, val) {
  var $input = obj;
  var val = val;
  $input.attr({value:val});
  $input.focus(function() {
    if ($input.val() == val) {
      $(this).attr({value:""});
    }
  }).blur(function() {
    if ($input.val() == "") {
            $(this).attr({value:val});
    }
  });
} 


/*密码是否可见*/
var hideimg="pwdhide.png";
var showimg="pwdshow.png";
$("#stateimg").click(function(){
  var ssrc=$(this).attr("src");
	if($(this).attr("src").indexOf(hideimg)!=-1){
		pwdField.attr("type","text");
    var newsrc=ssrc.replace(hideimg,showimg);
		$(this).attr("src",newsrc);
	}else{
		pwdField.attr("type","password");
		var newsrc=ssrc.replace(showimg,hideimg);
    $(this).attr("src",newsrc);	
	}
	
});




