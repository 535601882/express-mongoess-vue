//4.有了模型构造函数以后，使用这个构造函数对 users 集合中的数据进行操作(增删改查)
const User = require("./users")

class API{
  getUsers(req, res){
    let response = res
    // 查询文档可以用 model 的 find, findById, findOne, 和 where 这些静态方法
    User.find(req.query, null, {sort: '-date'}, (err, result, res) => {
      if(err) {
        response.send({
          status: 0,
          message: '查询失败'
        })
        return
      }
      response.send({
        status: 200,
        message: '',
        result: result
      })
    })

  }
  getUserId(req, res){
    let response = res
    console.log(req.query)
    User.findOne({_id: req.query.id},(err, result, res) => {
      if(err) {
        response.send({
          status: 0,
          message: '查询失败'
        })
        return
      }
      response.send({
        status: 200,
        message: '',
        result: result
      })
    })
  }
  addUser(req, res){
    let response = res
    console.log(req.body)
    User.create(req.body,function(err, res) {
      if (err) {
        response.send({
          status: 0,
          message: '添加失败'
        })
      } else {
        response.send({
          status: 200,
          message: '添加成功'
        })
      }
    });

  }
  delUser(req, res){
    let response = res
    User.deleteOne({ _id: req.query.id }, function (err) {
      if (err) {
        response.send({
          status: 0,
          message: '删除失败'
        })
      } else {
        response.send({
          status: 200,
          message: '删除成功'
        })
      }
    });
  }
  editUser(req, res){
    let response = res
    console.log(req.body)
    // model 的 remove 方法可以删除所有匹配查询条件（ conditions ）的文档
    // 更新单独一条文档并且返回给应用层，可以使用 findOneAndUpdate 方法
    User.findByIdAndUpdate(req.body._id, req.body, function (err,ret) {
      if(err) {
        response.send({
          status: 0,
          message: '编辑失败'
        })
      } else {
        response.send({
          status: 200,
          message: '编辑成功'
        })
      }
    })
  }
}
const api = new API()
module.exports = api
