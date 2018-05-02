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
                    商家详情
                    <small id="small">商品列表</small>
                </h1>
            </div>
        </div>
        <div class="col-lg-12">
            <div style='margin-right: 10px; text-align: right; margin-top: -10px; margin-bottom: 10px;'>
                <a class='btn btn-info btn-sm' onclick='add()'>新 增</a>
                <a class='btn btn-warning btn-sm' onclick='update()'>修 改</a>
                <a class='btn btn-success btn-sm' onclick='del()'>删 除</a>
                <a class='btn btn-danger btn-sm' onclick='returnTo()'>返回商家管理</a>
            </div>
        </div>
        <div id="container" style="min-width:40px;height:40px"></div>

        <div>
            <table id="table"></table>
        </div>
    </div>

    <div class="modal fade" role="dialog" id="win1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="win1title"></h4>
                </div>
                <div class="modal-body">
                    <input type="hidden"  id="id" name="id" value=""/>
                    <table id="ctable" class="tab-panal" >
                        <tr>
                            <th>商品名：</th>
                            <td><input id="name" name="name" type="text" required="required"></td>
                        </tr>
                        <tr>
                            <th>商品介绍：</th>
                            <td><input name="details"  id="details" type="text" required="required"></td>
                        </tr>
                        <tr>
                            <th>单价：</th>
                            <td><input name="price"  id="price" type="text" style="width:100%"></td>
                        </tr>
                    </table>
                </div>

                <div class="modal-footer">
                    <button type="button"  class='btn btn-danger' data-dismiss="modal">取 消</button>
                    <button type="button" class="btn btn-success" onclick="save()">保 存</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="${pageContext.request.contextPath}/static/js/views/goods_list.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/highcharts.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/exporting.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/data.js"></script>
</body>

</html>

