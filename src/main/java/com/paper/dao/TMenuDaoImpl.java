package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.TMenu;
import org.springframework.stereotype.Repository;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/10 15:19
 **/
@Repository("tMenuDao")
public class TMenuDaoImpl extends BaseDaoImpl<TMenu> implements TMenuDao{
}
