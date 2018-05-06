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
                    <small id="small">入驻商家列表</small>
                </h1>
            </div>
        </div>
        <div class="col-lg-12">
            <div style='margin-right: 10px; text-align: right; margin-top: -10px; margin-bottom: 10px;'>
                <a class='btn btn-info btn-sm' href='<%=request.getContextPath()%>/businessManager/Add.html'
                   onclick='add()'>商家入驻</a>
                <a class='btn btn-warning btn-sm'  onclick='show()'>查看详情</a>
                <a class='btn btn-danger btn-sm'  onclick='update()'>修改</a>
                <%-- 有太多的表关联着商家表了，所以很多时候的删除是无效的，所以注释了--%>
                <%--<a class='btn btn-success btn-sm'  onclick='del()'>删 除</a>--%>
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
                            <th>商家名：</th>
                            <td><input id="businessName" name="businessName" type="text" required="required"></td>
                        </tr>
                        <tr>
                            <th>联系人：</th>
                            <td><input name="contact"  id="contact" type="text" required="required"></td>
                        </tr>
                        <tr>
                            <th>联系方式：</th>
                            <td><input name="telephone"  id="telephone" type="text" style="width:100%"></td>
                        </tr>
                        <tr>
                            <th>地址：</th>
                            <td><input name="address"  id="address" type="text" style="width:100%"></td>
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

<script src="${pageContext.request.contextPath}/static/js/views/business_manager.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/highcharts.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/exporting.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/data.js"></script>
</body>

</html>

