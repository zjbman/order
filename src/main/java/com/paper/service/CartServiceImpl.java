package com.paper.service;

import com.paper.dao.CartDao;
import com.paper.entity.Cart;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("cartService")
public class CartServiceImpl extends BaseServiceImpl<Cart> implements CartService{
    private CartDao cartDao;

    @Resource(name = "cartDao")
    public void setCartDao(CartDao cartDao){
        this.cartDao = cartDao;
        super.setBaseDao(cartDao);
    }
}
