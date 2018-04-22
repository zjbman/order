package com.paper.controller.base;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/22 17:56
 **/
public class BaseListController<T> extends BaseController {
    protected T instant;
    protected List<T> list = null; // 查询到的列表对象
    protected List<Object[]> reportList = new ArrayList<Object[]>();//报表对象
    protected long totalCount = 0;// 总记录
    protected String start = "0";// 开始记录
    protected String limit = "20";// 每页记录多少
    protected String rows = "0";// 开始记录
    protected String filter = null;// 开始记录
    protected Integer id=null;
    protected long page = 20;// 每页记录多少
    protected long pageNo = 1;// 页数

    public T getInstant() {
        return instant;
    }

    public void setInstant(T instant) {
        this.instant = instant;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public List<Object[]> getReportList() {
        return reportList;
    }

    public void setReportList(List<Object[]> reportList) {
        this.reportList = reportList;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getLimit() {
        return limit;
    }

    public void setLimit(String limit) {
        this.limit = limit;
    }

    public String getRows() {
        return rows;
    }

    public void setRows(String rows) {
        this.rows = rows;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public long getPage() {
        return page;
    }

    public void setPage(long page) {
        this.page = page;
    }

    public long getPageNo() {
        return pageNo;
    }

    public void setPageNo(long pageNo) {
        this.pageNo = pageNo;
    }
}
