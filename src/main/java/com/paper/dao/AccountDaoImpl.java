package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.Account;
import org.springframework.stereotype.Repository;

/**
 * @author zjbman
 * @Description
 * @date 2018/3/24 11:11
 **/
@Repository("accountDao")
public class AccountDaoImpl extends BaseDaoImpl<Account> implements AccountDao{

}
