// 导入express模块
const express = require('express');
//新建服务器实例实例
const app = express();

//配置跨域中间件
const cors = require('cors')
app.use(cors())
// 配置解析表单数据的中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// 一定要在路由之前，封装res.cc函数
app.use((req, res, next) => {
    // status 默认值为1，表示失败的情况
    // err可能是一个错误对象，也可能是一个错误的描述对象
    res.cc = function (err, status = 1) {
        res.send({
            status,
            // 如果 err 是一个错误对象（err instanceof Error）那直接返回错误对象的错误信息
            //如果err不是错误对象的实例，则直接返回
            msg: err instanceof Error ? err.message : err
            // instanceof 是一个非常强大的操作符，用于检测对象是否是某个构造函数的实例
        })
    }
    // 这个是关键，如果少了这个就是一直5请求
    next();
})
// 一定要在路由之前配置token的解析包
const expressjwt = require('express-jwt');
const config = require('./config')
app.use(expressjwt({ secret: config.jwtSecretkey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }));

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息，模块
const userinfo = require('./router/userinfo')
app.use('/my', userinfo);
// 定义全局错误级别中间件
const joi = require('joi')
app.use(function (err, req, res, next) {
    if (err instanceof joi.ValidationError) return res.cc(err);
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败')
    }
    // 如果是未知错误
    res.cc(err);
})
//启动服务器
app.listen(80, '0.0.0.0', () => {
    console.log('api server running at http://127.0.0.1:80')
})