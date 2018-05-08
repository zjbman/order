package com.paper.controller.order;

import com.paper.controller.base.BaseListController;
import com.paper.data.OrderIncomeData;
import com.paper.entity.Order;
import com.paper.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/18 9:43
 **/
@Controller()
@RequestMapping("/orderIncome")
public class OrderIncomeController extends BaseListController<Order>{

    @Autowired
    @Qualifier("orderService")
    private OrderService orderService;

    @RequestMapping("/Page")
    public String page(){
        return "order/order_income";
    }

    @RequestMapping("/List")
    public @ResponseBody
    Map<String,Object> list(){
        List<OrderIncomeData> data = new ArrayList<OrderIncomeData>();

        list = orderService.findAllSQL("select * from q_order");

        Map<String,OrderIncomeData> orderIncomeDataMap = new HashMap<String, OrderIncomeData>();

        if(list != null) {
            for (Order order : list) {
                String businessName = order.getBusiness().getName();
                OrderIncomeData orderIncomeData;
                if(orderIncomeDataMap.containsKey(businessName)){
                    //已经包含该key
                    orderIncomeData = orderIncomeDataMap.get(businessName);
                    orderIncomeData.setOrderIncome(orderIncomeData.getOrderIncome() + order.getPrice());
                    orderIncomeData.setOrderNumber(orderIncomeData.getOrderNumber() + 1);
                }else{
                    //没有包含该key
                    orderIncomeData = new OrderIncomeData();
                    orderIncomeData.setBusinessName(businessName);
                    orderIncomeData.setOrderIncome(order.getPrice());
                    orderIncomeData.setOrderNumber(1);

                    orderIncomeDataMap.put(businessName,orderIncomeData);
                }
            }

            Set<String> keySet = orderIncomeDataMap.keySet();
            for(String key : keySet){
                data.add(orderIncomeDataMap.get(key));
            }
        }
        Map<String,Object> result = new HashMap<String,Object>();
        result.put("rows",data);
        return result;
    }
}
