package com.paper.data.app;

import com.paper.entity.Business;

public class BusineesData {
    private Integer id;
    private String businessName;
    private String picture;
    private String address;
    private String telephone;

    public BusineesData(Business business){
        this.id = business.getId();
        this.businessName = business.getName();
        this.picture = business.getPicture();
        this.address = business.getAddress();
        this.telephone = business.getTelephone();
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "BusineesData{" +
                "id=" + id +
                ", businessName='" + businessName + '\'' +
                ", picture='" + picture + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
