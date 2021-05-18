const User = require("./users")

class API{
  getUsers(req, res){
    let response = res
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
    response.send({
      status: 200,
      message: '',
      result: 'result'
    })
    /*User.findOne({_id: req.query.id},(err, result, res) => {
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
    })*/

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
    res.send({
      status: 200,
      message: '编辑成功'
    })
  }
}
const api = new API()
module.exports = api
