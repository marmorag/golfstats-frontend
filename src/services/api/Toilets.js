export default class Toilets {
  constructor(httpClient) {
    this.client = httpClient;
  }

  getForUser(id) {
    return new Promise((resolve) => {
      this.client.get(`${process.env.VUE_APP_API_ENDPOINT}/users/${id}?join=toilets`)
        .then((response) => {
          resolve({ status: true, data: response.data.toilets });
        })
        .catch((error) => {
          resolve({ status: false, message: error.message });
        });
    });
  }

  createToilet(coordinates, description, title) {
    return new Promise(((resolve) => {
      this.client.post(`${process.env.VUE_APP_API_ENDPOINT}/toilets`, {
        coordinates,
        description,
        title,
      })
        .then((response) => {
          resolve({ status: true, data: response });
        })
        .catch((error) => {
          resolve({ status: false, message: error.message });
        });
    }));
  }

  getNToilets(lat, lng, maxMarker) {
    return new Promise(((resolve) => {
      this.client.get(`${process.env.VUE_APP_API_ENDPOINT}/toilets?s={"coordinates":{"type":"Point","coordinates":[${lat}, ${lng}]}}&limit=${maxMarker}`)
        .then((response) => {
          resolve({ status: true, data: response.data });
        })
        .catch((error) => {
          resolve({ status: false, message: error.message });
        });
    }));
  }
}
