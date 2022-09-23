module.exports = (req, res) => {
  req.session.destroy(()=>{
    //删除cookies
    res.clearCookie("connect.sid");
    //重定向到用户登录页面
    res.redirect("/admin/login");
    // 清除模板中的用户信息
    req.app.locals.userInfo = null;
  })
}