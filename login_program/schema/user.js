// 导入定义规则的包
const joi = require('joi');
// 定义用户名和密码的验证规则
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
const username = joi.string().alphanum().min(3).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
const avatar = joi.string().uri().required();

//定义验证注册和登录表单数据规则对象
exports.register = {
    body: {
        username,
        password
    }
}

// 定义验证规则对象 - 更新密码
exports.updatePwd = {
    body: {
        // 使用 joi.ref('oldPwd') 表示新密码和旧密码必须保持一致
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}
// 定义验证规则对象 - 更新用户头像
exports.updateAvatar = {
    body: {
        avatar
    }
}