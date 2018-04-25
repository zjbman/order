package com.paper.dao.base;

import com.paper.util.Page;

import java.util.List;

/**
 * @author zjbman
 * @Description 这是dao的基类,包含增删改查等对数据表操作的基本方法
 *              它还是一个泛型类,传入的是对应数据表的实体类
 * @date 2018/3/24 11:09
 **/
public interface BaseDao<T> {

    T findById(Integer id);

    /** 第二个参数是 ，是否查询最新的数据*/
    T findBySQL(String sql,Boolean isNewest);

    List<T> findAllSQL(String sql);

    /** 查询所有的数据，但是返回的是Object类型*/
    List<Object> findByObject(String sql);

    void delete(T t);

    void delete(Integer id);

    void deleteBySql(String sql);

    void save(T t) throws Exception;

    void saveOrUpdate(T t) throws Exception;

    void update(T t);

    /** 用sql分页查询*/
    Page<Object[]> findByPageSQL(final Page<Object[]> page, String[] fields, String fromSql);

    /** 用sql分页查询*/
    Page<T> findByPage(final Page<T> page, String sql);

    /** 总共页数*/
    long getTotalCounts(String sql);

    /** 列表分页*/
    List<T> getPagedDataBySQL(Integer start, Integer limit, String sql);

    /** 执行自定义的sql语句，注意是除了查询以外的sql语句*/
    void executeSQL(String sql);
}
