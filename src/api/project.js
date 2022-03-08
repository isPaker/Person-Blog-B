import request from '@/utils/request'

// 添加项目
export function addProject(data) {
  return request({
    url: '/api/project',
    method: 'post',
    data
  })
}

// 获取项目列表
export function getAllProject() {
    return request({
      url: '/api/project',
      method: 'get',
    })
}

// 删除项目
export function deleteProject(id) {
    return request({
      url: `/api/project/${id}`,
      method: 'delete',
    })
}

// 修改项目内容
export function editProject(id, data) {
    return request({
      url: `/api/project/${id}`,
      method: 'put',
      data
    })
}