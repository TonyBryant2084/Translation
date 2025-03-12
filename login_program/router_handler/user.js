// 导入数据库操作模块
const db = require('../db/index')
// 导入加密包
const bcryptjs = require('bcryptjs')
// 导入token包
const jwt = require('jsonwebtoken')
// 导入配置包
const config = require('../config')
// 注册用户的处理函数
function resgister(req, res) {
    // 获取客户端提交到用户的信息
    const userinfo = req.body;
    // 对表单中的数据进行合法性校验
    if (!userinfo.username || !userinfo.password) {
        // return res.send({
        //     status: 1,
        //     msg: '用户名或密码不合法'
        // })
        return res.cc('用户名或密码不合法')
    }
    // 定义sql语句 查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?';
    db.query(sqlStr, userinfo.username, (err, result) => {
        if (err) {
            // return res.send({
            //     status: 1,
            //     msg: err.message
            // })
            return res.cc(err);
        }
        if (result.length > 0) {
            // return res.send({
            //     status: 1,
            //     msg: '用户名重复，请更换用户名'
            // })
            return res.cc('用户名重复，请更换用户名');
        }
        // 给密码加密
        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        userinfo.password = bcryptjs.hashSync(userinfo.password, 10);
        console.log(userinfo)
        //插入新用户
        //定义插入的sql语句
        const sqlin = 'insert into ev_users set?';
        db.query(sqlin, { username: userinfo.username, password: userinfo.password }, (err, result) => {
            // 执行sql语句失败
            if (err) {
                // return res.send({
                //     status: 1,
                //     msg: err.message
                // })
                return res.cc('err')
            }
            // sql语句执行成功，但影响行数不唯一    
            if (result.affectedRows !== 1) {
                // return res.send({
                //     status: 1,
                //     msg: '注册用户失败，请稍后再试'
                // })
                return res.cc('注册用户失败，请稍后再试');
            }
            // 注册成功
            // res.send({
            //     status: 0,
            //     msg: '注册成功！'
            // })
            res.cc('注册成功！', 0);
        })
    })
}
// 登录的处理函数
function login(req, res) {
    // 接收表单的数据
    const userinfo = req.body;
    // 检验用户名
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, result) => {
        // 执行sql语句失败
        if (err) {
            return res.cc(err);
        }
        if (result.length !== 1) {
            return res.cc('用户名或密码错误!')
        }
        // console.log(result[0].password)
        // console.log()
        // 检验密码
        const comresult = bcryptjs.compareSync(userinfo.password, result[0].password);
        //    console.log(comresult)
        if (!comresult) {
            return res.cc('用户名或密码错误');
        }
        //    在服务器端生成Token字符串
        //用三点运算符拿到对象,这样写可以把password和user_pic的值赋值为空
        const user = { ...result[0], password: '', user_pic: '' }
        // console.log(user)
        //对用户的信息进行加密   密钥   有效期
        const tokenStr = jwt.sign(user, config.jwtSecretkey, { expiresIn: config.expiresIn })
        // console.log(tokenStr);
        //调用send将token响应给客户端
        res.send({
            status: 0,
            msg: '登录成功',
            token: 'Bearer ' + tokenStr
        })
    })
}

module.exports = {
    resgister,
    login
}