package com.paper.service;

import com.paper.entity.TGroupMenuMapping;
import com.paper.service.base.BaseService;

import java.util.List;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/10 15:28
 **/
public interface TGroupMenuMappingService extends BaseService<TGroupMenuMapping>{

    /** 通过userId获取group_menu_mapping的记录集合*/
    List<TGroupMenuMapping> getGroupMenuMappingListByUserId(Integer userId);
}
