<%--
  Created by IntelliJ IDEA.
  User: zjbman
  Date: 2018/4/4
  Time: 17:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta charset="UTF-8">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <link href="${pageContext.request.contextPath}/favicon.ico" rel="icon" type="image/x-icon"/>
    <link href="${pageContext.request.contextPath}/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
    <link rel="stylesheet" type="text/css"
          href="<%=request.getContextPath()%>/static/bootstrap-3.3.7/dist/css/bootstrap.css">

    <link href="<%=request.getContextPath()%>/static/jslib/metisMenu/metisMenu.min.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/static/font-awesome/css/font-awesome.min.css" rel="stylesheet"
          type="text/css">
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/css.css">
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/welcome.css">

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/Jquery/jquery-3.1.0.min.js"></script>
    <script type="text/javascript"
            src="<%=request.getContextPath()%>/static/bootstrap-3.3.7/dist/js/bootstrap.min.js"></script>

    <script src="<%=request.getContextPath()%>/static/jslib/metisMenu/metisMenu.min.js"></script>

    <script src="<%=request.getContextPath()%>/static/js/util.js"></script>

    <script>
        var rootPath = "${pageContext.request.contextPath}";
    </script>
    <title>欢迎您</title>
</head>
<body>

<div id="wrapper">
    <!-- Navigation -->
    <nav class="navbar navbar-static-top" role="navigation">

        <!-- .navbar-header -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand">
                <img src="${pageContext.request.contextPath}/static/img/logo.png">点菜系统管理后台
            </a>
        </div>
        <!-- /.navbar-header -->


        <ul class="nav navbar-top-links navbar-right">

            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#" style='margin-top:15px'>
                    <%-- sessionScope[key] 获取shiro的session中的数据--%>
                    <i class="fa fa-user fa-fw"></i>${sessionScope['loginUser'].username}<i
                        class="fa fa-caret-down"></i>
                </a>

                <ul class="dropdown-menu dropdown-user">
                    <li><a href='${pageContext.request.contextPath}/index.jsp' target="mainFrame"><i
                            class="fa fa-user fa-fw"></i>返回欢迎页</a>
                    </li>
                    <li><a href="#"><i class="fa fa-gear fa-fw"></i>修改密码</a>
                    </li>
                    <li class="divider"></li>
                    <li><a href="${pageContext.request.contextPath}/LoginOut.html"><i class="fa fa-sign-out fa-fw"></i>退出</a>
                    </li>
                </ul>
                <!-- /.dropdown-user -->
            </li>
            <!-- /.dropdown -->
        </ul>
        <!-- /.navbar-top-links -->

        <div class="sidebar sidebar2" role="navigation">
            <div class="sidebar-nav navbar-collapse">

                <%-- 主界面的侧菜单，需要的有 用户表，权限（其实就是菜单表，用户组表  ==>> 菜单和用户组的关联表）一共四张表--%>
                <ul class="nav" id="side-menu">
                    <%--<c:if var="fl" test="${sessionScope['TUser']==sessionScope['loginUser']}">--%>
                        <c:set var="parent" value="${sessionScope['permission']}"></c:set>
                        <br>
                        <br>
                        <br>
                        <li><a href = '${pageContext.request.contextPath}/businessManager/List.html'>商家管理</a></li>
                        <br>
                        <br>
                        <li><a href = '${pageContext.request.contextPath}/orderList/List.html'>订单列表</a></li>
                        <br>
                        <br>
                        <li><a href = '${pageContext.request.contextPath}/orderIncome/List.html'>订单收入</a></li>
                        <br>
                        <br>
                        <li><a href = '${pageContext.request.contextPath}/userManager/List.html'>用户管理</a></li>

                        <c:forEach items="${parent}" var="pm" varStatus="status">
                            <c:set var="key" value="${pm.key}"/>
                            <c:if test="${pm.key eq 0}">      <%-- 在这里判断map集合的key是否为0，0则代表父菜单--%>

                                <%-- items这里拿到的是List<TMenu> ,m 则是Tmenu--%>
                                <c:forEach items="${parent[pm.key] }" var="m" varStatus="status">

                                    <li id="t${status.index+1}">

                                        <c:if test="${sessionScope['permission'][m.id]==null}">
                                            <a href="javascript:void(0)">${m.name}</a>
                                            <%--<h3>fdsf1</h3>--%>
                                        </c:if>
                                        <c:if test="${sessionScope['permission'][m.id]!=null}">
                                            <a href="javascript:;" data-toggle="collapse"
                                               data-target="#demo${m.id}">${m.name}<span class="fa arrow"></span></a>
                                            <%--<h3>fdsf2</h3>--%>
                                        </c:if>

                                        <ul id="demo${m.id}" class="nav nav-second-level">
                                            <c:forEach var="sub" items="${sessionScope['permission'][m.id]}">
                                                <c:if test="${sub.display==true}">
                                                    <li>
                                                        <a href="${pageContext.request.contextPath}/${sub.url}"
                                                           target="pageframe">${sub.name}</a>
                                                    </li>
                                                </c:if>
                                            </c:forEach>
                                        </ul>


                                    </li>
                                </c:forEach>
                            </c:if>
                        </c:forEach>
                    <%--</c:if>--%>
                    <%-- if end--%>

                </ul>


            </div>
        </div>
    </nav>

    <div id="page-wrapper">
        <iframe width="100%" height="100%" name="pageframe" frameBorder="0"></iframe>
    </div>


</div>
<script src="<%=request.getContextPath()%>/static/jslib/sb-admin-2.js"></script>
<script>
    function setpage() {
        var ww = $(window).width();
        var wh = $(window).height();
        if (ww > 768) {
            $(".sidebar2").height(wh - 90);
        } else {
            $(".sidebar2").css("height", "auto");
        }
    }

    setpage();
    window.onresize = setpage;
    var nav1 = $("#side-menu").children('li').children("a");
    for (var i = 0; i < nav1.length; i++) {
        if (nav1.eq(i).html().substring(0, 4) == "整体概况") {
            nav1.eq(i).click();
            var nav2 = nav1.eq(i).next().find("a").eq(0);
            nav2.click();
            window.open(rootPath + "/rpt/total/statistic/Page.html", "pageframe");
            break;
        }
    }


</script>

</body>
</html>
