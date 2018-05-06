package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.Cart;
import org.springframework.stereotype.Repository;

@Repository("cartDao")
public class CartDaoImpl extends BaseDaoImpl<Cart> implements CartDao{
}
