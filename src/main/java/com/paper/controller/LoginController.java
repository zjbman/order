package com.paper.controller;

import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * @author zjbman
 * @Description
 * @date 2018/3/23 14:15
 **/
@Controller
public class LoginController {

    @RequestMapping(value = "/Login",method = RequestMethod.POST)
    public String Login(@RequestParam("username") String username, @RequestParam("password") String password, Model model){
        new UsernamePasswordToken(username,password);

        System.out.println("username == " + username);
        System.out.println("password == " + password);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("username == " , username);
        result.put("password == " , password);
        model.addAttribute("result",result);

        return "main";
    }


}
