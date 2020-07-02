import api from '../request/api'
import request from '../request/axios'

const careerCourseService = {
  create: (params) => {
    return request.post(api.careerCourse, params)
  },

  update: (id, params) => {
    return request.put(api.theCareerCourse(id), params)
  },

  delete: (id, params) => {
    return request.delete(api.theCareerCourse(id), params)
  },

  sort: (params) => {
    return request.put(api.sortCareerCourse, params)
  },
}

export default careerCourseService
