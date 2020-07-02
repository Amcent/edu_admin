import MyStorage from './storage';

class DataStore {
  constructor() {
    this.init();
  }

  init() {
    this.map = new Map();
    this.storage = new MyStorage();
  }

  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  getToken() {
    return this.storage.get('admin_token');
  }

  setToken(token) {
    return this.storage.set('admin_token', token);
  }

  removeToken() {
    localStorage.clear();
  }

  getUserInfo() {
    return this.storage.get('userInfo');
  }

  setUserInfo(userInfo) {
    return this.storage.set('userInfo', userInfo);
  }

  clear() {
    localStorage.clear();
  }
}

export default DataStore.getInstance();
