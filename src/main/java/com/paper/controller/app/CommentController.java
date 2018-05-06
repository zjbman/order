package com.paper.controller.app;

import com.paper.controller.base.BaseListController;
import com.paper.data.app.CommentData;
import com.paper.entity.Comment;
import com.paper.service.CommentService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 客户端请求 评论 接口
 */
@Controller
@RequestMapping("/comment")
public class CommentController  extends BaseListController<Comment> {
    private Logger logger = Logger.getLogger(CommentController.class);

    @Autowired
    @Qualifier("commentService")
    private CommentService commentService;

    @RequestMapping("/List")
    public @ResponseBody
    Map<String,Object> list(Integer id){
        logger.info("成功进入评论接口 id === " + id);
        List<CommentData> data = new ArrayList<CommentData>();

        if(id != null){
            list = commentService.findAllSQL("select * from comment where business_id = " + id);
        }

        for(Comment comment : list){
            data.add(new CommentData(comment));
        }

        Map<String,Object> result = new HashMap<String,Object>();
        result.put("code",200);
        result.put("msg",data);
        return result;
    }
}
