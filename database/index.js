// import note from "./note"

class API{
  getList(req, res){
    res.send({
      status: 0,
      type: 'FORM_DATA_ERROR',
      message: '表单信息错误'
    })
  }
}
const api = new API()
module.exports = api