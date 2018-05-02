package com.paper.data;

import com.paper.entity.Goods;


public class GoodsData {
    private Integer id;

    /** 商品名*/
    private String name;

    /** 商品介绍*/
    private String details;

    /** 价钱*/
    private Double price;

    /** 外键，关联商家表的id*/
    private String businessName;

    /** 商品图片*/
    private String picture;

    /** 上传商品日期*/
    private String date;

    /** 修改商品日期*/
    private String updateDate;

    public GoodsData(Goods goods){
        id = goods.getId();
        name = goods.getName();
        details = goods.getDetails();
        price = goods.getPrice();
        businessName = goods.getBusiness().getName();
        picture = goods.getPicture();
        date = goods.getDate();
        updateDate = goods.getUpdateDate();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }
}
