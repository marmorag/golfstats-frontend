<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" offset="3">
        <span class="display-1">My Toilets</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" offset="3">
        <template v-for="toilet in toilets" >
          <AirpnpToiletItem :toilet="toilet" :key="toilet.id" @show="handleShowReservation" />
        </template>
      </v-col>
    </v-row>
    <AirpnpModalToiletRequests ref="modalShowReservation" :toilet="showedToilet" @request:update="handleRequestUpdate"/>
  </v-container>
</template>

<script>
import HttpClientMixin from '../mixins/HttpClientMixin';
import AirpnpToiletItem from '../components/AirpnpToiletItem.vue';
import AirpnpModalToiletRequests from '../components/modal/AirpnpModalToiletRequests.vue';
import ToiletsApi from '../services/api/Toilets';
import RequestsApi from '../services/api/Requests';
import MessageBus from '../services/messageBus';

export default {
  name: 'Toilets',
  components: { AirpnpToiletItem, AirpnpModalToiletRequests },
  mixins: [HttpClientMixin],
  created() {
    this.requestsApi = new RequestsApi(this.httpClient);
    this.toiletsApi = new ToiletsApi(this.httpClient);
    const userId = this.$store.getters['auth/getUser'].id;

    this.toiletsApi.getForUser(userId).then((result) => {
      if (result.status) {
        this.toilets = result.data;
      } else {
        MessageBus.$emit('toast', { color: 'danger', message: 'Failed to load your toilets.' });
      }
    });
  },
  data() {
    return {
      toilets: [],
      showedToilet: {
        id: null,
        title: null,
        requests: [],
      },
    };
  },
  methods: {
    async handleShowReservation({ id, title }) {
      [this.showedToilet.id, this.showedToilet.title] = [id, title];
      const result = await this.requestsApi.getPendingForToilet(id);

      if (result.status) {
        this.showedToilet.requests = result.data;
        this.$refs.modalShowReservation.open();
      } else {
        MessageBus.$emit('toast', { color: 'danger', message: 'Failed to load requests.' });
      }
    },
    async handleRequestUpdate(toiletRequest) {
      const result = await this.requestsApi.update(toiletRequest);

      if (result.status) {
        this.showedToilet.requests.filter((req) => req.id !== toiletRequest.id);
        MessageBus.$emit('toast', { color: 'success', message: 'Successfully updated request.' });
      } else {
        MessageBus.$emit('toast', { color: 'success', message: `Error while updating request : ${result.message}` });
      }
    }
  }
};
</script>
