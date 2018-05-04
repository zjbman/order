package com.paper.config;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/4 18:02
 **/
public class WebParam {
    /** 登录用户缓存*/
    public static final String LOGIN_USER = "loginUser";
    /** 登录用户权限 ,具体体现为登录用户所看到的菜单（子菜单）*/
    public static final String PERMISSION = "permission";


    public static final int SUCCESS = 200;
    public static final int FAIL = -100;

    /** 登录返回参数*/
    public static final int LOGIN_NOT_NULL = 101;
    public static final int LOGIN_NOT_EXIST = 102;
    public static final int LOGIN_NOT_RIGHT = 103;

    /** 注册返回参数*/
    public static final int REGISTER_ALREADY_EXIST = 104;

}
