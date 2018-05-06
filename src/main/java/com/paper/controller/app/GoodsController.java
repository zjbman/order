package com.paper.controller.app;

import com.paper.controller.base.BaseListController;
import com.paper.data.app.GoodsData;
import com.paper.entity.Goods;
import com.paper.service.GoodsService;
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
 * 客户端请求 商品信息
 */
@Controller
@RequestMapping("/goods")
public class GoodsController extends BaseListController<Goods> {
    private Logger logger = Logger.getLogger(GoodsController.class);

    @Autowired
    @Qualifier("goodsService")
    private GoodsService goodsService;


    @RequestMapping("/Get")
    public @ResponseBody
    Map<String,Object> find(Integer id){
        logger.info("成功进入商品接口 id === " + id);
        List<GoodsData> data = new ArrayList<GoodsData>();

        if(id != null){
            list = goodsService.findAllSQL("select * from goods where business_id = " + id);
            for(Goods goods : list){
                data.add(new GoodsData(goods));
            }
        }

        Map<String,Object> result = new HashMap<String,Object>();
        result.put("code",200);
        result.put("msg",data);
        return result;
    }
}
