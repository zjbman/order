package com.paper.data.app;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.paper.entity.Cart;
import com.paper.entity.Goods;
import com.paper.service.GoodsService;

import java.util.ArrayList;
import java.util.List;

public class CartData {
    private Integer id;
    private String name;
    private String username;
    private String businessName;
    private List<GoodsData> goodsDataList;

    public CartData(Cart cart, GoodsService goodsService) {
        id = cart.getId();
        name = cart.getUser().getName();
        username = cart.getUser().getUsername();
        businessName = cart.getBusiness().getName();

        goodsDataList = new ArrayList<GoodsData>();
        String goods = cart.getGoods();
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

    public List<GoodsData> getGoodsDataList() {
        return goodsDataList;
    }

    public void setGoodsDataList(List<GoodsData> goodsDataList) {
        this.goodsDataList = goodsDataList;
    }

    @Override
    public String toString() {
        return "CartData{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", businessName='" + businessName + '\'' +
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
