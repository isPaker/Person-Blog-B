import request from '@/utils/request'

// 修改设置
export function putSetting(data) {
  return request({
    url: '/api/setting',
    method: 'put',
    data
  })
}

// 获取设置
export function getSetting() {
  return request({
    url: '/api/setting',
    method: 'get',
  })
}