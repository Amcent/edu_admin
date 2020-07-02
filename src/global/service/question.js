import api from '../request/api';
import request from '../request/axios';

const questionService = {
  index: params => {
    return request.get(api.question, params);
  },

  create: params => {
    return request.post(api.question, params);
  },

  update: (id, params) => {
    return request.put(api.theQuestion(id), params);
  },

  show: id => {
    return request.get(api.theQuestion(id));
  },

  delete: id => {
    return request.delete(api.theQuestion(id));
  },
};

export default questionService;
