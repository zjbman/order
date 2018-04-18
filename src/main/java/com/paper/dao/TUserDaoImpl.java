package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.TUser;
import org.springframework.stereotype.Repository;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/10 15:14
 **/
@Repository("tUserDao")
public class TUserDaoImpl extends BaseDaoImpl<TUser> implements TUserDao {
}
