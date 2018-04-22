package com.paper.data;


import com.paper.entity.Business;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/22 17:00
 **/
public class BusinessData {
    private Integer id;
    private String datetime;
    private String businessName;
    private String contact;
    private String telephone;
    private String address;

    public BusinessData(Business business){
        id = business.getId();
        datetime = business.getDate();
        businessName = business.getName();
        contact = business.getContact();
        telephone = business.getTelephone();
        address = business.getAddress();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
