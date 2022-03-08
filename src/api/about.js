import request from '@/utils/request'

// 获得关于我页面url
export function getAbout() {
  return request({
    url: '/api/about',
    method: 'get',
  })
}
// 设置关于我页面url
export function editAbout(data) {
    return request({
      url: '/api/about',
      method: 'post',
      data
    })
  }