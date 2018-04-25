package com.paper.entity;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/10 15:08
 **/
@Entity
@Table(name = "t_group_menu_mapping")
public class TGroupMenuMapping implements java.io.Serializable{
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id",unique = true,nullable = false)
    private Integer id;

    @Column(name = "group_id")
    private Integer groupId;

    /** 通过外键的关系，直接获取menu_id所关联的TMenu对象*/
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "menu_id")
    private TMenu tMenu;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public TMenu getTMenu() {
        return tMenu;
    }

    public void setTMenu(TMenu tMenu) {
        this.tMenu = tMenu;
    }

    @Override
    public String toString() {
        return "TGroupMenuMapping{" +
                "id=" + id +
                ", groupId=" + groupId +
                ", tMenu=" + tMenu +
                '}';
    }
}
