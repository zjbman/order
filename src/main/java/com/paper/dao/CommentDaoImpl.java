package com.paper.dao;

import com.paper.dao.base.BaseDaoImpl;
import com.paper.entity.Comment;
import org.springframework.stereotype.Repository;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/22 17:37
 **/
@Repository("commentDao")
public class CommentDaoImpl extends BaseDaoImpl<Comment> implements CommentDao{
}
