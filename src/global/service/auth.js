import api from '../request/api';
import request from '../request/axios';
import DataStore from '../storage/index';

const authService = {
  getSmsCode(params) {
    return request.post(api.smsSend, params);
  },

  smsLogin(params) {
    return request.post(api.smsLogin, params).then(res => {
      DataStore.setToken(res.token);
      DataStore.setUserInfo(res.manager);
      return res;
    });
  },

  getPermission() {
    return request.get(api.getPermissions);
  },
};

export default authService;
