package com.paper.service;

import com.paper.dao.BusinessDao;
import com.paper.entity.Business;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/22 17:41
 **/
@Service("businessService")
public class BusinessServiceImpl extends BaseServiceImpl<Business> implements BusinessService{
    private BusinessDao businessDao;

    @Resource(name = "businessDao")
    public void setBusinessDao(BusinessDao businessDao){
        this.businessDao = businessDao;
        super.setBaseDao(businessDao);
    }
}
