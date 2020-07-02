import api from '../request/api';
import request from '../request/axios';

const sectionService = {
  create: params => {
    return request.post(api.section, params);
  },

  update: (id, params) => {
    return request.put(api.theSection(id), params);
  },

  show: id => {
    return request.get(api.theSection(id));
  },

  delete: id => {
    return request.delete(api.theSection(id));
  },

  sort: params => {
    return request.put(api.sortSection, params);
  },
};

export default sectionService;
