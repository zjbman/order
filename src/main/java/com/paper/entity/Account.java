package com.paper.entity;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * @author zjbman
 * @Description 账号表对应的实体类
 * @date 2018/3/23 17:30
 **/
@Entity
/* @UniqueConstraint表明该表的唯一键约束,username可以为null,但是不能有重复的username*/
@Table(name = "account",uniqueConstraints = @UniqueConstraint(columnNames = "username"))
public class Account implements java.io.Serializable{
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id",unique = true,nullable = false)
    private Integer id;

    @Column(name = "username",unique = true,length = 50)
    private String userName;

    @Column(name = "password",length = 50)
    private String passWord;

    @Column(name = "create_date",length = 19)
    private String createDate;

    @Column(name = "update_date",length = 19)
    private String updateDate;

    @Column(name = "email")
    private String email;

    @Column(name = "qq",length = 20)
    private String qq;

    @Column(name = "name")
    private String name;

    public Account(){
    }

    public Account(Integer id, String userName, String passWord,
                   String createDate, String updateDate, String email,
                   String qq, String name) {
        this.id = id;
        this.userName = userName;
        this.passWord = passWord;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.email = email;
        this.qq = qq;
        this.name = name;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", passWord='" + passWord + '\'' +
                ", createDate='" + createDate + '\'' +
                ", updateDate='" + updateDate + '\'' +
                ", email='" + email + '\'' +
                ", qq='" + qq + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
