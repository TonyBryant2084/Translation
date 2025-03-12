// 获取用户基本信息的模块
const express = require('express')
const router = express.Router();
// 导入验证数据合法性的中间件
const expressjoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { updateUserInfo } = require('../schema/userinfo')
const { updatePwd } = require('../schema/user')
// 挂载路由
//导入路由处理模块
const getUserInfo_handler = require('../router_handler/userinfo')
const { updateAvatar } = require('../schema/user')
// 获取用户基本信息的路由
router.get('/userinfo', getUserInfo_handler.getUserInfo)

//改变用户基本信息的路由
router.post('/userinfo', expressjoi(updateUserInfo), getUserInfo_handler.changeUserInfo)

//更新密码
router.post('/updatepwd', expressjoi(updatePwd), getUserInfo_handler.updatePassword)
// 更新用户头像
router.post('/update/avatar',expressjoi(updateAvatar), getUserInfo_handler.updateAvatar);
//删除用户
router.post('/delete', getUserInfo_handler.deleteUser)
// 将接口共享出去
module.exports = router
