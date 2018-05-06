package com.paper.data.app;

import com.paper.entity.Cart;

public class CartData {
    private Integer id;
    private String name;
    private String username;
    private String businessName;
    private String goodsPicture;
    private String goodsName;
    private String goodsDetails;
    private Double goodsPrice;
    private int goodsNumber;

    public CartData(Cart cart){
        id = cart.getId();
        name = cart.getUser().getName();
        username = cart.getUser().getUsername();
        businessName = cart.getBusiness().getName();
        goodsPicture = cart.getGoods().getPicture();
        goodsName = cart.getGoods().getName();
        goodsDetails = cart.getGoods().getDetails();
        goodsPrice = cart.getGoods().getPrice();
        goodsNumber = cart.getGoodsNumber();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getGoodsPicture() {
        return goodsPicture;
    }

    public void setGoodsPicture(String goodsPicture) {
        this.goodsPicture = goodsPicture;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public String getGoodsDetails() {
        return goodsDetails;
    }

    public void setGoodsDetails(String goodsDetails) {
        this.goodsDetails = goodsDetails;
    }

    public Double getGoodsPrice() {
        return goodsPrice;
    }

    public void setGoodsPrice(Double goodsPrice) {
        this.goodsPrice = goodsPrice;
    }

    public int getGoodsNumber() {
        return goodsNumber;
    }

    public void setGoodsNumber(int goodsNumber) {
        this.goodsNumber = goodsNumber;
    }

    @Override
    public String toString() {
        return "CartData{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", businessName='" + businessName + '\'' +
                ", goodsPicture='" + goodsPicture + '\'' +
                ", goodsName='" + goodsName + '\'' +
                ", goodsDetails='" + goodsDetails + '\'' +
                ", goodsPrice=" + goodsPrice +
                ", goodsNumber=" + goodsNumber +
                '}';
    }
}
