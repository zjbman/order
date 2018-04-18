package com.paper.service;

import com.paper.dao.TGroupDao;
import com.paper.entity.TGroup;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/10 15:24
 **/
@Service("tGroupService")
public class TGroupServiceImpl extends BaseServiceImpl<TGroup> implements TGroupService{
    private TGroupDao tGroupDao;

    @Resource(name = "tGroupDao")
    public void settGroupDao(TGroupDao tGroupDao){
        this.tGroupDao = tGroupDao;
        super.setBaseDao(tGroupDao);
    }
}
