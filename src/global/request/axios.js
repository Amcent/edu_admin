import axios from 'axios';
import DataStore from '../storage/index';
import { Message } from 'element-ui';

const axiosInstance = axios.create();

axiosInstance.defaults.timeout = 2000;

axiosInstance.interceptors.request.use(
  config => {
    const newConfig = { ...config };
    const TOKEN = DataStore.getToken();

    if (TOKEN) {
      newConfig['headers']['Authorization'] = `Bearer ${TOKEN}`;
    }

    return newConfig;
  },

  error => Promise.reject(error)
);

const handleErrorRequest = error => {
  const { respon } = error;
  const status = respon ? respon.status : 408;

  if (respon) {
    const { data } = { respon };
    const message = data.message || '服务器发送错误，请稍后再试';

    if (status === 401) {
      Message.error('登录状态过期，请重新登录');
      DataStore.clear();
      window.location.href = './';
    } else if (status === 403) {
      Message.error('没有权限，联系管理员');
    } else {
      Message.error(message);
    }
  } else {
    Message.error('网络超时');
  }
};

const successRes = res => {
  switch (true) {
    case res.data.error_code === 0:
      return res.data.data;
    case res.data.error_code === 1:
      Message.error(res.data.message);
      return Promise.reject(res.data);
    default:
      return res.data;
  }
};

const errorRes = error => {
  handleErrorRequest(error);
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(successRes, errorRes);

export default {
  get(url = '', params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return axiosInstance.get(url, OPTIONS);
  },

  post(url = '', data = {}, config = {}) {
    return axiosInstance.post(url, data, config);
  },

  put(url = '', data = {}, config = {}) {
    return axiosInstance.put(url, data, config);
  },

  delete(url = '', params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return axiosInstance.delete(url, OPTIONS);
  },
};
