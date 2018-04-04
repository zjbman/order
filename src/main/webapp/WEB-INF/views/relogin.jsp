<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>欢迎登录</title>
    <link rel="stylesheet" href="static/css/login.css">
    <script src="static/Jquery/jquery-3.1.0.min.js"></script>

</head>
<body>
<div id="main">

    <form class="loginbox" id="loginForm" method="post" action="Login.html" onmousedown="showInfo()">
        <img src="static/img/logo.png" class="loginlogo">
        <h2>点菜系统管理后台</h2>

        <div class="inputbox"><label  id="luser"></label><input type="text" id="username" name="username" placeholder="账号"></div>
        <%--<div class="inputbox"><label for="user" id="luser"></label><input type="text" id="username" name="username" placeholder="账号"></div>--%>
        <%--<div class="inputbox"><label for="pwd" id="lpwd"></label><input type="password" id="password" name="password" placeholder="密码"></div>--%>
        <div class="inputbox"><label  id="lpwd"></label><input type="password" id="password" name="password" placeholder="密码"></div>
        <div class="handlepwd">
            <label ><input type="checkbox" id="rempwd">记住密码</label>
        </div>
        <div class="alert">
            <h3 ><span style="color: #dc143c; ">${requestScope.loginFail}</span></h3>
        </div>
        <input type="button" value="登录" class="sub" onclick="login()">
    </form>

</div>
</body>
<script>
    //密码框
    var pwdField = $("#password");
    var pwdVal = pwdField.attr('placeholder');
    var pwdId = pwdField.attr('id');
    var pwdPlaceholder = $("#password");

    function showInfo() {

    }

    function login() {

        var password = document.getElementById('password').value;
        var username = document.getElementById('username').value;

        if(username == ''){
            alert("账号不能为空");
            return false;
        }

        if(password == ''){
            alert("密码不能为空");
            return false;
        }

        document.getElementById('loginForm').submit()

    }

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
            document.getElementById('loginForm').submit();
        }
    });

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

</script>

</html>