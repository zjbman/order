package com.paper.controller.app;

import com.paper.controller.base.BaseListController;
import com.paper.data.app.BusineesData;
import com.paper.entity.Business;
import com.paper.service.BusinessService;
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
 * 客户端请求 商家信息
 */
@Controller
@RequestMapping("/business")
public class BusinessController extends BaseListController<Business> {
    private Logger logger = Logger.getLogger(BusinessController.class);

    @Autowired
    @Qualifier("businessService")
    private BusinessService businessService;

    @RequestMapping("/List")
    public @ResponseBody
    Map<String, Object> list(Integer index) {
        logger.info("index === " + index);
        List<BusineesData> data = new ArrayList<BusineesData>();

        if (index == null){
            index = 0;
        }

        switch (index) {
            case 0:
                list = businessService.findAllSQL("select * from business limit 7");
                break;
            case 1:
                list = businessService.findAllSQL("select * from business limit 7,7");
                break;
            case 2:
                list = businessService.findAllSQL("select * from business limit 14,999");
                break;
            default:
                list = businessService.findAllSQL("select * from business limit 7");
                break;
        }

        for (Business business : list) {
            data.add(new BusineesData(business));
        }

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("code", 200);
        result.put("msg", data);
        return result;
    }
}
