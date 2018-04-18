package com.paper.dao.base;

import com.paper.util.Page;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.ParameterizedType;
import java.math.BigInteger;
import java.util.List;

/**
 * @author zjbman
 * @Description BaseDao的实现类
 * @date 2018/3/24 11:11
 **/
public class BaseDaoImpl<T> implements BaseDao<T> {
    @Autowired
    SessionFactory sessionFactory;

    private Session session;
    private Class<T> entityClass;

    public BaseDaoImpl() {
        super();
        entityClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }

    public Session getCurrentSession() {
        return sessionFactory.getCurrentSession();
    }

    /**
     * 清理session
     *
     * @param session
     */
    private void clear(Session session) {
        if (session != null) {
            session.clear();
        }
    }

    @SuppressWarnings("unchecked")
    public T findById(Integer id) {
        T instance = null;
        try {
            session = getCurrentSession();
            instance = (T) session.get(entityClass, id);
        } catch (Exception e) {
            System.out.println("查询一条记录捕捉异常 : " + e.getCause().getMessage());
            clear(session);
        }
        return instance;
    }

    /**
     * @param sql
     * @param isNewest 是否找到List中最新的数据
     * @return
     */
    public T findBySQL(String sql, Boolean isNewest) {
        List<T> list = null;
        try {
            session = getCurrentSession();
            list = session.createSQLQuery(sql).addEntity(entityClass).list();
        } catch (Exception e) {
            System.out.println("查询一条记录捕捉异常 : " + e.getCause().getMessage());
            clear(session);
        }
        if (!isNewest) {
            return list.size() == 0 ? null : list.get(0);
        }
        return list.size() == 0 ? null : list.get(list.size() - 1);
    }

    @SuppressWarnings("unchecked")
    public List<T> findAllSQL(String sql) {
        List<T> list = null;
        try {
            session = getCurrentSession();
            list = session.createSQLQuery(sql).addEntity(entityClass).list();
        } catch (Exception e) {
            System.out.println("查询所有记录捕捉异常 : " + e.getCause().getMessage());
            clear(session);
        }
        return list;
    }

    public List<Object> findByObject(String sql) {
        List<Object> list = null;
        try {
            session = getCurrentSession();
            list = session.createSQLQuery(sql).list();
        } catch (Exception e) {
            System.out.println("查询所有记录(Object)捕捉异常 : " + e.getCause().getMessage());
            clear(session);
        }
        return list;
    }

    public List<T> findAll(String sql) {
        List<T> list = null;
        try {
            session = getCurrentSession();
            list = session.createQuery(sql).list();
        } catch (Exception e) {
            System.out.println("捕捉异常 : " + e.getCause().getMessage());
            clear(session);
        }
        return list;
    }


    public void delete(T t) {
        try {
            session = getCurrentSession();
            session.delete(t);
        } catch (Exception re) {
            System.out.println("删除一条记录异常:" + re.getCause().getMessage());
            clear(session);
        }
    }

    public void delete(Integer id) {
        try {
            session = getCurrentSession();
            String sql = String.format("Delete FROM %s where id = %d", entityClass.getName(), id);
            session.createQuery(sql).executeUpdate();
        } catch (Exception e) {
            System.out.println("删除一条记录异常 : " + e.getCause().getMessage());
            clear(session);
        }
    }

    public void deleteBySql(String sql) {
        try {
            session = getCurrentSession();
            session.createQuery(sql).executeUpdate();
        } catch (Exception e) {
            System.out.println("删除一条记录异常 : " + e.getCause().getMessage());
            clear(session);
        }
    }

    @SuppressWarnings("unchecked")
    public T get(Integer id) {
        T t = null;
        try {
            session = getCurrentSession();
            t = (T) session.get(entityClass, id);
        } catch (Exception e) {
            System.out.println("查询一条记录异常:" + e.getCause().getMessage());
            clear(session);
        }
        return t;
    }

    public void save(T t) throws Exception {
        try {
            session = getCurrentSession();
            session.save(t);
        } catch (Exception e) {
            System.out.println("保存一条记录异常:" + e.getCause().getMessage());
            clear(session);
        }
    }

    public void saveOrUpdate(T t) throws Exception {
        try {
            session = getCurrentSession();
            session.saveOrUpdate(t);
        } catch (Exception e) {
            System.out.println("保存或更新一条记录异常 : " + e.getCause().getMessage());
            clear(session);
        }
    }

    public void update(T t) {
        try {
            session = getCurrentSession();
            session.update(t);
        } catch (Exception e) {
            System.out.println("更新一条记录异常 : " + e.getCause().getMessage());
            clear(session);
        }
    }

