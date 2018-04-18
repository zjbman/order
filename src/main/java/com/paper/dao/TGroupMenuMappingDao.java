package com.paper.dao;

import com.paper.dao.base.BaseDao;
import com.paper.entity.TGroupMenuMapping;

import java.util.List;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/10 15:20
 **/
public interface TGroupMenuMappingDao extends BaseDao<TGroupMenuMapping>{

    /** 通过userId获取group_menu_mapping的记录集合*/
    List<TGroupMenuMapping> getGroupMenuMappingListByUserId(Integer userId);
}
