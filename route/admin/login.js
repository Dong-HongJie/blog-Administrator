const { User } = require("../../model/user");
//导入bcrypt
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  // 对post中的参数，进行二次验证。因为虽然前端部分在JS中验证了一次，但是前端可以禁止JS代码的执行，从而无法验证
  const { email, password } = req.body;
  if (email.trim().length === 0 || password.trim().length === 0) {
    // 设置状态码和提示
    // return res.status(400).send("邮箱或密码错误");
    return res.status(400).render("admin/error", { msg: "邮箱或密码错误" });
  }
  // 根据邮箱查询用户信息
  let user = await User.findOne({ email });
  if (user) {
    //将客户端传递过来的密码和用户信息中的密码进行比对
    //true 比对成功
    //false比对失败
    let isValid = await bcrypt.compare(password, user.password);
    //如果密码比对成功
    if (isValid) {
      //登录成功
      //将用户名存储在请求对象中
      req.session.username = user.username;
      //将用户角色存储在session对象中
      req.session.role = user.role;
      //通过locals对象来存储信息，便于在模板中拿到
      req.app.locals.userInfo = user;
      // res.redirect("/admin/user");
      //对用户的角色进行判断
      if (user.role == "admin") {
        //重定向到用户列表页
        res.redirect("/admin/user");
      }
      //重定向到博客首页
      else res.redirect("/home/");
    } else {
      //密码错误
      res.status(400).render("admin/error", {
        msg: "邮箱地址或密码错误",
      });
    }
  } else {
    // 没有查询到用户
    return res.status(400).render("admin/error", { msg: "邮箱或密码错误" });
  }
};

module.exports = login;
