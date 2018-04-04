package com.paper.service;

import com.paper.dao.RoleAuthorityMappingDao;
import com.paper.entity.RoleAuthorityMapping;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zjbman
 * @Description
 * @date 2018/3/30 15:55
 **/
@Service("roleAuthorityMappingService")
public class RoleAuthorityMappingServiceImpl extends BaseServiceImpl<RoleAuthorityMapping> implements RoleAuthorityMappingService {
    private RoleAuthorityMappingDao dao;

    @Resource(name = "roleAuthorityMappingDao")
    public void setRoleAuthorityMappingDao(RoleAuthorityMappingDao dao){
        this.dao = dao;
        super.setBaseDao(dao);
    }
}
