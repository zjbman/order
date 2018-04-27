<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head></head>
<script type="text/javascript">
    var enddate = "${enddate}";
    var startdate = "${startdate}";
</script>
<body>
<%@include file="/../base.jsp" %>
<div style="overflow-x:hidden">
    <div class="container-fluid">
        <!-- Page Heading -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">
                    商家管理
                    <small id="small">商家入驻</small>
                </h1>
            </div>
        </div>
        <div class="col-lg-12">
            <div style='margin-right: 10px; text-align: right; margin-top: -10px; margin-bottom: 10px;'>
                <a class='btn btn-info btn-sm' href='${pageContext.request.contextPath}/businessManager/Save.html' onclick='save()'>确定</a>
                <a class='btn btn-info btn-sm' href='${pageContext.request.contextPath}/businessManager/Page.html' onclick='cancel()'>取消</a>
            </div>
        </div>
        <div id="container" style="min-width:40px;height:40px"></div>

        <div>
            <table id="table"></table>
        </div>
    </div>
</div>

<script src="${pageContext.request.contextPath}/static/js/views/business_manager.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/highcharts.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/exporting.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/data.js"></script>
</body>

</html>

