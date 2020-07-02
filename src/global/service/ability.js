import api from '../request/api';
import request from '../request/axios';

const abilityService = {
  index: params => {
    return request.get(api.ability, params);
  },

  create: params => {
    return request.post(api.ability, params);
  },

  update: (id, params) => {
    return request.put(api.theAbility(id), params);
  },

  show: id => {
    return request.get(api.theAbility(id));
  },

  delete: id => {
    return request.delete(api.theAbility(id));
  },
};

export default abilityService;
