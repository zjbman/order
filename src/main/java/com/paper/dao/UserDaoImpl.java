package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.User;
import org.springframework.stereotype.Repository;

@Repository("userDao")
public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao{
}
