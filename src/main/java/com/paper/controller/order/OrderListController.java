package com.paper.controller.order;

import com.paper.controller.base.BaseListController;
import com.paper.data.OrderData;
import com.paper.entity.Order;
import com.paper.service.GoodsService;
import com.paper.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/18 9:43
 **/
@Controller()
@RequestMapping("/orderList")
public class OrderListController extends BaseListController<Order>{

    @Autowired
    @Qualifier("orderService")
    private OrderService orderService;

    @Autowired
    @Qualifier("goodsService")
    private GoodsService goodsService;

    @RequestMapping("/Page")
    public String page(){
        return "order/order_list";
    }

    @RequestMapping("/List")
    public @ResponseBody
    Map<String,Object> list(){
        List<OrderData> data = new ArrayList<OrderData>();

        list = orderService.findAllSQL("select * from `order`");

        if(list != null) {
            for (Order order : list) {
                data.add(new OrderData(order, goodsService));
            }
        }

        Map<String,Object> result = new HashMap<String,Object>();
        result.put("rows",data);
        return result;
    }
}
