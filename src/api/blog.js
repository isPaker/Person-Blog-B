import request from '@/utils/request'


// 发布文章
export function postBlog(data) {
  return request({
    url: '/api/blog',
    method: 'post',
    data
  })
}

// 分页获取文章
export function getBlog(page=1, limit=10) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page,
      limit,
    }
  })
}

// 删除文章
export function deleteBlog( id ) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete',
  })
}

// 编辑文章
export function editBlog(obj) {
  return request({
    url: `/api/blog/${obj.id}`,
    method: 'put',
    data: obj.data
  })
}

// 获取单篇文章
export function getOneBlog( id ) {
  return request({
    url: `/api/blog/${id}`,
    method: 'get',
  })
}