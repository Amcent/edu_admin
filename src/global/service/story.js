import api from '../request/api';
import request from '../request/axios';

const storyService = {
  create: params => {
    return request.post(api.story, params);
  },

  update: (id, params) => {
    return request.put(api.theStory(id), params);
  },

  show: id => {
    return request.get(api.theStory(id));
  },

  delete: id => {
    return request.delete(api.theStory(id));
  },

  sort: params => {
    return request.put(api.sortStory, params);
  },
};

export default storyService;
