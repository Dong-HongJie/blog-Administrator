//引入用户集合的构造
const {
    User,
    validateUser
} = require('../../model/user');

//引入加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    // res.send(req.query)
    try {
        // 捕获注册信息的验证错误
        await validateUser(req.body);
    } catch(e) {
      console.log(e.message);
      // 验证没有通过，应该重定向回该页面，并把错误信息渲染到页面
      // return res.redirect(`/admin/user-edit?message=${e.message}`);
      // next方法可以触发错误拦截中间件
     //  传递{path:'/admin/user-edit',message = e.message}参数，而next()只能传字符串，所以要用Json.stringify()
      return next(JSON.stringify({path:'/admin/user-edit', message: e.message}));
    }
    // 如果验证没有问题，先验证用户是否存在，避免重复注册
    let user = await User.findOne({email:req.body.email});
    if (user) {
      // res.redirect内部继承了res.end，而res.end后面还有执行的代码就会报错，所以前面加上return，使得代码不向下执行
    //   return res.redirect(`/admin/user-edit?message=邮箱地址被占用`);
      return next(
        JSON.stringify({ path: "/admin/user-edit", message: "邮箱地址被占用" })
      );
    }
    // 用户注册信息没问题，就注册吧。
    // 注意密码要加密后进行处理
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    req.body.password = password;
    // 将用户信息添加到数据库
    await User.create(req.body);
    return res.redirect(`/admin/user`);
}