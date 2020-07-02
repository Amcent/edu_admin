import api from '../request/api';
import request from '../request/axios';

const companyService = {
  index: params => {
    return request.get(api.company, params);
  },

  create: params => {
    return request.post(api.company, params);
  },

  update: (id, params) => {
    return request.put(api.theCompany(id), params);
  },

  show: id => {
    return request.get(api.theCompany(id));
  },

  delete: id => {
    return request.delete(api.theCompany(id));
  },
};

export default companyService;
