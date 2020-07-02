import api from '../request/api';
import request from '../request/axios';

const chapterService = {
  create: params => {
    return request.post(api.chapter, params);
  },

  update: (id, params) => {
    return request.put(api.theChapter(id), params);
  },

  show: id => {
    return request.get(api.theChapter(id));
  },

  delete: id => {
    return request.delete(api.theChapter(id));
  },

  sort: params => {
    return request.put(api.sortChapter, params);
  },
};

export default chapterService;
