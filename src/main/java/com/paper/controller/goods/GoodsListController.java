package com.paper.controller.goods;

import com.paper.controller.base.BaseListController;
import com.paper.data.GoodsData;
import com.paper.entity.Business;
import com.paper.entity.Goods;
import com.paper.service.GoodsService;
import com.paper.util.StringUtil;
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
@RequestMapping("/goods")
public class GoodsListController extends BaseListController<Goods> {

    private static final Logger log = Logger.getLogger(GoodsListController.class);

    /** 当前的商家Id*/
    private Integer businessId;

    @Autowired
    @Qualifier("goodsService")
    private GoodsService goodsService;

    @RequestMapping("/Page")
    public String page(Integer id) {
        businessId = id;
        return "goods_list";
    }

    @RequestMapping("/List")
    public @ResponseBody
    Map<String, Object> list() {
        List<GoodsData> data = new ArrayList<GoodsData>();

        if(businessId != null) {
            list = goodsService.findAllSQL("select * from goods where business_id = " + businessId);
            if (list != null) {
                for (Goods goods : list) {
                    data.add(new GoodsData(goods));
                }
            }
        }

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("rows", data);
        return result;
    }


    @RequestMapping("/Delete")
    public @ResponseBody
    Map<String, Object> delete(Integer id) {
        goodsService.delete(id);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("code", 100);
        return result;
    }


    @RequestMapping("/Find")
    public @ResponseBody
    List<GoodsData> find(Integer id) {
        List<GoodsData> data = new ArrayList<GoodsData>();

        Goods goods = goodsService.findById(id);
        data.add(new GoodsData(goods));

        return data;
    }


    //保存
    @RequestMapping(value = "/Save")
    public @ResponseBody
    Map<String, Object> save(Integer id, String name, String details, Double price) {
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Goods goods = new Goods();

            if (id != null) {
                //修改
                goods = goodsService.findById(id);
                goods.setUpdateDate(format.format(new Date()));

            } else {
                //新增
                goods.setDate(format.format(new Date()));
                goods.setUpdateDate(format.format(new Date()));
            }

            if(!StringUtil.isEmpty(name)) {
                goods.setName(name);
            }
            if(!StringUtil.isEmpty(details)){
                goods.setDetails(details);
            }
            if(price != null){
                goods.setPrice(price);
            }
            if(businessId != null) {
                Business business = new Business();
                business.setId(businessId);
                goods.setBusiness(business);
            }
            goodsService.saveOrUpdate(goods);

            Map<String, Object> result = new HashMap<String, Object>();
            result.put("code",200);
            return result;
        } catch (Exception e) {
            e.printStackTrace();

            Map<String, Object> result = new HashMap<String, Object>();
            result.put("code",102);
            return result;
        }

    }
}
