import api from '../request/api';
import request from '../request/axios';

const materialService = {
  index: params => {
    return request.get(api.material, params);
  },

  create: params => {
    return request.post(api.material, params);
  },

  update: (id, params) => {
    return request.put(api.theMaterial(id), params);
  },

  show: id => {
    return request.get(api.theMaterial(id));
  },

  delete: id => {
    return request.delete(api.theMaterial(id));
  },
};

export default materialService;
