package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.Account;
import com.paper.entity.AccountRoleMapping;
import org.springframework.stereotype.Repository;

/**
 * @author zjbman
 * @Description
 * @date 2018/3/24 11:11
 **/
@Repository("accountRoleMappingDao")
public class AccountRoleMappingDaoImpl extends BaseDaoImpl<AccountRoleMapping> implements AccountRoleMappingDao{

}
