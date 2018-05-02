package com.paper.service;

import com.paper.dao.UserDao;
import com.paper.entity.User;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service("/userService")
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService{
    private UserDao userDao;

    @Resource(name = "userDao")
    public void setUserDao(UserDao userDao){
        this.userDao = userDao;
        super.setBaseDao(userDao);
    }
}
