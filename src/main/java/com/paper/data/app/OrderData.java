package com.paper.data.app;

import com.paper.entity.Order;

public class OrderData {
    private Integer businessId;
    private String businessName;
    private String businessPicture;
    private String date;
    private String businessAddress;
    private String telephone;
    private Double price;


    public OrderData(Order order){
        businessId = order.getBusiness().getId();
        businessName = order.getBusiness().getName();
        businessPicture = order.getBusiness().getPicture();
        businessAddress = order.getBusiness().getAddress();
        telephone = order.getTelephone();
        price = order.getPrice();
        date = order.getDate();
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

    public String getBusinessPicture() {
        return businessPicture;
    }

    public void setBusinessPicture(String businessPicture) {
        this.businessPicture = businessPicture;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getBusinessAddress() {
        return businessAddress;
    }

    public void setBusinessAddress(String businessAddress) {
        this.businessAddress = businessAddress;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "OrderData{" +
                "businessId=" + businessId +
                ", businessName='" + businessName + '\'' +
                ", businessPicture='" + businessPicture + '\'' +
                ", date='" + date + '\'' +
                ", businessAddress='" + businessAddress + '\'' +
                ", telephone='" + telephone + '\'' +
                ", price=" + price +
                '}';
    }
}
