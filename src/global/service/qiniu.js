import api from '../request/api';
import request from '../request/axios';
import * as qiniu from 'qiniu-js';

const QINIU_PREFIX = 'edu_pro_qiniu';
const qiniuService = {
  token: () => {
    return request.get(api.qiniuToken);
  },

  upload: (file, token, mimeType = null, params = {}) => {
    return new Promise((resolve, reject) => {
      const fname = file.name;
      const key = QINIU_PREFIX + Date.now() + fname;
      const putExtra = { fname, params, mimeType };
      const observable = qiniu.upload(file, key, token, putExtra);
      observable.subscribe({
        next() {},
        error(err) {
          reject(err);
        },
        complete(res) {
          resolve(res);
        },
      });
    });
  },

  start: async file => {
    const { domain, token } = await qiniuService.token();
    const upload = await qiniuService.upload(file, token);
    const imgUrl = `http://${domain}/${upload.key}`;

    return imgUrl;
  },
};

export default qiniuService;
