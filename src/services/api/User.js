export default class User {
  constructor(httpClient) {
    this.client = httpClient;
  }

  async login(credentials) {
    return new Promise((resolve) => {
      this.client.post(`${process.env.VUE_APP_API_ENDPOINT}/auth/login`, credentials)
        .then((res) => {
          resolve({ status: true, token: res.data.access_token });
        })
        .catch((error) => {
          resolve({ status: false, message: error.response.data.message });
        });
    });
  }

  async register(credentials) {
    return new Promise((resolve) => {
      this.client.post(`${process.env.VUE_APP_API_ENDPOINT}/auth/register`, credentials)
        .then(() => {
          resolve({ status: true });
        })
        .catch((error) => {
          resolve({ status: false, message: error.message });
        });
    });
  }

  async getDetails(user) {
    return new Promise((resolve) => {
      this.client.get(`${process.env.VUE_APP_API_ENDPOINT}/users/${user.id}`)
        .then((response) => {
          resolve({ status: true, data: response.data });
        })
        .catch((error) => {
          resolve({ status: false, message: error.message });
        });
    });
  }

  async update(user) {
    return new Promise((resolve) => {
      this.client.put(`${process.env.VUE_APP_API_ENDPOINT}/users/${user.id}`, user)
        .then(() => {
          resolve({ status: true });
        })
        .catch((error) => {
          resolve({ status: false, message: error });
        });
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      this.client.delete(`${process.env.VUE_APP_API_ENDPOINT}/users/${id}`)
        .then(() => {
          resolve({ status: true });
        })
        .catch((error) => {
          resolve({ status: false, message: error });
        });
    });
  }
}
