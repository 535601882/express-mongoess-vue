import request from "./axios"
const api = "/api"
export default {
  // 增
  addUser(params){
    return request({ url: `${api}/addUser`, method: 'post', data: params});
  },
  // 删
  delUser(params){
    return request({ url: `${api}/delUser`, method: 'delete', params: params});
  },
  // 改
  editUser(params){
    return request({ url: `${api}/editUser`, method: 'put', params: params});
  },
  // 查
  getUsers(params){
    return request({ url: `${api}/getUsers`, method: 'get', params: params});
  },
  // 查
  getUserId(params){
    return request({ url: `${api}/getUserId`, method: 'get', params: params});
  }
}
