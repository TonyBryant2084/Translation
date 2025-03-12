// 获取用户基本信息的模块
// 导入数据库
const db = require('../db/index')
const bcrypt = require('bcryptjs')
//获取用户基本信息
exports.getUserInfo = ((req, res) => {
    const sqlStr = 'select id,username,nickname,email,user_pic from ev_users where username=?'
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的 
    // 新版的是req.auth
    db.query(sqlStr, req.user.username, (err, result) => {
        // 1. 执行 SQL 语句失败
        if (err) {
            return res.cc(err.message)
        }
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (result.length !== 1) {
            return res.cc('获取用户信息失败！');
        }
        res.send({
            status: 0,
            msg: '获取用户信息成功!',
            data: result[0]
        })
    })
})
// 修改用户基本信息
exports.changeUserInfo = (req, res) => {
    // 修改信息的sql语句
    const sqlStr = 'update ev_users set? where id=?'
    db.query(sqlStr, [req.body, req.body.id], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.affectedRows !== 1) {
            return res.cc('修改用户基本信息失败')
        }
        return res.cc('修改用户基本信息成功', 0);
    })
}
// 更新密码
exports.updatePassword = (req, res) => {
    // res.send('updatePassword')
    // 定义根据 id 查询用户数据的 SQL 语句
    const sqlStr = 'select * from ev_users where id=?'
    // 执行 SQL 语句查询用户是否存在
    db.query(sqlStr, req.user.id, (err, result) => {
        // 1. 查询失败
        if (err) return res.cc(err)
        // 2. 查询成功，但是用户不存在
        if (result.length !== 1) return res.cc('用户不存在')
        // 3. 判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        if (!compareResult) return res.cc('旧密码错误')
        // 4. 更新新密码
        const sqlStr1 = 'update ev_users set password=? where id=?'
        // 对新密码进行 bcrypt 加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sqlStr1, [newPwd, req.user.id], (err, result) => {
            // 1. 更新失败
            if (err) return res.cc(err)
            // 2. 更新成功，但是影响行数不为 1
            if (result.affectedRows !== 1) return res.cc('更新密码失败')
            res.cc('更新密码成功', 0)
        })
    })
}
// 更新用户头像
exports.updateAvatar = (req, res) => {
    // res.send('updateAvatar')
    const sqlStr = 'update ev_users set user_pic=? where id=?'
    db.query(sqlStr, [req.body.avatar, req.user.id], (err, result) => {
        // 1. 更新失败
        if (err) return res.cc(err)
        // 2. 更新成功，但是影响行数不为 1
        if (result.affectedRows !== 1) return res.cc('更新头像失败')
        res.cc('更新头像成功', 0)
    })
}
// 删除用户
exports.deleteUser = (req, res) => {
    //res.send('deleteUser')
    const sqlStr = 'delete from ev_users where username=?'
    db.query(sqlStr, req.body.username, (err, result) => {
        // 1. 删除失败
        if (err) return res.cc(err)
        if (result.affectedRows === 0) return res.cc('用户不存在')
        // 2. 删除成功，但是影响行数不为 1
        if (result.affectedRows !== 1) return res.cc('删除用户失败')
        res.cc('删除用户成功', 0)
    })
}

