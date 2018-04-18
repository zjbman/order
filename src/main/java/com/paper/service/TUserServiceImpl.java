package com.paper.service;

import com.paper.dao.TUserDao;
import com.paper.entity.TUser;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/10 15:34
 **/
@Service("tUserService")
public class TUserServiceImpl extends BaseServiceImpl<TUser> implements TUserService{
    private TUserDao tUserDao;

    @Resource(name = "tUserDao")
    public void settUserDao(TUserDao tUserDao){
        this.tUserDao = tUserDao;
        super.setBaseDao(tUserDao);
    }
}
