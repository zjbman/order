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

</script>
<body>
<%@include file="/../base.jsp" %>
<div style="overflow-x:hidden">
    <div class="container-fluid">
        <!-- Page Heading -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">
                    订单列表
                    <small id="small">详情列表</small>
                </h1>
            </div>
        </div>

        <div id="container" style="min-width:40px;height:40px"></div>

        <div>
            <table id="table"></table>
        </div>
    </div>
</div>

<script src="${pageContext.request.contextPath}/static/js/views/order_list.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/highcharts.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/exporting.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/data.js"></script>
</body>

</html>

