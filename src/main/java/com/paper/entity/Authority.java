package com.paper.entity;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * @author zjbman
 * @Description 权限表对应的实体类
 * @date 2018/3/24 10:49
 **/
@Entity
@Table(name = "authority")
public class Authority {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id",unique = true,nullable = false)
    private Integer id;

    @Column(name = "authority")
    private String authority;

    @Column(name = "describe")
    private String describe;

    public Authority() {
    }

    public Authority(Integer id, String authority, String describe) {
        this.id = id;
        this.authority = authority;
        this.describe = describe;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    @Override
    public String toString() {
        return "Authority{" +
                "id=" + id +
                ", authority='" + authority + '\'' +
                ", describe='" + describe + '\'' +
                '}';
    }
}
