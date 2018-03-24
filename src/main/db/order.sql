/*
Navicat MySQL Data Transfer

Source Server         : zjbman
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : order

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-03-24 20:51:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '账号',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `qq` varchar(255) DEFAULT NULL,
  `create_date` varchar(255) DEFAULT NULL COMMENT '创建日期',
  `update_date` varchar(255) DEFAULT NULL COMMENT '更新日期',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `UK_gex1lmaqpg0ir5g1f5eftyaa1` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', 'admin', 'admin', '管理员zjb', 'zjbman@sina.com', '825303675', '2018-03-23', '2018-03-23');
INSERT INTO `account` VALUES ('2', 'zhang', 'zhang', '商家', 'jbandxs@sina.com', '825303675', '2018-03-23', '2018-03-23');
INSERT INTO `account` VALUES ('3', 'li', 'li', '游客', '825303675@qq.com', '825303675', '2018-03-23', '2018-03-23');

-- ----------------------------
-- Table structure for account_role_mapping
-- ----------------------------
DROP TABLE IF EXISTS `account_role_mapping`;
CREATE TABLE `account_role_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL COMMENT '账号id',
  `account_name` varchar(255) DEFAULT NULL COMMENT '账号name',
  `role_id` int(11) NOT NULL COMMENT '角色id',
  `role_name` varchar(255) DEFAULT NULL COMMENT '角色name',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account_role_mapping
-- ----------------------------
INSERT INTO `account_role_mapping` VALUES ('1', '1', 'admin', '1', '管理员zjb');
INSERT INTO `account_role_mapping` VALUES ('2', '2', 'zhang', '2', '商家');
INSERT INTO `account_role_mapping` VALUES ('3', '3', 'li', '3', '游客');

-- ----------------------------
-- Table structure for authority
-- ----------------------------
DROP TABLE IF EXISTS `authority`;
CREATE TABLE `authority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authority` varchar(255) DEFAULT NULL COMMENT '权限',
  `describe` varchar(255) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of authority
-- ----------------------------
INSERT INTO `authority` VALUES ('1', '管理员权限', '最高权限');
INSERT INTO `authority` VALUES ('2', '商家权限', '第二权限');
INSERT INTO `authority` VALUES ('3', '游客权限', '最低权限');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL COMMENT '角色',
  `describe` varchar(255) DEFAULT NULL COMMENT '相关描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '管理员', '管理员权限，最高权限');
INSERT INTO `role` VALUES ('2', '商家', '商家权限，低一级的权限，例如不可以添加、删除、修改商家');
INSERT INTO `role` VALUES ('3', '游客', '游客权限，最低的权限，只拥有浏览功能');

-- ----------------------------
-- Table structure for role_authority_mapping
-- ----------------------------
DROP TABLE IF EXISTS `role_authority_mapping`;
CREATE TABLE `role_authority_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL COMMENT '角色id',
  `authority_id` int(255) NOT NULL COMMENT '权限id',
  `role_name` varchar(255) DEFAULT NULL COMMENT '角色name',
  `authority_name` varchar(255) DEFAULT NULL COMMENT '权限name',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_authority_mapping
-- ----------------------------
INSERT INTO `role_authority_mapping` VALUES ('1', '1', '1', '管理员', '管理员权限');
INSERT INTO `role_authority_mapping` VALUES ('2', '2', '2', '商家', '商家权限');
INSERT INTO `role_authority_mapping` VALUES ('3', '3', '3', '游客', '游客权限');
