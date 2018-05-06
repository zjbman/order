package com.paper.data.app;

import com.paper.entity.Goods;

public class GoodsData {
    private int id;
    private String goodsName;
    private String details;
    private String picture;
    private Double price;
    private int businessId;
    private String businessName;

    public GoodsData(Goods goods){
        id = goods.getId();
        goodsName = goods.getName();
        details = goods.getDetails();
        picture = goods.getPicture();
        price = goods.getPrice();
        businessId = goods.getBusiness().getId();
        businessName = goods.getBusiness().getName();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public int getBusinessId() {
        return businessId;
    }

    public void setBusinessId(int businessId) {
        this.businessId = businessId;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    @Override
    public String toString() {
        return "GoodsData{" +
                "id=" + id +
                ", goodsName='" + goodsName + '\'' +
                ", details='" + details + '\'' +
                ", picture='" + picture + '\'' +
                ", price=" + price +
                ", businessId=" + businessId +
                ", businessName='" + businessName + '\'' +
                '}';
    }
}
