import api from '../request/api';
import request from '../request/axios';

const advertiseService = {
  index: params => {
    return request.get(api.advertise, params);
  },

  create: params => {
    return request.post(api.advertise, params);
  },

  update: (id, params) => {
    return request.put(api.theAdvertise(id), params);
  },

  show: id => {
    return request.get(api.theAdvertise(id));
  },

  delete: id => {
    return request.delete(api.theAdvertise(id));
  },
};

export default advertiseService;
