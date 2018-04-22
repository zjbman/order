package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.Business;
import org.springframework.stereotype.Repository;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/22 17:35
 **/
@Repository("businessDao")
public class BusinessDaoImpl extends BaseDaoImpl<Business> implements BusinessDao{
}
