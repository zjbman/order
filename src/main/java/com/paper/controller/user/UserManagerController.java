package com.paper.controller.user;

import com.paper.controller.base.BaseListController;
import com.paper.data.UserData;
import com.paper.entity.User;
import com.paper.service.UserService;
import com.paper.util.MD5;
import com.paper.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author zjbman
 * @Description
 * @date 2018/4/18 9:43
 **/
@Controller()
@RequestMapping("/userManager")
public class UserManagerController extends BaseListController<User> {

    @Autowired
    @Qualifier("userService")
    private UserService userService;


    @RequestMapping("/Page")
    public String page() {
        return "user/user_manager";
    }


    @RequestMapping("/List")
    public @ResponseBody
    Map<String, Object> list() {
        List<UserData> data = new ArrayList<UserData>();

        list = userService.findAllSQL("select * from user");

        if (list != null) {
            for (User user : list) {
                data.add(new UserData(user));
            }
        }

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("rows", data);
        return result;
    }

    @RequestMapping("/RemoveBlacklist")
    public @ResponseBody
    Map<String,Object> removeBlacklist(Integer id){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Map<String, Object> result = new HashMap<String, Object>();

        if (id != null) {
            User user = userService.findById(id);
            user.setState(0);
            user.setUpdateDate(format.format(new Date()));

            userService.update(user);

            result.put("code", 500);
            return result;
        } else {
            result.put("code", 501);
            return result;
        }
    }

    @RequestMapping("/Blacklist")
    public @ResponseBody
    Map<String, Object> blacklist(Integer id) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Map<String, Object> result = new HashMap<String, Object>();

        if (id != null) {
            User user = userService.findById(id);
            user.setState(1);
            user.setUpdateDate(format.format(new Date()));

            userService.update(user);

            result.put("code", 500);
            return result;
        } else {
            result.put("code", 501);
            return result;
        }
    }

    @RequestMapping("/Find")
    public @ResponseBody
    List<UserData> find(Integer id) {
        List<UserData> data = new ArrayList<UserData>();

        if (id != null) {
            User user = userService.findById(id);
            data.add(new UserData(user));
        }

        return data;
    }


    //保存
    @RequestMapping(value = "/Save")
    public @ResponseBody
    Map<String, Object> save(Integer id, String username, String password, String name,
                             String telephone,String email,String qq) {
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            User user = new User();

            if (id != null) {
                //修改
                user = userService.findById(id);
                user.setUpdateDate(format.format(new Date()));

            } else {
                //新增
                user.setCreateDate(format.format(new Date()));
                user.setUpdateDate(format.format(new Date()));
                user.setState(0);
            }

            if (!StringUtil.isEmpty(username)) {
                user.setUsername(username);
            }
            if (!StringUtil.isEmpty(password)) {
                user.setPassword(MD5.md5(password));
            }
            if (!StringUtil.isEmpty(name)) {
                user.setName(name);
            }
            if (!StringUtil.isEmpty(telephone)) {
                user.setTelephone(telephone);
            }
            if (!StringUtil.isEmpty(email)) {
                user.setEmail(email);
            }
            if(!StringUtil.isEmpty(qq)){
                user.setQq(qq);
            }
            userService.saveOrUpdate(user);

            Map<String, Object> result = new HashMap<String, Object>();
            result.put("code", 200);
            return result;
        } catch (Exception e) {
            e.printStackTrace();

            Map<String, Object> result = new HashMap<String, Object>();
            result.put("code", 102);
            return result;
        }

    }
}
