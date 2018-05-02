package com.paper.controller.business;

import com.paper.controller.base.BaseListController;
import com.paper.data.BusinessData;
import com.paper.entity.Business;
import com.paper.service.BusinessService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.*;

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


    @RequestMapping("/Page")
    public String page() {
        return "business/business_manager";
    }


    @RequestMapping("/List")
    public @ResponseBody
    Map<String, Object> list() {
        List<BusinessData> data = new ArrayList<BusinessData>();

        list = businessService.findAllSQL("select * from business");
        if (list != null) {
            for (Business business : list) {
                data.add(new BusinessData(business));
            }
        }
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("rows", data);
        return result;
    }

    @RequestMapping("/Add")
    public String add() {
        return "business/business_add";
    }

    @RequestMapping("/Save")
    public @ResponseBody
    Map<String, Object> save(String businessName, String contact, String telephone, String address) {
        Map<String, Object> result = new HashMap<String, Object>();

        /* 校验商家名是否已存在,如存在，则保存失败*/
        Business business = businessService.findBySQL("select * from business where name = '" + businessName + "'", true);
        if (business != null) {
            //已存在，保存失败
            result.put("msg", "商家名已被占用，请更换一个");
            return result;
        }

        try {
            business = new Business();
            business.setName(businessName);
            business.setContact(contact);
            business.setTelephone(telephone);
            business.setAddress(address);
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            business.setDate(format.format(new Date()));

            businessService.save(business);
            result.put("msg", "保存成功");
            result.put("code",200);
            return result;
        } catch (Exception e) {
            e.printStackTrace();

            result.put("msg", "保存出错！");
            return result;
        }
    }

    @RequestMapping("/Delete")
    public @ResponseBody
    Map<String, Object> delete(Integer id){
        businessService.delete(id);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("code", 100);
        return result;
    }
}
