package com.paper.controller;

import com.paper.controller.base.BaseListController;
import com.paper.data.BusinessData;
//import com.paper.entity.Business;
//import com.paper.service.BusinessService;
import com.paper.entity.Business;
import com.paper.service.BusinessService;
import com.paper.service.base.BaseService;
import org.apache.log4j.Logger;
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
@Controller
@RequestMapping("/businessManager")
public class BusinessManagerController extends BaseListController<Business> {

    private static final Logger log = Logger.getLogger(BusinessManagerController.class);

    @Autowired
    @Qualifier("businessService")
    private BusinessService businessService;


//        @RequestMapping("/List")
//    public @ResponseBody
//    Map<String,Object> List(){
//        List<BusinessData> data = new ArrayList<BusinessData>();
//
//        list = businessService.findAll("select * from business");
//        if (list != null){
//            for (Business business : list){
//                data.add(new BusinessData(business));
//            }
//        }
//        Map<String, Object> result = new HashMap<String, Object>() ;
//        result.put("rows", data);
//        return result;
//
//    }


    @RequestMapping("/List")
    public String List() {
        List<BusinessData> data = new ArrayList<BusinessData>();

        BaseService s = businessService;

        list = businessService.findAllSQL("select * from business");
        if (list != null){
            for (Business business : list){
                data.add(new BusinessData(business));
            }
        }
        return "business_manager";
    }
}
