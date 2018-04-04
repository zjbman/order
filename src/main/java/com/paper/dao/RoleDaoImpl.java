package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.Account;
import com.paper.entity.Role;
import org.springframework.stereotype.Repository;

/**
 * @author zjbman
 * @Description
 * @date 2018/3/24 11:11
 **/
@Repository("roleDao")
public class RoleDaoImpl extends BaseDaoImpl<Role> implements RoleDao{

}
