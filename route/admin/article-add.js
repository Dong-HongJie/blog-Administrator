const formidable = require("formidable"); //能接受二进制
const path = require("path");
const { Article } = require("../../model/article");

module.exports = (req, res) => {
  //创建表单解析对象
  const form = new formidable.IncomingForm();
  //配置上传文件的存放位置:这里用绝对路径
  form.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");
  //保留上传文件后缀  默认是不保留(就会出现上传的图片没后缀)，所以这里手动改为true
  form.keepExtensions = true;
  form.parse(req,  async (err, fields, files) => {
    //err 错误信息
    //fields 对象类型，普通表单数据
    //files  对象类型，保存和上传文件相关的数据
    // // 截取这部分路径，访问时拼接上访问地址就好了
    // res.send(files.cover.filepath.split("public")[1]);
    await Article.create({
      title: fields.title,
      author: fields.author,
      publishDate: fields.publishDate,
      cover: files.cover.filepath.split("public")[1],
      content: fields.content,
    });
    //重定向到文章列表页面
    res.redirect("/admin/article");
  })
};
