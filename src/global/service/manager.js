import api from '../request/api';
import request from '../request/axios';

const managerService = {
  index: params => {
    return request.get(api.manager, params);
  },

  create: params => {
    return request.post(api.manager, params);
  },

  update: (id, params) => {
    return request.put(api.theManager(id), params);
  },

  show: id => {
    return request.get(api.theManager(id));
  },

  delete: id => {
    return request.delete(api.theManager(id));
  },
};

export default managerService;
