package com.paper.controller.app;

import com.paper.controller.base.BaseListController;
import com.paper.data.app.CommentData;
import com.paper.entity.Business;
import com.paper.entity.Comment;
import com.paper.entity.User;
import com.paper.service.CommentService;
import com.paper.service.UserService;
import com.paper.util.StringUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.*;

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

    @Autowired
    @Qualifier("userService")
    private UserService userService;

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

    @RequestMapping("/Insert")
    public @ResponseBody
    Map<String,Object> insert(Integer id,String username,String content) {
        logger.info("成功进入新增评论接口 id === " + id);
        Map<String, Object> result = new HashMap<String, Object>();

        if (id != null && !StringUtil.isEmpty(username) && !StringUtil.isEmpty(content)) {
            User user = userService.findBySQL("select * from user where username = '" + username + "'",true);
            if(user == null){
                result.put("code", -100);
                result.put("msg", "新增评论失败");
                return result;
            }

            Comment comment = new Comment();
            Business business = new Business();
            business.setId(id);
            comment.setBusiness(business);
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            comment.setDate(format.format(new Date()));
            comment.setUser_id(user);
            comment.setContent(content);

            try {
                commentService.save(comment);

                result.put("code", 200);
                result.put("msg", "新增评论成功");
                return result;
            } catch (Exception e) {
                e.printStackTrace();

                result.put("code", -100);
                result.put("msg", "新增评论失败");
                return result;
            }
        } else {
            result.put("code", -100);
            result.put("msg", "新增评论失败");
            return result;
        }
    }
}
