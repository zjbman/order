package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.TGroupMenuMapping;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/10 15:21
 **/
@Repository("tGroupMenuMappingDao")
public class TGroupMenuMappingDaoImpl extends BaseDaoImpl<TGroupMenuMapping> implements TGroupMenuMappingDao {

    public List<TGroupMenuMapping> getGroupMenuMappingListByUserId(Integer userId) {
        List<TGroupMenuMapping> tGroupMenuMappingList = new ArrayList();
        clear(getCurrentSession());
        Session session = getCurrentSession();
        Transaction transaction = session.beginTransaction();
        try {
            String sql = "select g.* from t_group_menu_mapping g ,t_user u where g.group_id = u.group_id and u.id = " + userId;
            List<TGroupMenuMapping> list = session.createSQLQuery(sql).addEntity(TGroupMenuMapping.class).list();
            for (int i = 0; i < list.size(); i++) {
                tGroupMenuMappingList.add(list.get(i));
            }

            transaction.commit();
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
        }
        System.out.println("tGroupMenuMappingList ===== " + tGroupMenuMappingList);
        return tGroupMenuMappingList;
    }

}