    /**
     * 用sql分页查询.
     *
     * @param page    分页参数.
     * @param fields  要查询的列名
     * @param fromSql 如："from t_product",
     *                "from t_product where a=b group by c"
     * @return
     */
    @SuppressWarnings("unchecked")
    public Page<Object[]> findByPageSQL(Page<Object[]> page, String[] fields, String fromSql) {
        if (page == null) {
            System.out.println("page不能为空");
            return null;
        }
        if (fields == null) {
            System.out.println("fields不能为空");
            return null;
        }
        if (fields.length < 1) {
            System.out.println("fields 不能为空");
            return null;
        }

        String countSql = "select count(id) cc " +
                (fromSql.indexOf("order by") > 0
                        ? fromSql.substring(0, fromSql.indexOf("order by"))
                        : fromSql);
//		if (countSql.contains("group")) countSql = "select case when sum(cc)>0 then sum(cc) else 0 end from (" +countSql+ ") temp";

        try {
            session = getCurrentSession();
            List<BigInteger> totalCount = session.createSQLQuery(countSql).list();
            page.setTotalCount(totalCount.size());
            System.out.println("totalCount:[" + totalCount.size() + "条记录] " + countSql);

            StringBuilder sb = new StringBuilder();
            // 查询的列
            sb.append("select");
            int i = 0;
            for (i = 0; i < fields.length - 1; i++) {
                sb.append(" ")
                        .append(fields[i])
                        .append(",");
            }
            sb.append(" ")
                    .append(fields[i])
                    .append(" ");

            // from语句
            sb.append(fromSql);

            //	排序
            if (!StringUtils.isEmpty(page.getOrder())) {

                try {
                    String[] orders = StringUtils.split(page.getOrder(), ',');
                    String[] orderBys = StringUtils.split(page.getOrderBy(), ',');

                    for (i = 0; i < orders.length && i < orderBys.length; i++) {
                        fromSql = sb.toString();
                        if (fromSql.toUpperCase().contains("ORDER") && fromSql.toUpperCase().contains("BY")) {
                            sb.append(",");
                        } else {
                            sb.append(" order by ");
                        }
                        sb
                                .append(orderBys[i])
                                .append(" ")
                                .append(orders[i]);
                    }
                } catch (Exception e) {
                    sb = new StringBuilder(fromSql);
                    System.out.println("BaseDaoImpl.findByPageSQL:" + e);
                }
            }
            // 分页
            sb.append(" limit ").append(page.getFirst()).append(",").append(page.getPageSize());

            fromSql = sb.toString();

            List<Object[]> result = session.createSQLQuery(fromSql).list();
            page.setResult(result);
            System.out.println("PageSize:[" + result.size() + "条结果] " + fromSql);
        } catch (Exception e) {
            System.out.println("分页捕捉异常 ：" + e.getCause().getMessage());
            clear(session);
        }
        return page;
    }

    /**
     * 用sql分页查询.
     *
     * @param page 分页参数.
     * @return 分页查询结果.附带结果列表及所有查询时的参�?
     */
    @SuppressWarnings("unchecked")
    public Page<T> findByPage(Page<T> page, String sql) {
        try {
            session = getCurrentSession();
            if (page == null) {
                System.out.println("page不能为空");
            }

            String countHql = "select count(id) " + sql;
            long totalCount = (Long) session.createQuery(countHql).uniqueResult();

            page.setTotalCount(totalCount);

            //		 	排序
            StringBuilder sb = new StringBuilder(sql);
            if (!StringUtils.isEmpty(page.getOrder())) {

                try {

                    String[] orders = StringUtils.split(page.getOrder(), ',');
                    String[] orderBys = StringUtils.split(page.getOrderBy(), ',');

                    for (int i = 0; i < orders.length && i < orderBys.length; i++) {
                        sql = sb.toString();
                        if (sql.toUpperCase().contains("ORDER") && sql.toUpperCase().contains("BY")) {
                            sb.append(",");
                        } else {
                            sb.append(" order by ");
                        }
                        sb
                                .append(orderBys[i])
                                .append(" ")
                                .append(orders[i]);
                    }
                } catch (Exception e) {
                    sb = new StringBuilder(sql);
                    System.out.println("BaseDaoImpl.findByPage : " + e);
                }

            }
            sql = sb.toString();
            List<T> result = session.createQuery(sql)
                    .setFirstResult(page.getFirst())
                    .setMaxResults(page.getPageSize())
                    .list();
            page.setResult(result);


        } catch (Exception e) {
            System.out.println("分页查询捕捉异常" + e.getCause().getMessage());
            clear(session);
        }
        return page;
    }

    /**
     * 总共页数
     *
     * @param sql
     * @return
     */
    public long getTotalCounts(String sql) {
        long totalCount = 0;
        try {
            session = getCurrentSession();
            BigInteger bi = (BigInteger) session.createSQLQuery(sql).uniqueResult();
            totalCount = bi.longValue();
        } catch (Exception e) {
            System.out.println("获取总共页数捕捉异常 ：" + e.getCause().getMessage());
            clear(session);
        }
        return totalCount;
    }

    /**
     * 列表分页
     *
     * @param start
     * @param limit
     * @param sql
     * @return
     */
    public List<T> getPagedDataBySQL(Integer start, Integer limit, String sql) {
        List<T> list = null;
        try {
            session = getCurrentSession();
            if (start != null) {
                if (limit != null) {
                    list = session.createSQLQuery(sql).addEntity(entityClass)
                            .setFirstResult(start).setMaxResults(limit).list();
                } else {
                    list = session.createSQLQuery(sql).addEntity(entityClass)
                            .setFirstResult(start).setMaxResults(10).list();
                }
            } else {
                list = session.createSQLQuery(sql).addEntity(entityClass).list();
            }
        } catch (Exception e) {
            System.out.println("列表分页捕捉异常 : " + e.getCause().getMessage());
            clear(session);
        }
        return list;
    }


    public void executeSQL(String sql) {
        try {
            session = getCurrentSession();
            session.createSQLQuery(sql).executeUpdate();
        } catch (Exception e) {
            System.out.println("执行sql语句异常 : " + e.getCause().getMessage());
            clear(session);
        }
    }
}
