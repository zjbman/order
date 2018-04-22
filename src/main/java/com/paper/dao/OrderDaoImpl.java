package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.Order;
import org.springframework.stereotype.Repository;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/22 17:39
 **/
@Repository("orderDao")
public class OrderDaoImpl extends BaseDaoImpl<Order> implements OrderDao{
}
