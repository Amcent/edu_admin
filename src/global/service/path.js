import api from '../request/api';
import request from '../request/axios';

const pathService = {
  create: params => {
    return request.post(api.path, params);
  },

  update: (id, params) => {
    return request.put(api.thePath(id), params);
  },

  show: id => {
    return request.get(api.thePath(id));
  },

  delete: id => {
    return request.delete(api.thePath(id));
  },

  sort: params => {
    return request.put(api.sortPath, params);
  },
};

export default pathService;
