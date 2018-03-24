package com.paper.service;

import com.paper.dao.AccountDao;
import com.paper.entity.Account;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zjbman
 * @Description
 * @date 2018/3/24 11:12
 **/
@Service("accountService")
public class AccountServiceImpl extends BaseServiceImpl<Account> implements AccountService{
   private AccountDao accountDao;

   @Resource(name = "accountDao")
   public void setAccountDao(AccountDao accountDao){
       this.setBaseDao(accountDao);
       this.accountDao = accountDao;
   }
}
