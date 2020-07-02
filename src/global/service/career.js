import api from '../request/api';
import request from '../request/axios';

const careerService = {
  index: params => {
    return request.get(api.career, params);
  },

  create: params => {
    return request.post(api.career, params);
  },

  update: (id, params) => {
    return request.put(api.theCareer(id), params);
  },

  show: id => {
    return request.get(api.theCareer(id));
  },

  delete: id => {
    return request.delete(api.theCareer(id));
  },
};

export default careerService;
