/*
Navicat MySQL Data Transfer

Source Server         : zjbman
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : order

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-04-10 15:11:55
*/

SET FOREIGN_KEY_CHECKS=0;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_group_menu_mapping
-- ----------------------------
INSERT INTO `t_group_menu_mapping` VALUES ('1', '1', '1');
INSERT INTO `t_group_menu_mapping` VALUES ('2', '1', '2');
INSERT INTO `t_group_menu_mapping` VALUES ('3', '1', '3');
INSERT INTO `t_group_menu_mapping` VALUES ('4', '2', '1');
INSERT INTO `t_group_menu_mapping` VALUES ('5', '2', '2');
INSERT INTO `t_group_menu_mapping` VALUES ('6', '2', '3');
INSERT INTO `t_group_menu_mapping` VALUES ('7', '3', '1');
INSERT INTO `t_group_menu_mapping` VALUES ('8', '3', '2');
INSERT INTO `t_group_menu_mapping` VALUES ('9', '3', '3');

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
  UNIQUE KEY `pid` (`pid`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_menu
-- ----------------------------
INSERT INTO `t_menu` VALUES ('1', '0', '商家管理', '', '2018-03-23', '2018-03-23');
INSERT INTO `t_menu` VALUES ('2', '0', '订单管理', '', '2018-03-23', '2018-03-23');
INSERT INTO `t_menu` VALUES ('3', '0', '收入管理', '', '2018-03-23', '2018-03-23');

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
  KEY `group_id` (`group_id`),
  CONSTRAINT `t_user_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `t_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', '1', 'admin', '21232f297a57a5a743894a0e4a801fc3', '管理员', '12580', 'zjbman@sina.com', '825303675', '2018-03-23', '2018-03-23');
INSERT INTO `t_user` VALUES ('2', '2', 'zhang', 'd0cd2693b3506677e4c55e91d6365bff', '商家', '12580', 'jbandxs@sina.com', '825303675', '2018-03-23', '2018-03-23');
INSERT INTO `t_user` VALUES ('3', '3', 'kaifa', 'd70c1e5d44de8a9150eb91ecff563578', '开发', '12580', '825303675@qq.com', '825303675', '2018-03-23', '2018-03-23');
