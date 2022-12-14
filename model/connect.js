const mongoose = require('mongoose');
const config = require('config');
mongoose
  .connect(
    `mongodb://${config.get("db.user")}:${config.get("db.pwd")}@${config.get(
      "db.host"
    )}:${config.get("db.port")}/${config.get("db.name")}`
  )
  .then(() => console.log("数据库连接成功"))
  .catch(() => console.log("数据库连接失败"));