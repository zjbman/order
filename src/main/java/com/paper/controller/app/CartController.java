package com.paper.controller.app;

import com.paper.controller.base.BaseListController;
import com.paper.data.app.CartData;
import com.paper.entity.Business;
import com.paper.entity.Cart;
import com.paper.entity.Goods;
import com.paper.entity.User;
import com.paper.service.CartService;
import com.paper.service.UserService;
import com.paper.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 客户端请求 购物车信息
 */
@Controller
@RequestMapping("/cart")
public class CartController extends BaseListController<Cart> {

    @Autowired
    @Qualifier("cartService")
    private CartService cartService;

    @Autowired
    @Qualifier("userService")
    private UserService userService;

    @RequestMapping("/Save")
    public @ResponseBody
    Map<String, Object> save(String username, Integer businessId, Integer goodsId, Integer goodsNumber) {
        Map<String, Object> result = new HashMap<String, Object>();

        if (StringUtil.isEmpty(username) || businessId == null || goodsId == null || goodsNumber == null) {
            result.put("code", -100);
            result.put("msg", "添加购物车失败!");
            return result;
        }

        User user = userService.findBySQL("select * from user where username = '" + username + "'", true);
        if (user == null) {
            result.put("code", -100);
            result.put("msg", "添加购物车失败!");
            return result;
        }

        Cart cart = new Cart();
        cart.setUser(user);
        Business business = new Business();
        business.setId(businessId);
        cart.setBusiness(business);
        Goods goods = new Goods();
        goods.setId(goodsId);
        cart.setGoods(goods);
        cart.setGoodsNumber(goodsNumber);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        cart.setDate(format.format(new Date()));

        try {
            cartService.save(cart);

            result.put("code", 200);
            result.put("msg", "添加购物车成功!");
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            result.put("code", -100);
            result.put("msg", "添加购物车失败!");
            return result;
        }
    }

    @RequestMapping("/List")
    public @ResponseBody
    Map<String, Object> list(String username) {
        List<CartData> data = new ArrayList<CartData>();

        Map<String, Object> result = new HashMap<String, Object>();
        if (!StringUtil.isEmpty(username)) {

            User user = userService.findBySQL("select * from user where username = '" + username + "'", true);
            if (user == null) {
                result.put("code", -100);
                result.put("msg", data);
                return result;
            }

            list = cartService.findAllSQL("select * from cart where user_id = " + user.getId());
            if (list == null) {
                result.put("code", -100);
                result.put("msg", data);
                return result;
            }

            for (Cart cart : list) {
                data.add(new CartData(cart));
            }

            result.put("code", 200);
            result.put("msg", data);
            return result;
        } else {
            result.put("code", -100);
            result.put("msg", data);
            return result;
        }
    }

    @RequestMapping("/Delete")
    public @ResponseBody
    Map<String,Object> delete(String username,Integer businessId,Integer goodsId){
        Map<String, Object> result = new HashMap<String, Object>();

        if (StringUtil.isEmpty(username) || businessId == null || goodsId == null) {
            result.put("code", -100);
            result.put("msg", "删除购物车中的商品失败!");
            return result;
        }
        User user = userService.findBySQL("select * from user where username = '" + username + "'", true);
        if (user == null) {
            result.put("code", -100);
            result.put("msg", "删除购物车中的商品失败!");
            return result;
        }

        String sql = "select * from cart where user_id = " + user.getId() +
                " and business_id = " + businessId + " and goods_id = " + goodsId;
        Cart cart = cartService.findBySQL(sql,true);
        if(cart == null){
            result.put("code", -100);
            result.put("msg", "删除购物车中的商品失败!");
            return result;
        }

        cartService.delete(cart.getId());

        result.put("code", 200);
        result.put("msg", "删除购物车中的商品成功!");
        return result;
    }
}
