import api from '../request/api'
import request from '../request/axios'

const advertiseMaterialService = {
  create: (params) => {
    return request.post(api.advertiseMaterial, params)
  },

  update: (id, params) => {
    return request.put(api.theadvertiseMaterial(id), params)
  },

  show: (id, params) => {
    return request.get(api.theadvertiseMaterial(id), params)
  },

  delete: (id, params) => {
    return request.delete(api.theadvertiseMaterial(id), params)
  },
  
  sort: (params) => {
    return request.put(api.sortadvertiseMaterial, params)
  },
}

export default advertiseMaterialService
