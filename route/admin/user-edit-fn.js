//引入用户集合的构造
const {
    User,
    validateUser
} = require('../../model/user');

//引入加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {

    // try { 
    //     await validateUser(req.body)
    // } catch (e) {
    //     //验证没有通过
    //     //e.message
    //     //重定向用户添加页面
    //     //return res.redirect(`/admin/user-edit?message=${e.message}`);

    //     //JSON.stringify()将对象数据类型转换为字符串数据类型，即简写了上面的东西
    //     // 因为next方法的参数是字符串，所以将这里的对象变为json字符串，再由app.js里的中间件拦截处理

    //     return next(
    //       encodeURIComponent(JSON.stringify({
    //         path: "/admin/user-edit",
    //         message: e.message,
    //       }))
    //     );
    // }
    console.log('账号没问题');
    // //根据邮箱地址查询用户是否存在
    // let user = await User.findOne({
    //     email: req.body.email
    // });
    // //如果用户已经存在 邮箱地址已经被别人占用
    // if (user) {
    //     //重定向用户添加页面
    //     //return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`)
    //     return next(
    //       encodeURIComponent(JSON.stringify({
    //         path: "/admin/user-edit",
    //         message: "邮箱地址已经被占用",
    //       }))
    //     );
    // }
    // //对密码进行加密处理
    // //生成随机字符串
    // const salt = bcrypt.genSalt(10);
    // //加密
    // const password = bcrypt.hash(req.body.password, salt);
    // //替换密码
    // req.body.password = password;
    // //将用户信息添加到数据库中
    // await User.create(req.body);
    // //将页面重定向到用户列表页面
    // res.redirect('/admin/user')

}