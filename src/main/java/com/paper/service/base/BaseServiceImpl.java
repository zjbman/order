package com.paper.service.base;

import com.paper.dao.base.BaseDao;
import com.paper.util.Page;

import java.util.List;

/**
 * @author zjbman
 * @Description Service基类的实现类
 * @date 2018/3/24 11:12
 **/
public class BaseServiceImpl<T> implements BaseService<T> {
    private BaseDao<T> baseDao;

    public void setBaseDao(BaseDao<T> baseDao){
        this.baseDao = baseDao;
    }


    public T findById(Integer id) {
        return baseDao.findById(id);
    }

    public T findBySQL(String sql, Boolean isNewest) {
        return baseDao.findBySQL(sql,isNewest);
    }

    public List<T> findAllSQL(String sql) {
        return baseDao.findAllSQL(sql);
    }

    public List<Object> findByObject(String sql) {
        return baseDao.findByObject(sql);
    }

    public void delete(T t) {
        baseDao.delete(t);
    }

    public void delete(Integer id) {
        baseDao.delete(id);
    }

    public void deleteBySql(String sql) {
        baseDao.deleteBySql(sql);
    }

    public void save(T t) throws Exception {
        baseDao.save(t);
    }

    public void saveOrUpdate(T t) throws Exception {
        baseDao.saveOrUpdate(t);
    }

    public void update(T t) {
        baseDao.update(t);
    }

    public Page<Object[]> findByPageSQL(Page<Object[]> page, String[] fields, String fromSql) {
        return baseDao.findByPageSQL(page,fields,fromSql);
    }

    public Page<T> findByPage(Page<T> page, String sql) {
        return baseDao.findByPage(page,sql);
    }

    public long getTotalCounts(String sql) {
        return baseDao.getTotalCounts(sql);
    }

    public List<T> getPagedDataBySQL(Integer start, Integer limit, String sql) {
        return baseDao.getPagedDataBySQL(start,limit,sql);
    }

    public void executeSQL(String sql) {
        baseDao.executeSQL(sql);
    }
}
