const express = require('express');
const path = require('path');
// 引入body-parser，处理post请求参数
const bodyParser = require('body-parser');
// // 导入日期处理模块
// const dateFormat = require('dateformat');
// // 导入art-template模板引擎
// const template = require('art-template');
// template.defaults.imports.dateFormat = dateFormat;
//导入express-session模块
const session = require('express-session');
// 导入morgan模块
const morgan = require('morgan');
// 导入config模块
const config = require("config");
const app = express();
// 数据库连接
require('./model/connect')

//使用use中间件做请求拦截去处理post参数
app.use(bodyParser.urlencoded({extended:false})) 

//使用use中间件做请求拦截去处理配置session
app.use(session({
    resave: false, //添加 resave 选项
    saveUninitialized: false, //添加 saveUninitialized 选项
    secret: 'secret key',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 模板框架相关配置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.engine('art', require('express-art-template'))
// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))

console.log(config.get('title'));

// 获取系统环境变量
if(process.env.NODE_ENV === 'development') {
  // 打印客户端的请求信息
  app.use(morgan('dev'))
}

// 引入路由并让路由去处理请求
const home = require('./route/home');
const admin = require("./route/admin");

//拦截请求判断用户登录状态
app.use("/admin", require("./middleware/loginGuard"));

app.use('/home', home)
app.use("/admin", admin);

// 定义错误处理中间件
app.use((err, req, res, next) => {
  //将字符串对象转换为对象类型
  const result = JSON.parse(err);

  let params = [];
  // // result的项目不定，所以用for循环来拼接
  for (let attr in result) {
    if (attr != "path") {
      params.push(attr + "=" + result[attr]);
    }
  }

  res.redirect(`${result.path}?${params.join("&")}`);
});

app.listen(80)
console.log("网站服务器启动成功，请访问localhost/home");