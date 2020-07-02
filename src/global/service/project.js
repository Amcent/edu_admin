import api from '../request/api';
import request from '../request/axios';

const projectService = {
  index: params => {
    return request.get(api.project, params);
  },

  create: params => {
    return request.post(api.project, params);
  },

  update: (id, params) => {
    return request.put(api.theProject(id), params);
  },

  show: id => {
    return request.get(api.theProject(id));
  },

  delete: id => {
    return request.delete(api.theProject(id));
  },
};

export default projectService;
