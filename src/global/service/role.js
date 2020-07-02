import api from '../request/api';
import request from '../request/axios';

const roleService = {
  index: params => {
    return request.get(api.role, params);
  },

  create: params => {
    return request.post(api.role, params);
  },

  update: (id, params) => {
    return request.put(api.theRole(id), params);
  },

  show: id => {
    return request.get(api.theRole(id));
  },

  delete: id => {
    return request.delete(api.theRole(id));
  },
};

export default roleService;
