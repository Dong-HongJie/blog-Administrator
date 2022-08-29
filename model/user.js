/* 存放对用户信息进行操作的方法 */
// 创建用户集合
const mongoose = require("mongoose");
//导入bcrypt
const bcrypt = require('bcrypt');
//引入Joi模块
const Joi = require('joi');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, minlength: 2, maxlength: 20 },
  // unique:true  保证字段不重复
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // 角色字段可以事先约定好，admin是超级管理员、normal是普通用户
  role: { type: String, required: true },
  // 状态字段可以事先约定好，0是启用、1是禁用
  state: { type: Number, default: 0 },
});
const User = mongoose.model("User", userSchema);

//验证用户信息
const validateUser = user => {
    //定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email()(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };

    //实施验证
    return Joi.validate(user, schema);
}

// async function createUser() {
//   const salt = await bcrypt.genSalt(10);
//   const pass = await bcrypt.hash("123456", salt);
//   //创建测试用户
//   const user = await User.create({
//     username: "董小于",
//     email: "donghj1998@qq.com",
//     password: pass,
//     role: "admin",
//     state: 0,
//   });
// }
// 执行该文件
// createUser();

module.exports = { User, validateUser };
