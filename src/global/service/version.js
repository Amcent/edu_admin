import api from '../request/api';
import request from '../request/axios';

const versionService = {
  create: params => {
    return request.post(api.version, params);
  },

  update: (id, params) => {
    return request.put(api.theVersion(id), params);
  },

  show: id => {
    return request.get(api.theVersion(id));
  },

  delete: id => {
    return request.delete(api.theVersion(id));
  },

  sort: params => {
    return request.put(api.sortVersion, params);
  },
};

export default versionService;
