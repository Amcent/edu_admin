import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    course: null,
    permissions: [],
  },
  getters: {},
  mutations: {
    setCourse(state, playload) {
      state.course = playload;
    },

    setPermissions(state, playload) {
      state.permissions = playload;
    },
  },
  actions: {},
  modules: {},
});
