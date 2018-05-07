package com.paper.data.app;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.paper.entity.Goods;
import com.paper.entity.Order;
import com.paper.entity.User;
import com.paper.service.GoodsService;

import java.util.ArrayList;
import java.util.List;

public class OrderData {
    private Integer id;
    private String name;
    private String userName;
    private Double price;
    private String address;
    private String date;
    private Integer businessId;
    private String businessName;
    private String telephone;
    private String remark;
    private List<GoodsData> goodsDataList;

    public OrderData(Order order, User user, GoodsService goodsService){
        id = order.getId();
        name = user.getName();
        userName = user.getUsername();
        price = order.getPrice();
        address = order.getAddress();
        date = order.getDate();
        businessId = order.getBusiness().getId();
        businessName = order.getBusiness().getName();
        telephone = order.getTelephone();
        remark = order.getRemark();

        goodsDataList = new ArrayList<GoodsData>();
        String goods = order.getGoods();
        //转化成jsonArray
        JSONArray jsonArray = JSONArray.parseArray(goods);
        for (int i = 0; i < jsonArray.size(); i++) {
            GoodsData data = new GoodsData();
            JSONObject jsonObject = (JSONObject) jsonArray.get(i);
            Integer goodsId = jsonObject.containsKey("goodsId") ? jsonObject.getInteger("goodsId") : 0;
            Integer goodsNumber = jsonObject.containsKey("goodsNumber") ? jsonObject.getInteger("goodsNumber") : 0;

            Goods byId = goodsService.findById(goodsId);

            data.setId(byId.getId());
            data.setPrice(byId.getPrice());
            data.setPicture(byId.getPicture());
            data.setGoodsName(byId.getName());
            data.setDetails(byId.getDetails());
            data.setNumber(goodsNumber);

            goodsDataList.add(data);
        }
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Integer businessId) {
        this.businessId = businessId;
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

    public List<GoodsData> getGoodsDataList() {
        return goodsDataList;
    }

    public void setGoodsDataList(List<GoodsData> goodsDataList) {
        this.goodsDataList = goodsDataList;
    }

    @Override
    public String toString() {
        return "OrderData{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", userName='" + userName + '\'' +
                ", price=" + price +
                ", address='" + address + '\'' +
                ", date='" + date + '\'' +
                ", businessId=" + businessId +
                ", businessName='" + businessName + '\'' +
                ", telephone='" + telephone + '\'' +
                ", remark='" + remark + '\'' +
                ", goodsDataList=" + goodsDataList +
                '}';
    }

    public class GoodsData {
        private Integer id;
        private String goodsName;
        private String details;
        private String picture;
        private Integer number;
        private Double price;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
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

        public Integer getNumber() {
            return number;
        }

        public void setNumber(Integer number) {
            this.number = number;
        }

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }

        @Override
        public String toString() {
            return "GoodsData{" +
                    "id=" + id +
                    ", goodsName='" + goodsName + '\'' +
                    ", details='" + details + '\'' +
                    ", picture='" + picture + '\'' +
                    ", number=" + number +
                    ", price=" + price +
                    '}';
        }
    }
}
