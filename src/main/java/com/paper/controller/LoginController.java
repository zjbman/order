package com.paper.controller;

import com.paper.config.WebParam;
import com.paper.util.MD5;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


/**
 * @author zjbman
 * @Description 登录接口
 * @date 2018/3/23 14:15
 **/
@Controller
public class LoginController {

    @RequestMapping(value = "/Login", method = RequestMethod.POST)
    public String login(@RequestParam("username") String username,
                        @RequestParam("password") String password, Model model) {
        /* 对密码进行32位小写md5*/
        UsernamePasswordToken token = new UsernamePasswordToken(username, MD5.get32MD5(password));
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(token);
            if (subject.isAuthenticated()) {
            /* 认证成功后*/
                System.out.println("用户 " + subject.getPrincipal() + " 登陆成功！");

            /* 判断当前用户什么角色*/
                if (subject.hasRole("管理员")) {
                    System.out.println("用户 " + subject.getPrincipal() + " 角色是 管理员！");

                } else if (subject.hasRole("商家")) {
                    System.out.println("用户 " + subject.getPrincipal() + " 角色是 商家！");

                } else if (subject.hasRole("消费者")) {
                    System.out.println("用户 " + subject.getPrincipal() + " 角色是 消费者！");

                } else {
                    System.out.println("用户 " + subject.getPrincipal() + " 角色是 未知！");
                }

            /* 判断当前用户什么权限*/
                if (subject.isPermitted("管理员权限")) {
                    System.out.println("用户 " + subject.getPrincipal() + " 权限是 管理员权限！");

                } else if (subject.isPermitted("商家权限")) {
                    System.out.println("用户 " + subject.getPrincipal() + " 权限是 商家权限！");

                } else if (subject.isPermitted("消费者权限")) {
                    System.out.println("用户 " + subject.getPrincipal() + " 权限是 消费者权限！");

                } else {
                    System.out.println("用户 " + subject.getPrincipal() + " 权限 未知！");
                }

            /* 成功跳转到主界面*/
                return "redirect:/Welcome.html";
            } else {
                model.addAttribute("loginFail", "账号不存在或密码错误!");
            /* 重新到登录界面*/
                return "relogin";
            }

        } catch (IncorrectCredentialsException ice) {
            // 捕获密码错误异常
            System.out.println("账户密码 " + token.getPrincipal() + " 不正确!");

        } catch (UnknownAccountException uae) {
            // 捕获未知用户名异常
            System.out.println("用户名不存在:" + token.getPrincipal());

        } catch (ExcessiveAttemptsException eae) {
            // 捕获错误登录过多的异常
            System.out.println("用户名 " + token.getPrincipal() + " 错误登录过多 !");

        } catch (LockedAccountException lae) {
            System.out.println("用户名 " + token.getPrincipal() + " 被锁定 !");
        }
        model.addAttribute("loginFail", "账号不存在或密码错误!");
        return "relogin";
    }

    @RequestMapping(value = "/Welcome", method = RequestMethod.GET)
    public String welcome() {
        return "welcome";
    }

    @RequestMapping(value = "/LoginOut", method = RequestMethod.GET)
    public String loginOut() {
        /* 退出系统，返回重新登录界面，销毁session中用户的缓存*/
        Subject subject = SecurityUtils.getSubject();
        Session session = subject.getSession();
        session.removeAttribute(WebParam.LOGIN_USER);
        session.removeAttribute(WebParam.PERMISSION);

        /* session清空*/
        session.stop();
        return "relogin";
    }


}

