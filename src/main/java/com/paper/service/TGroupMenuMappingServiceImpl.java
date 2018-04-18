package com.paper.service;

import com.paper.dao.TGroupMenuMappingDao;
import com.paper.entity.TGroupMenuMapping;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/10 15:29
 **/
@Service("tGroupMenuMappingService")
public class TGroupMenuMappingServiceImpl extends BaseServiceImpl<TGroupMenuMapping> implements TGroupMenuMappingService{
    private TGroupMenuMappingDao tGroupMenuMappingDao;

    @Resource(name = "tGroupMenuMappingDao")
    public void settGroupMenuMappingDao(TGroupMenuMappingDao tGroupMenuMappingDao){
        this.tGroupMenuMappingDao = tGroupMenuMappingDao;
        super.setBaseDao(tGroupMenuMappingDao);
    }

    public List<TGroupMenuMapping> getGroupMenuMappingListByUserId(Integer userId) {
        return tGroupMenuMappingDao.getGroupMenuMappingListByUserId(userId);
    }
}
