package com.paper.service;

import com.paper.dao.RoleDao;
import com.paper.entity.Role;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zjbman
 * @Description
 * @date 2018/3/30 15:57
 **/
@Service("roleService")
public class RoleServiceImpl extends BaseServiceImpl<Role> implements RoleService {
    private RoleDao dao;

    @Resource(name = "roleDao")
    public void setRoleDao(RoleDao dao){
        this.dao = dao;
        super.setBaseDao(dao);
    }
}
