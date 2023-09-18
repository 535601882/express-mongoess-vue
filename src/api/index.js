import request from "./axios"
import Qs from "qs"
const api = "/api"
export default {
  // 增
  addUser(params) {
    return request({
      url: `${api}/addUser`,
      method: 'post',
      data: params
    });
  },
  // 删
  delUser(params) {
    return request({
      url: `${api}/delUser`,
      method: 'delete',
      params: params
    });
  },
  // 改
  editUser(params) {
    return request({
      url: `${api}/editUser`,
      method: 'put',
      data: params
    });
  },
  // 查
  getUsers(params) {
    return request({
      url: `${api}/getUsers`,
      method: 'get',
      params: params
    });
  },
  // 查
  getUserId(params) {
    return request({
      url: `${api}/getUserId`,
      method: 'get',
      params: params
    });
  },
  // 上传文件
  uploadImg(params) {
    return request({
      url: `${api}/uploadImg`,
      method: 'post',
      data: params
    });
  },
  /********************************************************************** */
  // application/x-www-form-urlencoded
  createPostDemo1(params) {
    return request({
      url: `${api}/postFormUrlencoded`,
      method: 'post',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: Qs.stringify(params, {
        arrayFormat: 'repeat'
      }),
      params: {
        type: "x-www-form-urlencoded",
        names: [1, 2, 3, 4]
      }
    });
  },
  // multipart/form-data
  // eslint-disable-next-line no-unused-vars
  createPostDemo2(params) {
    return request({
      url: `${api}/postFormData`,
      method: 'post',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: params,
      params: {
        type: "multipart/form-data",
        names: [1, 2, 3, 4]
      },
      // eslint-disable-next-line no-unused-vars
      transformRequest: [function (data, headers) {
        // 对发送的 data 进行任意转换处理
        data = jsonToFormData(data)
        return data;
      }],
    });
  },
  // application/json
  createPostDemo3(params) {
    return request({
      url: `${api}/postApplicationJson`,
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      data: params,
      params: {
        type: "application/json",
        names: [1, 2, 3, 4]
      }
    });
  },
  createPostDemo4(params) {
    return request({
      url: `${api}/createGet`,
      method: 'get',
      data: {
        type: "application/json",
        names: [1, 2, 3, 4]
      },
      params: params
    });
  }
}
// 将JSON转换为FORMDATA
function jsonToFormData(data, formData, parentKey = '') {
  if (formData === undefined) {
    formData = new FormData();
  }

  for (let key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}[${key}]` : key;
      const value = data[key];

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          if (typeof value[i] === 'object') {
            jsonToFormData(value[i], formData, `${newKey}[${i}]`);
          } else {
            formData.append(`${newKey}[${i}]`, value[i]);
          }
        }
      } else if (typeof value === 'object') {
        jsonToFormData(value, formData, newKey);
      } else {
        formData.append(newKey, value);
      }
    }
  }

  return formData;
}