package com.paper.service;

import com.paper.dao.AccountDao;
import com.paper.dao.AccountRoleMappingDao;
import com.paper.entity.Account;
import com.paper.entity.AccountRoleMapping;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zjbman
 * @Description
 * @date 2018/3/24 11:12
 **/
@Service("accountRoleMappingService")
public class AccountRoleMappingServiceImpl extends BaseServiceImpl<AccountRoleMapping> implements AccountRoleMappingService{
   private AccountRoleMappingDao accountRoleMappingDao;

   @Resource(name = "accountRoleMappingDao")
   public void setAccountDao(AccountRoleMappingDao accountRoleMappingDao){
       this.setBaseDao(accountRoleMappingDao);
       this.accountRoleMappingDao = accountRoleMappingDao;
   }
}
