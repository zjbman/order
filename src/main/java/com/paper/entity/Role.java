package com.paper.entity;

import com.sun.xml.internal.ws.developer.UsesJAXBContext;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * @author zjbman
 * @Description 角色表对应的实体类
 * @date 2018/3/24 10:55
 **/
@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id",unique = true,nullable = false)
    private Integer id;

    @Column(name = "role")
    private String role;

    @Column(name = "describe")
    private String describe;

    public Role() {
    }

    public Role(Integer id, String role, String describe) {
        this.id = id;
        this.role = role;
        this.describe = describe;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", role='" + role + '\'' +
                ", describe='" + describe + '\'' +
                '}';
    }
}
