import api from '../request/api'
import request from '../request/axios'

const permissionGroupService = {
  index: (params) => {
    return request.get(api.permissionGroup, params)
  },
}

export default permissionGroupService
