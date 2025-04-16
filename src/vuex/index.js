import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app'
import id from './modules/id'
import user from './modules/user'
import pictures from './modules/pictures';

import getters from './getters'

Vue.use(Vuex);
// 登录验证
export default new Vuex.Store({
  modules: {
    app,
    id,
    user,
    pictures
  },
  getters
})