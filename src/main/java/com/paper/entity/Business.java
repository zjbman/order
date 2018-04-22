package com.paper.entity;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/22 17:18
 **/
@Entity
@Table(name = "business")
public class Business  implements java.io.Serializable {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    /** 商家名称*/
    @Column(name = "name")
    private String name;

    /** 联系人*/
    @Column(name = "contact")
    private String contact;

    /** 联系方式*/
    @Column(name = "telephone")
    private String telephone;

    /** 地址*/
    @Column(name = "address")
    private String address;

    /** 入驻日期*/
    @Column(name = "date")
    private String date;

    /** 商家图片*/
    @Column(name = "picture")
    private String picture;

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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
