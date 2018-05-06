package com.paper.controller.app;

import com.paper.config.WebParam;
import com.paper.entity.User;
import com.paper.service.UserService;
import com.paper.util.StringUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 这是客户端 登录注册请求 的controller
 */
@Controller
@RequestMapping("/user")
public class UserController {
    private Logger logger = Logger.getLogger(UserController.class.getSimpleName());

    @Autowired
    @Qualifier("userService")
    UserService userService;

    @RequestMapping("/Login")
    public @ResponseBody
    Map<String, Object> login(String username, String password) {
        logger.info("成功进入登录接口");

        Map<String, Object> result = new HashMap<String, Object>();
        if (StringUtil.isEmpty(username) || StringUtil.isEmpty(password)) {
            result.put("code", WebParam.LOGIN_NOT_NULL);
            result.put("msg", "账号或密码不能为空");
            return result;
        }
        User user = userService.findBySQL("select * from user where username = '" + username + "'", true);
        if(user == null){
            result.put("code", WebParam.LOGIN_NOT_EXIST);
            result.put("msg", "账号或密码不正确");
            return result;
        }
        if(!user.getPassword().equals(password)){
            result.put("code", WebParam.LOGIN_NOT_RIGHT);
            result.put("msg", "账号或密码不正确");
            return result;
        }
        result.put("code", WebParam.SUCCESS);
        result.put("msg", "登录成功");
        return result;
    }


    @RequestMapping("/Register")
    public @ResponseBody
    Map<String,Object> register(String username,String password,String email,String qq,
                                String telephone,String name){
        logger.info("成功进入注册接口");
        Map<String, Object> result = new HashMap<String, Object>();

        User user = userService.findBySQL("select * from user where username = '" + username + "'", true);
        if (user != null) {
            result.put("code", WebParam.REGISTER_ALREADY_EXIST);
            result.put("msg", "用户名已存在");
            return result;
        }

        try {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(password);
            newUser.setEmail(email);
            newUser.setQq(qq);
            newUser.setMoney(100.0);
            newUser.setTelephone(telephone);
            newUser.setName(name);
            newUser.setState(0);

            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            newUser.setCreateDate(format.format(new Date()));
            newUser.setUpdateDate(format.format(new Date()));

            userService.save(newUser);

            result.put("code", WebParam.SUCCESS);
            result.put("msg", "注册成功！");
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            result.put("code", WebParam.FAIL);
            result.put("msg", "注册失败！");
            return result;
        }
    }

    @RequestMapping("/Find")
    public @ResponseBody
    Map<String,Object> find(String username){
        logger.info("成功进入查询用户信息接口");
        com.paper.data.app.UserData data = null;

        if(!StringUtil.isEmpty(username)){
            User user = userService.findBySQL("select * from user where username = '" + username + "'",true);
            data = new com.paper.data.app.UserData(user);
        }

        Map<String,Object> result = new HashMap<String,Object>();
        result.put("code",200);
        result.put("msg",data);
        return result;
    }
}
