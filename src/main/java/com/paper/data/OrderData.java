package com.paper.data;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.paper.entity.Goods;
import com.paper.entity.Order;
import com.paper.service.GoodsService;

public class OrderData {
    private Integer id;

    /** 外键，关联用户信息表的userName*/
    private String userName;

    /** 该订单总价钱*/
    private Double price;

    /** 下单日期*/
    private String date;

    /** 配送地址*/
    private String address;

    /** 外键，关联商家表的Name*/
    private String businessName;

    /** 商品Name及数量*/
    private String goods;

    /** 订单送达时拨打的号码*/
    private String telephone;

    /** 备注*/
    private String remark;

    public OrderData(Order order, GoodsService goodsService){
        id = order.getId();
        userName = order.getUser().getName();
        price = order.getPrice();
        date = order.getDate();
        address = order.getAddress();
        businessName = order.getBusiness().getName();
        telephone = order.getTelephone();
        remark = order.getRemark();

        JSONArray jsonArray = JSONArray.parseArray(order.getGoods());
        StringBuilder sb = new StringBuilder();
        for(int i = 0;i < jsonArray.size();i ++){

            JSONObject jsonObject = (JSONObject) jsonArray.get(i);
            Integer businessId = jsonObject.containsKey("id") ? jsonObject.getInteger("id") : null;
            if(businessId != null){
                Goods goods = goodsService.findById(businessId);
                sb.append(goods.getName());
                sb.append(" : ");
            }
            Integer number = jsonObject.containsKey("number") ? jsonObject.getInteger("number") : null;
            if(number != null){
                sb.append(number);
            }

            if(i != jsonArray.size() -1){
                sb.append(",");
            }
        }

        goods = sb.toString();
    }

    public String getGoods() {
        return goods;
    }

    public void setGoods(String goods) {
        this.goods = goods;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
