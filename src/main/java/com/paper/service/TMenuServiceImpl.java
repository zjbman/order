package com.paper.service;

import com.paper.dao.TMenuDao;
import com.paper.entity.TMenu;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/10 15:32
 **/
@Service("tMenuService")
public class TMenuServiceImpl extends BaseServiceImpl<TMenu> implements TMenuService{
    private TMenuDao tMenuDao;

    @Resource(name = "tMenuDao")
    public void settMenuDao(TMenuDao tMenuDao){
        this.tMenuDao = tMenuDao;
        super.setBaseDao(tMenuDao);
    }
}
