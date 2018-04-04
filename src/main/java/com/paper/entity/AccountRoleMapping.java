package com.paper.entity;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * @author zjbman
 * @Description 账号-角色对应表对应的实体类
 * @date 2018/3/24 10:59
 **/
@Entity
@Table(name = "account_role_mapping")
public class AccountRoleMapping {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id",unique = true,nullable = false)
    private Integer id;

    @Column(name = "account_id")
    private Integer accountId;

    @Column(name = "role_id")
    private Integer roleId;

    @Column(name = "account_name")
    private String accountName;

    @Column(name = "role_name")
    private String roleName;

    public AccountRoleMapping() {
    }

    public AccountRoleMapping(Integer id, Integer accountId,
                              Integer roleId, String accountName,
                              String roleName) {
        this.id = id;
        this.accountId = accountId;
        this.roleId = roleId;
        this.accountName = accountName;
        this.roleName = roleName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public String toString() {
        return "AccountRoleMapping{" +
                "id=" + id +
                ", accountId=" + accountId +
                ", roleId=" + roleId +
                ", accountName='" + accountName + '\'' +
                ", roleName='" + roleName + '\'' +
                '}';
    }
}
