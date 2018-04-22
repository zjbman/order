package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.Goods;
import org.springframework.stereotype.Repository;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/22 17:38
 **/
@Repository("goodsDao")
public class GoodsDaoImpl extends BaseDaoImpl<Goods> implements GoodsDao{
}
