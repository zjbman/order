package com.paper.controller;

import com.paper.service.AccountService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
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
    public String Login(@RequestParam("username") String username, @RequestParam("password") String password, Model model) {
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        Subject subject = SecurityUtils.getSubject();

        try {
            subject.login(token);
        } catch (IncorrectCredentialsException ice) {
            // 捕获密码错误异常
            ModelAndView mv = new ModelAndView("error/404");
            mv.addObject("message", "password error!");
//            return mv;
        } catch (UnknownAccountException uae) {
            // 捕获未知用户名异常
            ModelAndView mv = new ModelAndView("error/404");
            mv.addObject("message", "username error!");
//            return mv;
        } catch (ExcessiveAttemptsException eae) {
            // 捕获错误登录过多的异常
            ModelAndView mv = new ModelAndView("error/404");
            mv.addObject("message", "times error");
//            return mv;
        }

        System.out.println("username == " + username);
        System.out.println("password == " + password);

        accountService.findAll("");


//        return new ModelAndView("main");
        return "main";
    }


}
