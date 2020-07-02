import api from '../request/api';
import request from '../request/axios';

const taskService = {
  create: params => {
    return request.post(api.task, params);
  },

  update: (id, params) => {
    return request.put(api.theTask(id), params);
  },

  show: id => {
    return request.get(api.theTask(id));
  },

  delete: id => {
    return request.delete(api.theTask(id));
  },

  sort: params => {
    return request.put(api.sortTask, params);
  },
};

export default taskService;
