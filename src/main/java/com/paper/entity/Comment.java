package com.paper.entity;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/22 17:22
 **/
@Entity
@Table(name = "comment")
public class Comment  implements java.io.Serializable {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    /** 评论内容*/
    @Column(name = "content")
    private String content;

    /** 日期*/
    @Column(name = "date")
    private String date;

    /** 外键，关联用户信息表的id*/
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private TUser user_id;

    /** 外键，关联商家表的id*/
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "business_id")
    private Business business;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public TUser getUser_id() {
        return user_id;
    }

    public void setUser_id(TUser user_id) {
        this.user_id = user_id;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

}
