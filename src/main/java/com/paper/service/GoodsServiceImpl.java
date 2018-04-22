package com.paper.service;

import com.paper.dao.GoodsDao;
import com.paper.entity.Goods;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/22 17:45
 **/
@Service("goodsService")
public class GoodsServiceImpl extends BaseServiceImpl<Goods> implements GoodsService{
    private GoodsDao goodsDao;

    @Resource(name = "goodsDao")
    public void setGoodsDao(GoodsDao goodsDao){
        this.goodsDao = goodsDao;
        super.setBaseDao(goodsDao);
    }
}
