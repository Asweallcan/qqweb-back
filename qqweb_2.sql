
/*
 Navicat MySQL Data Transfer

 Source Server         : lvshihao
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : qqweb_2

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 20/11/2017 22:02:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for message_group
-- ----------------------------
DROP TABLE IF EXISTS `message_group`;
CREATE TABLE `message_group`  (
  `from_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `message` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` int(255) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message_group
-- ----------------------------
INSERT INTO `message_group` VALUES ('296877137', 'aaa', 1511181874);
INSERT INTO `message_group` VALUES ('296877137', 'eqw', 1511181882);
INSERT INTO `message_group` VALUES ('296877137', 'zxczxc', 1511181886);
INSERT INTO `message_group` VALUES ('296877137', 'czxc', 1511181936);
INSERT INTO `message_group` VALUES ('296877137', 'rewr', 1511181937);

-- ----------------------------
-- Table structure for message_user
-- ----------------------------
DROP TABLE IF EXISTS `message_user`;
CREATE TABLE `message_user`  (
  `from_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `to_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isread` int(255) NOT NULL,
  `time` int(255) NOT NULL,
  `message` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message_user
-- ----------------------------
INSERT INTO `message_user` VALUES ('296877137', '15007272717', 1, 1511182120, '2');
INSERT INTO `message_user` VALUES ('296877137', '15007272717', 1, 1511182214, 'asdasd');
INSERT INTO `message_user` VALUES ('296877137', '15007272717', 1, 1511182335, 'asdasd');
INSERT INTO `message_user` VALUES ('15007272717', '296877137', 1, 1511182466, 'aaaa');
INSERT INTO `message_user` VALUES ('296877137', '15007272717', 1, 1511186133, 'so tell me sth');
INSERT INTO `message_user` VALUES ('15007272717', '296877137', 1, 1511186172, 'asdasd');
INSERT INTO `message_user` VALUES ('296877137', '15007272717', 1, 1511186176, 'asdasd');
INSERT INTO `message_user` VALUES ('15007272717', '296877137', 1, 1511186179, 'asdasdasd');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `qq` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('296877137', 'RGXM9fKIs3h/uFhM/82u2w==');
INSERT INTO `user` VALUES ('15007272717', 'RGXM9fKIs3h/uFhM/82u2w==');

-- ----------------------------
-- Table structure for user_detail
-- ----------------------------
DROP TABLE IF EXISTS `user_detail`;
CREATE TABLE `user_detail`  (
  `qq` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `signature` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'avatar.jpg',
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `age` int(255) NOT NULL,
  `place` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `question` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `background` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'background.jpg'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_detail
-- ----------------------------
INSERT INTO `user_detail` VALUES ('296877137', '突变桑椹胚', '人类的悲欢并不相通', '296877137.jpg', 'male', 20, '湖北襄阳', '我多大', '20', '296877137.jpg');
INSERT INTO `user_detail` VALUES ('15007272717', '繁华依旧', '人类的悲欢并不相通', 'avatar.jpg', 'male', 30, '湖北武汉', '我几岁了', '30', 'background.jpg');

SET FOREIGN_KEY_CHECKS = 1;