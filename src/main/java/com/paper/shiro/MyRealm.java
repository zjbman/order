package com.paper.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

/**
 * @author zjbman
 * @Description
 * @date 2018/3/22 17:14
 **/
public class MyRealm extends AuthorizingRealm{
        @Override
        protected AuthorizationInfo doGetAuthorizationInfo(
                PrincipalCollection principals) {
            // TODO Auto-generated method stub
            return null;
        }

        @Override
        protected AuthenticationInfo doGetAuthenticationInfo(
                AuthenticationToken token) throws AuthenticationException {
            // TODO Auto-generated method stub
            return null;
        }
        /**
         * 为当前登录的Subject授予角色和权限
         * @see  经测试:本例中该方法的调用时机为需授权资源被访问时
         * @see  经测试:并且每次访问需授权资源时都会执行该方法中的逻辑,这表明本例中默认并未启用AuthorizationCache
         * @see  个人感觉若使用了Spring3.1开始提供的ConcurrentMapCache支持,则可灵活决定是否启用AuthorizationCache
         * @see  比如说这里从数据库获取权限信息时,先去访问Spring3.1提供的缓存,而不使用Shior提供的AuthorizationCache
         */
//	@Autowired
//	@Qualifier("userService")
//	protected UserService userService;
//
//	@Autowired
//	@Qualifier("groupMenuMappingService")
//	protected GroupMenuMappingService groupMenuMappingService;

//  @Override
//    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals){
//        String currentUsername = (String)super.getAvailablePrincipal(principals);
//
//        SimpleAuthorizationInfo simpleAuthorInfo = new SimpleAuthorizationInfo();
//        return null;
//    }
//
//    /**
//     * 验证当前登录的Subject
//     * @see  经测试:本例中该方法的调用时机为LoginController.login()方法中执行Subject.login()时
//     */
//    @Override
//    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
//
//    	Map<String, Object> userMap = null;
//        UsernamePasswordToken token = (UsernamePasswordToken)authcToken;
//        userMap = userService.getByUsername(token.getUsername());
//        if(userMap==null || userMap.isEmpty()) {
//        	return null;
//        }
//        else{
//          String username = ((TUser)userMap.get(TUser.class.getSimpleName())).getUsername();
//          String password = ((TUser)userMap.get(TUser.class.getSimpleName())).getPassword();
//          String nickname="";
//          AuthenticationInfo authcInfo = new SimpleAuthenticationInfo(username,password,nickname);
//          TUser newUser = (TUser)userMap.get(TUser.class.getSimpleName());
//
//          setSession(WebParam.LOGIN_USER, newUser);
//          UserUtil.UserMap.put(WebParam.LOGIN_USER, newUser);
//          setSession(WebParam.PERMISSION, getMenuList(groupMenuMappingService.getGroupMenuMappingListByUserId(newUser.getId())));
//          setSession(TUser.class.getSimpleName(), newUser);
//
//          return authcInfo;
//        }
//    }
//
//	/**
//	 * 从用户组权限映射中获取对应的用户权限列表
//	 * @param list
//	 * @return
//	 */
//	public static Map<Integer,List<TMenu>> getMenuList(List<TGroupMenuMapping> list){
//		Map<Integer,List<TMenu>> userMenus = new HashMap<Integer,List<TMenu>>();
//		for(int i=0; i<list.size(); i++) {
//			TMenu m = list.get(i).getTMenu();
//			List<TMenu> temp = userMenus.get(m.getPid());
//		    if(temp == null) {
//				temp = new ArrayList<TMenu>();
//			}
//			temp.add(m);
//
//			if(userMenus.get(m.getPid()) == null) {
//				userMenus.put(m.getPid(), temp);
//			}
//		}
//
//		return userMenus;
//	}
//    /**
//     * 将一些数据放到ShiroSession中,以便于其它地方使用
//     * @see  比如Controller,使用时直接用HttpSession.getAttribute(key)就可以取到
//     */
//    private void setSession(Object key, Object value){
//        Subject currentUser = SecurityUtils.getSubject();
//        if(null != currentUser){
//            Session session = currentUser.getSession();
//            if(null != session){
//                session.setAttribute(key, value);
//            }
//        }
//    }

}


