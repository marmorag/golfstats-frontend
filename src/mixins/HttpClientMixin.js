import { createHttpClient, createDefaultHttpClient } from '../services/client';

export default {
  created() {
    this.httpClient = createHttpClient(this.$store);
    this.defaultHttpClient = createDefaultHttpClient();
  }
};