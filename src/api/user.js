import request from '@/utils/request'

// 用户登录
export function loginApi(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

// 得到用户信息
export function getInfoApi() {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}

// 修改用户信息
export function putInfoApi(data) {
  return request({
    url: '/api/admin',
    method: 'put',
    data
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
