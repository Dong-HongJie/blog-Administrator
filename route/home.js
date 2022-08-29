const express = require("express");
let home = express.Router()

home.get('/', (req, res) => {
  res.send('欢迎来到博客首页')
})

module.exports = home;