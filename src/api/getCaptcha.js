import request from '@/utils/request'

export async function getCaptcha() {
  return request({
    url: '/res/captcha',
    method: 'get',
  })
}