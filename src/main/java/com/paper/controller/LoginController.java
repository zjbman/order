package com.paper.controller;

import com.paper.service.AccountService;
import com.paper.util.MD5;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


/**
 * @author zjbman
 * @Description 登录接口
 * @date 2018/3/23 14:15
 **/
@Controller
public class LoginController {
    @Autowired
    AccountService accountService;


    @RequestMapping(value = "/Login", method = RequestMethod.POST)
    public String Login(@RequestParam("username") String username,
                        @RequestParam("password") String password, Model model) {
        /* 对密码进行32位小写md5*/
        UsernamePasswordToken token = new UsernamePasswordToken(username, MD5.get32MD5(password));
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(token);

        } catch (IncorrectCredentialsException ice) {
            // 捕获密码错误异常
            System.out.println("账户密码 " + token.getPrincipal()  + " 不正确!");

        } catch (UnknownAccountException uae) {
            // 捕获未知用户名异常
            System.out.println("用户名不存在:" + token.getPrincipal());

        } catch (ExcessiveAttemptsException eae) {
            // 捕获错误登录过多的异常
            System.out.println("用户名 " + token.getPrincipal() + " 被锁定 !");

        } catch (LockedAccountException lae) {
            System.out.println("用户名 " + token.getPrincipal() + " 被锁定 !");
        }


        if(subject.isAuthenticated()){
            /* 认证成功后*/
            System.out.println("用户 " + subject.getPrincipal() + " 登陆成功！");

            //测试角色
            System.out.println("是否拥有 manager 角色：" + subject.hasRole("manager"));

            //测试权限
            System.out.println("是否拥有 user:create 权限" + subject.isPermitted("user:create"));

        }else{
            System.out.println("用户 " + username + "， token无效");
        }




        System.out.println("username == " + username);
        System.out.println("password == " + password);

        return "main";
    }


}
