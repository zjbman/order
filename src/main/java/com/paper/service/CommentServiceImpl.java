package com.paper.service;

import com.paper.dao.CommentDao;
import com.paper.entity.Comment;
import com.paper.service.base.BaseService;
import com.paper.service.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/22 17:43
 **/
@Service("commentService")
public class CommentServiceImpl extends BaseServiceImpl<Comment> implements CommentService{
    private CommentDao commentDao;

    @Resource(name = "commentDao")
    public void setCommentDao(CommentDao commentDao){
        this.commentDao = commentDao;
        super.setBaseDao(commentDao);
    }
}
