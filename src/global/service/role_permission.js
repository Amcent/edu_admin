import api from '../request/api'
import request from '../request/axios'

const rolePermissionService = {
  create: (params) => {
    return request.post(api.rolePermission, params)
  },

  update: (id, params) => {
    return request.put(api.therolePermission(id), params)
  },
}

export default rolePermissionService
