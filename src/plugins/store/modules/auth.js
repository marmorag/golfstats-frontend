import UserApi from '../../../services/api/User';
import User from '../../../services/entity/User';
import { createHttpClient } from '../../../services/client';

const authState = {
  user: {
    token: null,
    logged: false,
    user: null,
  },
  initialized: false,
  api: null,
  error: {
    status: false,
    message: '',
  },
};

const mutations = {
  INIT: (state, { client, user }) => {
    state.user = user;
    state.api = new UserApi(client);
    state.initialized = true;
  },
  LOGIN: (state, token) => {
    state.user.logged = true;
    state.user.token = token;
    state.user.user = User.fromToken(token);
  },
  LOGOUT: (state) => {
    state.user.logged = false;
    state.user.token = null;
    state.user.user = null;
  },
  LOADING: (state, status) => {
    state.isRunningCall = status;
  },
  ERROR: (state, { status, message }) => {
    state.error.status = status;
    state.error.message = message;
  },
};

const actions = {
  initStore(store) {
    if (!store.state.initialized) {
      const token = window.$cookies.get('token');
      const client = createHttpClient(store);
      store.commit('INIT', { client, user: { token, logged: !!token, user: User.fromToken(token) } });
    }
  },
  async login({ commit, state }, credentials) {
    if (state.user.token) {
      return { status: true };
    }

    commit('LOADING', true);
    const result = await state.api.login(credentials);
    commit('LOADING', false);

    if (result.status) {
      window.$cookies.set('token', result.token);
      commit('LOGIN', result.token);
    } else {
      commit('ERROR', result.message);
    }

    return result;
  },
  async logout({ commit }) {
    window.$cookies.remove('token');
    commit('LOGOUT');
  },
};

const getters = {
  getUser: (state) => state.user.user,
  getToken: (state) => state.user.token,
  isUserLogged: (state) => state.user.logged,
  isLoading: (state) => state.isRunningCall,
};

export default {
  namespaced: true,
  state: authState,
  mutations,
  actions,
  getters,
};
