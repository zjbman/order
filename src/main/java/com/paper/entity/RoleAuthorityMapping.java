package com.paper.entity;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * @author zjbman
 * @Description 角色-权限对应表对应的实体类
 * @date 2018/3/24 11:03
 **/
@Entity
@Table(name = "role_authority_mapping")
public class RoleAuthorityMapping {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "role_id")
    private Integer roleId;

    @Column(name = "authority_id")
    private Integer authorityId;

    @Column(name = "role_name")
    private String roleName;

    @Column(name = "authority_name")
    private String authorityName;

    public RoleAuthorityMapping() {
    }

    public RoleAuthorityMapping(Integer id, Integer roleId,
                                Integer authorityId, String roleName,
                                String authorityName) {
        this.id = id;
        this.roleId = roleId;
        this.authorityId = authorityId;
        this.roleName = roleName;
        this.authorityName = authorityName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getAuthorityId() {
        return authorityId;
    }

    public void setAuthorityId(Integer authorityId) {
        this.authorityId = authorityId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getAuthorityName() {
        return authorityName;
    }

    public void setAuthorityName(String authorityName) {
        this.authorityName = authorityName;
    }

    @Override
    public String toString() {
        return "RoleAuthorityMapping{" +
                "id=" + id +
                ", roleId=" + roleId +
                ", authorityId=" + authorityId +
                ", roleName='" + roleName + '\'' +
                ", authorityName='" + authorityName + '\'' +
                '}';
    }
}
