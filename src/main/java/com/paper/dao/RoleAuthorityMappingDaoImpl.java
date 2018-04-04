package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.Account;
import com.paper.entity.RoleAuthorityMapping;
import org.springframework.stereotype.Repository;

/**
 * @author zjbman
 * @Description
 * @date 2018/3/24 11:11
 **/
@Repository("roleAuthorityMappingDao")
public class RoleAuthorityMappingDaoImpl extends BaseDaoImpl<RoleAuthorityMapping> implements RoleAuthorityMappingDao{

}
