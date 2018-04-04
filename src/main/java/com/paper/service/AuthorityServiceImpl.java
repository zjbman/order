package com.paper.service;

import com.paper.dao.AuthorityDao;
import com.paper.entity.Authority;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zjbman
 * @Description
 * @date 2018/3/30 15:49
 **/
@Service("authorityService")
public class AuthorityServiceImpl extends BaseServiceImpl<Authority> implements AuthorityService {
    private AuthorityDao dao;

    @Resource(name = "authorityDao")
    public void setAuthorityDao(AuthorityDao dao){
        super.setBaseDao(dao);
        this.dao = dao;
    }
}
