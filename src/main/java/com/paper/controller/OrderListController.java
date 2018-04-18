package com.paper.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/18 9:43
 **/
@Controller()
@RequestMapping("/orderList")
public class OrderListController {

    @RequestMapping("/List")
    public String List(){
        return "order_list";
    }
}
