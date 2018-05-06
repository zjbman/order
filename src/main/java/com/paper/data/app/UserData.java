package com.paper.data.app;

import com.paper.entity.User;

public class UserData {
    private Integer id;

    private String username;

    private String password;

    private String name;

    private Double money;

    private String telephone;

    private String email;

    private String qq;

    private String state;

    public UserData(User user){
        id = user.getId();
        username = user.getUsername();
        password = user.getPassword();
        name = user.getName();
        money = user.getMoney();
        telephone = user.getTelephone();
        email = user.getEmail();
        qq = user.getQq();
        if(user.getState() == null){
            state = "正常账号";
        }else {
            state = user.getState() == 1 ? "黑名单账号" : "正常账号";
        }
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
