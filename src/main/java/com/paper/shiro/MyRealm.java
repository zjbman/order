package com.paper.shiro;

import com.paper.config.WebParam;
import com.paper.entity.*;
import com.paper.service.*;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zjbman
 * @Description 域。Shiro 从 Realm 获取安全数据（如用户、角色、权限），
 * 就是说 SecurityManager 要验证用户身份，那么它需要从 Realm 获取
 * 相应的用户进行比较以确定用户身份是否合法，也需要从 Realm 得到
 * 用户相应的角色/权限进行验证用户是否能进行操作。我们可以把 Realm 看成 DataSource，即安全数据源。
 * 它可以是 JDBC 实现，也可以是 LDAP 实现，或者内存实现等。
 * @date 2018/3/22 17:14
 **/
public class MyRealm extends AuthorizingRealm {
    /*
     * 为当前登录的Subject授予角色和权限
     * @see  经测试:本例中该方法的调用时机为需授权资源被访问时
     * @see  经测试:并且每次访问需授权资源时都会执行该方法中的逻辑,这表明本例中默认并未启用AuthorizationCache
     * @see  个人感觉若使用了Spring3.1开始提供的ConcurrentMapCache支持,则可灵活决定是否启用AuthorizationCache
     * @see  比如说这里从数据库获取权限信息时,先去访问Spring3.1提供的缓存,而不使用Shior提供的AuthorizationCache
     */

    @Autowired
    AccountService accountService;
    @Autowired
    RoleService roleService;
    @Autowired
    AuthorityService authorityService;
    @Autowired
    AccountRoleMappingService accountRoleMappingService;
    @Autowired
    RoleAuthorityMappingService roleAuthorityMappingService;

    /**
     * 认证
     * @param token
     * 该方法的调用时机为LoginController.login()方法中执行Subject.login()时
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(
            AuthenticationToken token) throws AuthenticationException {

        /* 1.从token中获取用户身份信息*/
        String username = (String) token.getPrincipal();

        /* 2.通过username查询数据库*/
        String sql = "select * from account where username = '" + username + "'";
        Account account = accountService.findBySQL(sql, true);

        /* 3.如果查询不到则返回null*/
        if(account == null){
            return null;
        }

        /* 将当前登录的用户缓存到session中*/
        setSession(WebParam.LOGIN_USER,account);

        /* 4.获取从数据库查询出来的用户密码*/
        String password = account.getPassWord();

        /* 5.返回认证信息由父类AuthenticatingRealm进行认证*/
        return new SimpleAuthenticationInfo(username, password, getName());
    }


    /**
     * 授权
     * <p>
     * 逻辑：用户通过认证后，才进行授权操作，
     * 所以这个方法的参数直接就是principals（包含当前用户信息）
     *
     * @param principals
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(
            PrincipalCollection principals) {

        /* 1.获取身份信息*/
        String username = (String) principals.getPrimaryPrincipal();

        /* 2.根据身份信息从数据库中查询权限数据*/

        /* 3.将权限信息封闭为AuthorizationInfo*/
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();

        //（1）先查询属于什么角色,拿到角色id
        String sql = "select * from account where username =  '" + username + "'";
        Account account = accountService.findBySQL(sql, true);
        if(account != null){
            Integer id = account.getId();
            sql = "select * from account_role_mapping where account_id = " + id;
            AccountRoleMapping accountRoleMapping = accountRoleMappingService.findBySQL(sql, true);
            if(accountRoleMapping == null){
                return null;
            }

            Integer roleId = accountRoleMapping.getRoleId();
            Role role = roleService.findById(roleId);

            if(role == null){
                return null;
            }

            /* 添加的角色信息是由自己自定义的，eg “管理员”，“商家”，“消费者”*/
            info.addRole(role.getRole());

            //（2）拿着角色id去获取相应的权限
            sql = "select * from role_authority_mapping where role_id = " + id;
            RoleAuthorityMapping roleAuthorityMapping = roleAuthorityMappingService.findBySQL(sql, true);
            if(roleAuthorityMapping == null){
                return null;
            }

            Integer authorityId = roleAuthorityMapping.getAuthorityId();
            Authority authority = authorityService.findById(authorityId);
            if(authority == null){
                return null;
            }

            /* 将当前用户的权限放进session中*/
            setSession(WebParam.PERMISSION,authority);

            /* 添加的权限信息是由自己自定义的， eg “管理员权限”，“商家权限”，“消费者权限”*/
            info.addStringPermission(authority.getAuthority());

        }

        /* 4.返回AuthorizationInfo*/
        return info;
    }



    /**
     * 将一些数据放到ShiroSession中,以便于其它地方使用
     * 比如Controller,使用时直接用HttpSession.getAttribute(key)就可以取到
     */
    private void setSession(Object key, Object value){
        Subject currentUser = SecurityUtils.getSubject();
        if(null != currentUser){
            Session session = currentUser.getSession();
            if(null != session){
                session.setAttribute(key, value);
            }
        }
    }
}


