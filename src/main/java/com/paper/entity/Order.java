package com.paper.entity;


import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/22 17:28
 **/
@Entity
@Table(name = "order")
public class Order  implements java.io.Serializable {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    /** 外键，关联用户信息表的id*/
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    /** 该订单总价钱*/
    @Column(name = "price")
    private Double price;

    /** 下单日期*/
    @Column(name = "date")
    private String date;

    /** 配送地址*/
    @Column(name = "address")
    private String address;

    /** 外键，关联商家表的id*/
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "business_id")
    private Business business;


    /** 以Json形式存储，包含商品id和相应的数量 [{"goodsId":95,"goodsNumber":1},{"goodsId":94,"goodsNumber":1},{"goodsId":96,"goodsNumber":2}]*/
    @Column(name = "goods")
    private String goods;

    /** 订单送达时拨打的号码*/
    @Column(name = "telephone")
    private String telephone;

    /** 备注*/
    @Column(name = "remark")
    private String remark;

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public String getGoods() {
        return goods;
    }

    public void setGoods(String goods) {
        this.goods = goods;
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
