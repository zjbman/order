package com.paper.data.app;

import java.util.List;
import java.util.Map;

/**
 * 将 List<Map<String, Object>>封装成一个JavaBean对象，
 * 否则Controller接口不能正常接收前端传递过来的参数
 */
public class GoodsList {
    List<Map<String, Object>> goodsList;

    public List<Map<String, Object>> getGoodsList() {
        return goodsList;
    }

    public void setGoodsList(List<Map<String, Object>> goodsList) {
        this.goodsList = goodsList;
    }
}
