<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
    String path = request.getContextPath();
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
                <a class='btn btn-info btn-sm' onclick='save()'>确 定</a>
                <a class='btn btn-warning btn-sm' onclick='cancel()'>取 消</a>
                <a class='btn btn-danger btn-sm'  onclick='returnTo()'>返回商家管理</a>
            </div>
        </div>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <table id="businessAdd" class="tab-panal">
                        <tr>
                            <th>商家名：</th>
                            <td><input id="businessName" name="businessName" type="text" required="required"></td>
                        </tr>
                        <tr>
                            <th>联系人：</th>
                            <td><input id="contact" name="contact" type="text"  required="required"></td>
                        </tr>
                        <tr>
                            <th>手机号码：</th>
                            <td><input id="telephone" name="telephone" type="text" required="required" style="width:100%"></td>
                        </tr>

                        <tr>
                            <th>商家详细地址：</th>
                            <td><input name="address" id="address" type="text" required="required"></td>
                        </tr>

                    </table>
                </div>
            </div>
        </div>
    </div>

    <script src="${pageContext.request.contextPath}/static/js/views/business_add.js"></script>
    <script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/highcharts.js"></script>
    <script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/exporting.js"></script>
    <script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/data.js"></script>
</body>

</html>

