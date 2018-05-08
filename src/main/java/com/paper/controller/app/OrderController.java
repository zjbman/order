package com.paper.controller.app;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.paper.controller.base.BaseListController;
import com.paper.data.app.OrderData;
import com.paper.entity.Business;
import com.paper.entity.Order;
import com.paper.entity.User;
import com.paper.service.OrderService;
import com.paper.service.UserService;
import com.paper.util.StringUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 客户端请求 订单信息
 */
@Controller
@RequestMapping("/order")
public class OrderController extends BaseListController<Order> {
    private Logger logger = Logger.getLogger(OrderController.class);

    @Autowired
    @Qualifier("orderService")
    private OrderService orderService;

    @Autowired
    @Qualifier("userService")
    private UserService userService;


    @RequestMapping("/List")
    public @ResponseBody
    Map<String, Object> list(String username) {
        logger.info("成功进入订单列表接口");

        List<OrderData> data = new ArrayList<OrderData>();
        Map<String, Object> result = new HashMap<String, Object>();

        if (StringUtil.isEmpty(username)) {
            result.put("code", -100);
            result.put("msg", data);
            return result;
        }

        User user = userService.findBySQL("select * from user where username = '" + username + "'", true);
        if (user == null) {
            result.put("code", -100);
            result.put("msg", data);
            return result;
        }

        list = orderService.findAllSQL("select * from q_order where user_id = " + user.getId());
        if (list == null || list.size() <= 0) {
            result.put("code", 101);
            result.put("msg", data);
            return result;
        }

        for (Order order : list) {
            data.add(new OrderData(order));
        }

        result.put("code", 200);
        result.put("msg", data);
        return result;
    }

    @RequestMapping("/Save")
    public @ResponseBody
    Map<String, Object> save(String username, String address, String telephone, String remark,
                             String goodsList, Double price) {
        logger.info("成功进入下单接口");
        Map<String, Object> result = new HashMap<String, Object>();

        if (StringUtil.isEmpty(username) || StringUtil.isEmpty(address) || StringUtil.isEmpty(telephone) ||
                StringUtil.isEmpty(goodsList) || price == null) {
            result.put("code", -100);
            result.put("msg", "下单失败!");
            return result;
        }

        JSONArray jsonArray = JSONArray.parseArray(goodsList);
        if (jsonArray == null || jsonArray.size() <= 0) {
            result.put("code", -100);
            result.put("msg", "下单失败!");
            return result;
        }

        User user = userService.findBySQL("select * from user where username = '" + username + "'", true);
        if (user == null) {
            result.put("code", -100);
            result.put("msg", "下单失败!");
            return result;
        }

        for (int i = 0; i < jsonArray.size(); i++) {
            JSONObject jsonObject = (JSONObject) jsonArray.get(i);
            Integer businessId = jsonObject.getInteger("businessId");


            Order order = new Order();
            order.setUser(user);
            order.setAddress(address);
            Business business = new Business();
            business.setId(businessId);
            order.setBusiness(business);
            order.setPrice(price);
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            order.setDate(format.format(new Date()));
            order.setRemark(remark);
            order.setTelephone(telephone);
            order.setGoods(jsonArray.toString());

            try {
                orderService.save(order);

            /* 同时从用户余额中减去花费的金钱*/
                user.setMoney(user.getMoney() - price);
                userService.update(user);

            } catch (Exception e) {
                e.printStackTrace();

                result.put("code", -100);
                result.put("msg", "下单失败!");
                return result;
            }
        }
        result.put("code", 200);
        result.put("msg", "成功下单!");
        return result;
    }
}
