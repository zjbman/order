package com.paper.util;

import com.paper.config.WebParam;
import com.paper.entity.TUser;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Hashtable;

/**
 * @author zjbman
 * @Description 这是 当前登录用户 缓存工具类
 * @date 2018/4/10 16:06
 **/
public class UserUtil {
    private static UserUtil instance;

    /** 缓存当前登录用户的集合*/
    private Hashtable<String, TUser> UserMap = new Hashtable<String, TUser>();

    private UserUtil(){}

    public static UserUtil getInstance() {
        if(instance == null){
            synchronized (UserUtil.class){
                if(instance == null){
                    instance = new UserUtil();
                }
            }
        }
        return instance;
    }

    /**
     * 传入HttpServletRequest 对象，返回当前登录用户
     * (是shiro的session中获取的)
     * @param request
     * @return
     */
    public TUser getCurrentUser(HttpServletRequest request) {
        HttpSession session = request.getSession();
        TUser user = (TUser)session.getAttribute(WebParam.LOGIN_USER);
        return user;
    }
}
