import axios from 'axios';

/**
 * @return {AxiosInstance}
 */
const createHttpClient = (store) => {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const interceptor = async (config) => {
    const isLogged = await store.getters['auth/isUserLogged'];

    if (isLogged) {
      const token = await store.getters['auth/getToken'];
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };

  const instance = axios.create(options);
  instance.interceptors.request.use((config) => interceptor(config));

  return instance;
};

/**
 * @return {AxiosInstance}
 */
const createDefaultHttpClient = () => {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return axios.create(options);
};

export { createHttpClient, createDefaultHttpClient };