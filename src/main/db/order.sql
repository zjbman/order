/*
Navicat MySQL Data Transfer

Source Server         : zjbman
Source Server Version : 50554
Source Host           : localhost:3306
Source Database       : order

Target Server Type    : MYSQL
Target Server Version : 50554
File Encoding         : 65001

Date: 2018-05-02 21:24:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for business
-- ----------------------------
DROP TABLE IF EXISTS `business`;
CREATE TABLE `business` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '商家名称',
  `contact` varchar(255) DEFAULT NULL COMMENT '联系人',
  `telephone` varchar(255) DEFAULT NULL COMMENT '联系方式',
  `address` varchar(255) DEFAULT NULL COMMENT '地址',
  `date` varchar(255) DEFAULT NULL COMMENT '入驻日期',
  `picture` varchar(255) DEFAULT NULL COMMENT '商家图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of business
-- ----------------------------
INSERT INTO `business` VALUES ('1', '阿里粑粑', '鹿云', '1555555555', '杭州', '2018-04-22', 'xxx.jpg');
INSERT INTO `business` VALUES ('2', '阿里骂骂', '驴云', '15521973476', '深圳', '2018-05-02', 'xxx.jpg');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL COMMENT '评论内容',
  `date` varchar(255) DEFAULT NULL COMMENT '日期',
  `user_id` int(11) DEFAULT NULL COMMENT '外键，关联用户信息表的id',
  `business_id` int(11) DEFAULT NULL COMMENT '外键，关联商家表的id',
  PRIMARY KEY (`id`),
  KEY `business_id` (`business_id`),
  KEY `FK_mxoojfj9tmy8088avf57mpm02` (`user_id`),
  CONSTRAINT `FK_mxoojfj9tmy8088avf57mpm02` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '真好吃啊', '2018-04-22', '1', '1');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '商品名',
  `details` varchar(255) DEFAULT NULL COMMENT '商品介绍',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价钱',
  `business_id` int(11) DEFAULT NULL COMMENT '外键，关联商家表的id',
  `picture` varchar(255) DEFAULT NULL COMMENT '商品图片',
  `date` varchar(255) DEFAULT '' COMMENT '上传日期',
  `update_date` varchar(255) DEFAULT NULL COMMENT '修改日期',
  PRIMARY KEY (`id`),
  KEY `business_id` (`business_id`),
  CONSTRAINT `goods_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '龙虾', '好吃实惠的龙虾', '120.00', '1', null, '2018-05-02', '2018-05-02');
INSERT INTO `goods` VALUES ('2', '红烧猪耳', '正宗的哦,不好吃不要钱', '1000.00', '1', null, '2018-05-02', '2018-05-02');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '外键，关联用户信息表的id',
  `price` decimal(10,2) DEFAULT NULL COMMENT '该订单总价钱',
  `date` varchar(255) DEFAULT NULL COMMENT '下单日期',
  `address` varchar(255) DEFAULT NULL COMMENT '配送地址',
  `business_id` int(11) DEFAULT NULL COMMENT '外键，关联商家表的id',
  `goods` varchar(255) DEFAULT NULL COMMENT '以Json形式存储，包含商品id和相应的数量',
  `telephone` varchar(255) DEFAULT NULL COMMENT '订单送达时拨打的号码',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `business_id` (`business_id`),
  KEY `order_ibfk_1` (`user_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('1', '1', '200.00', '2018-04-22', '广州市', '1', '[{id:1,number:2},{id:2,number:1}]', '15555555555', '微辣哦');
INSERT INTO `order` VALUES ('2', '1', '23.00', '2018-04-02', '梅州市', '1', '[{id:1,number:1}]', '15521973476', '两双筷子');

-- ----------------------------
-- Table structure for t_group
-- ----------------------------
DROP TABLE IF EXISTS `t_group`;
CREATE TABLE `t_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `create_date` varchar(255) DEFAULT NULL,
  `update_date` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_group
-- ----------------------------
INSERT INTO `t_group` VALUES ('1', '管理员', '2018-03-23', '2018-03-23', '管理员组');
INSERT INTO `t_group` VALUES ('2', '商家', '2018-03-23', '2018-03-23', '商家组');
INSERT INTO `t_group` VALUES ('3', '开发测试', '2018-03-23', '2018-03-23', '开发测试组');

-- ----------------------------
-- Table structure for t_group_menu_mapping
-- ----------------------------
DROP TABLE IF EXISTS `t_group_menu_mapping`;
CREATE TABLE `t_group_menu_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `menu_id` (`menu_id`),
  CONSTRAINT `t_group_menu_mapping_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `t_group` (`id`),
  CONSTRAINT `t_group_menu_mapping_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `t_menu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_group_menu_mapping
-- ----------------------------
INSERT INTO `t_group_menu_mapping` VALUES ('1', '1', '1');
INSERT INTO `t_group_menu_mapping` VALUES ('2', '1', '2');
INSERT INTO `t_group_menu_mapping` VALUES ('3', '1', '3');
INSERT INTO `t_group_menu_mapping` VALUES ('4', '1', '4');
INSERT INTO `t_group_menu_mapping` VALUES ('5', '2', '1');
INSERT INTO `t_group_menu_mapping` VALUES ('6', '2', '2');
INSERT INTO `t_group_menu_mapping` VALUES ('7', '2', '3');
INSERT INTO `t_group_menu_mapping` VALUES ('8', '2', '4');
INSERT INTO `t_group_menu_mapping` VALUES ('9', '3', '1');
INSERT INTO `t_group_menu_mapping` VALUES ('10', '3', '2');
INSERT INTO `t_group_menu_mapping` VALUES ('11', '3', '3');
INSERT INTO `t_group_menu_mapping` VALUES ('12', '3', '4');

-- ----------------------------
-- Table structure for t_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL COMMENT '当前菜单对应的id，即子菜单对应的父菜单id',
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT '' COMMENT '当前菜单对应的在项目中的url',
  `create_date` varchar(255) DEFAULT NULL,
  `update_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pid` (`pid`,`name`),
  UNIQUE KEY `UK_674bpad5ls7vjg10ifbgjqbhx` (`name`,`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_menu
-- ----------------------------
INSERT INTO `t_menu` VALUES ('1', '0', '商家管理', 'businessManager/Page.html', '2018-03-23', '2018-03-23');
INSERT INTO `t_menu` VALUES ('2', '0', '订单列表', 'orderList/Page.html', '2018-03-23', '2018-03-23');
INSERT INTO `t_menu` VALUES ('3', '0', '订单收入', 'orderIncome/Page.html', '2018-03-23', '2018-03-23');
INSERT INTO `t_menu` VALUES ('4', '0', '用户管理', 'userManager/Page.html', '2018-05-01', '2018-05-01');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `qq` varchar(255) DEFAULT NULL,
  `create_date` varchar(255) DEFAULT NULL,
  `update_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `UK_jhib4legehrm4yscx9t3lirqi` (`username`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `t_user_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `t_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='这是登录点菜系统后台的用户表，区别于点菜系统客户端的用户表';

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', '1', 'admin', '21232f297a57a5a743894a0e4a801fc3', '管理员', '12580', 'zjbman@sina.com', '825303675', '2018-03-23', '2018-03-23');
INSERT INTO `t_user` VALUES ('2', '2', 'zhang', 'd0cd2693b3506677e4c55e91d6365bff', '商家', '12580', 'jbandxs@sina.com', '825303675', '2018-03-23', '2018-03-23');
INSERT INTO `t_user` VALUES ('3', '3', 'kaifa', 'd70c1e5d44de8a9150eb91ecff563578', '开发', '12580', '825303675@qq.com', '825303675', '2018-03-23', '2018-03-23');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `qq` varchar(255) DEFAULT NULL,
  `create_date` varchar(255) DEFAULT NULL,
  `update_date` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL COMMENT '1加入了黑名单 0正常账号',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `UK_jhib4legehrm4yscx9t3lirqi` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='这是点菜系统客户端的用户表，区别于点菜系统后台的用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '21232f297a57a5a743894a0e4a801fc3', '用户1', '12580', 'zjbman@sina.com', '825303675', '2018-03-23', '2018-03-23', '0');
INSERT INTO `user` VALUES ('2', 'zhang', 'd0cd2693b3506677e4c55e91d6365bff', '用户2', '12580', 'jbandxs@sina.com', '825303675', '2018-03-23', '2018-03-23', '0');
INSERT INTO `user` VALUES ('3', 'kaifa', 'd70c1e5d44de8a9150eb91ecff563578', '用户3', '12580', '825303675@qq.com', '825303675', '2018-03-23', '2018-03-23', '1');
INSERT INTO `user` VALUES ('4', '111', 'fd45ebc1e1d76bc1fe0ba933e60e9957', '111', '11', '111', '11', '2018-05-02 19:49:36', '2018-05-02 19:57:50', '1');
INSERT INTO `user` VALUES ('5', '5435', '1ff897e13e91f10f7bb325d99b21bc17', '33333333333', '534', '3453', '4534', '2018-05-02 19:55:57', '2018-05-02 19:56:17', '1');
