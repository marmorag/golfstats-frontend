export default class Toilets {
  constructor(httpClient) {
    this.client = httpClient;
  }

  getPendingForToilet(id) {
    return new Promise((resolve) => {
      this.client.get(`${process.env.VUE_APP_API_ENDPOINT}/toilet-requests?filter=toiletId||$eq||${id}&filter=status||$eq||pending`)
        .then((response) => {
          resolve({ status: true, data: response.data });
        })
        .catch((error) => {
          resolve({ status: false, message: error.message });
        });
    });
  }

  update({ id, status, message }) {
    return new Promise((resolve) => {
      this.client.patch(`${process.env.VUE_APP_API_ENDPOINT}/toilet-requests/${id}`, { status, message })
        .then((response) => {
          resolve({ status: true, data: response.data });
        })
        .catch((error) => {
          resolve({ status: false, message: error.message });
        });
    });
  }

  book(message, heure, toiletId) {
    return new Promise(((resolve) => {
      this.client.post(`${process.env.VUE_APP_API_ENDPOINT}/toilets/${toiletId}/requests`, {
        message,
        heure
      })
        .then((response) => {
          resolve({ status: true, data: response });
        })
        .catch((error) => {
          resolve({ status: false, message: error.message });
        });
    }));
  }
}
