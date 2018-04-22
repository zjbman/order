package com.paper.service;

import com.paper.dao.OrderDao;
import com.paper.entity.Order;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/22 17:46
 **/
@Service("orderService")
public class OrderServiceImpl extends BaseServiceImpl<Order> implements OrderService{
    private OrderDao orderDao;

    @Resource(name = "orderDao")
    public void setOrderDao(OrderDao orderDao){
        this.orderDao = orderDao;
        super.setBaseDao(orderDao);
    }
}
