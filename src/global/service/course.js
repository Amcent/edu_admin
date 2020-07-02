import api from '../request/api';
import request from '../request/axios';

const courseService = {
  index: params => {
    return request.get(api.course, params);
  },

  create: params => {
    return request.post(api.course, params);
  },

  update: (id, params) => {
    return request.put(api.theCourse(id), params);
  },

  show: id => {
    return request.get(api.theCourse(id));
  },

  delete: id => {
    return request.delete(api.theCourse(id));
  },
};

export default courseService;
