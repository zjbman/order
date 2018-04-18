package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.TGroup;
import org.springframework.stereotype.Repository;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/10 15:17
 **/
@Repository("tGroupDao")
public class TGroupDaoImpl extends BaseDaoImpl<TGroup> implements TGroupDao {
}
