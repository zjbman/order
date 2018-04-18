<%--
  Created by IntelliJ IDEA.
  User: chengxuxia
  Date: 2018/4/17
  Time: 21:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <%@include file="/../base.jsp"%>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/totalData.css"/>
    <script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/highcharts.js"></script>
    <%-- <script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/exporting.js"></script>
    <script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/data.js"></script> --%>

</head>
<body>


<h1 class="j-page-title">整体概况&nbsp;&gt;&nbsp;整体报表</h1>

<div class="j-data-total">
    <div class="col-sm-6 col-lg-3">
        <div>
            <h2 id="activeusercount"></h2>
            <p>总活跃-昨日</p>
            <i id="auPercen"></i>
        </div>
    </div>

    <div class="col-sm-6 col-lg-3">
        <div>
            <h2 id="showcount"></h2>
            <p>总展示-昨日</p>
            <i id="scPercen"></i>
        </div>
    </div>

    <div class="col-sm-6 col-lg-3">
        <div>
            <h2 id="activeshow"></h2>
            <p>平均活跃展示-昨日</p>
            <i id="atPercen"></i>
        </div>
    </div>

    <div class="col-sm-6 col-lg-3">
        <div>
            <h2 id="totalincome"></h2>
            <p>近7天总收入</p>
            <i id="tlPercen"></i>
        </div>
    </div>
</div>

<div class="j-query-box">
    <div class="j-type" >
        <i  style="font-weight:bold;">数据分类</i>
        <span class="on j-typespan" style="cursor:pointer" id="disAll">总体</span>
        <span class="j-typespan"   id="disApp">分应用</span>
        <span class="j-typespan"  id="disMarket">分市场</span>
        <span class="j-typespan"  id="disAd">分广告</span>
        <span class="j-typespan"  id="disType">分样式</span>
        <button class="btn btn-info btn-sm" id="bytime">按时间对比</button>
    </div>

    <dl id="singleDate">
        <dt style="min-width:50px" >日期</dt>
        <dd><input type="text" class="j-input" id="date"></dd>
    </dl>

    <div class=j-dbdate id="dbDate" style="display:none">
        <span >日期</span>
        <input type="text" class="j-input" id="date1">
        <span>与</span>
        <input type="text" class="j-input" id="date2">
        <i id="dayTerm" class="on">昨日同期</i><i id="weekTerm" style="cursor:pointer">本周同期</i><i id="monthTerm" style="cursor:pointer">本月同期</i>
    </div>

    <dl id="selectBox" style="display:none">
        <dt id="typeTitle"></dt>
        <dd>
            <input type="text" class="j-input" id="selectInput">
        </dd>
    </dl>

    <dl id="selTypeBox" style="display:none">
        <dt id="selTypeTitle">广告样式</dt>
        <dd>
            <input type="text" class="j-input" id="selTypeInput">
        </dd>
    </dl>

</div>

<div class="j-btngroup">
    <a class='btn btn-info btn-sm' href='javascript:void(0)' onclick='query()'>查 询</a>
</div>

<div class="j-tiptitle">趋势图&gt;&gt;
    <div class="itembox" style="display:none"><i>选择指标</i><input class="j-input" type="text" id="item"></div>
</div>

<div id="container" style="width:98%;height:400px"></div>

<div id="tablebox">
    <div class="tiptitle">详细数据&gt;&gt;
    </div>
    <table id="table"></table>
</div>


<script src="${pageContext.request.contextPath}/static/js/web/rpt/data/totalstatisticConfig.js"></script>
<script src="${pageContext.request.contextPath}/static/js/web/rpt/data/totalstatistic.js"></script>

<%--<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/highcharts.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/exporting.js"></script>
<script src="${pageContext.request.contextPath}/static/jslib/hightchar/code/modules/data.js"></script> --%>

</body>
</html>
