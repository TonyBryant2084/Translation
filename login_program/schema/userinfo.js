const joi = require('joi')
//定义验证规则
const id = joi.number().integer().min(1);
const nickname = joi.string().required()
const email = joi.string().email().required();
const gender = ('男' | '女');
exports.updateUserInfo = {
    body: {
        id,
        nickname,
        email
    }
}