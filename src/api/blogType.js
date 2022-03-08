import request from '@/utils/request'

// 获取文章分类
export function getBlogType() {
    return request({
      url: '/api/blogtype',
      method: 'get',
    })
}
  
// 添加分类
export function postBlogType(data) {
    return request({
      url: '/api/blogtype',
      method: 'post',
      data
    })
}
  
// 查找某一个文章分类
export function getOneBlogType(id) {
    return request({
      url: `/api/blogtype/${id}`,
      method: 'get',
    })
}

// 修改分类
export function putBlogType(editInfo) {
    return request({
      url: `/api/blogtype/${editInfo.id}`,
      method: 'put',
      data: editInfo.data,
    })
}

// 删除分类
export function deleteBlogType(id) {
    return request({
      url: `/api/blogtype/${id}`,
      method: 'delete',
    })
}