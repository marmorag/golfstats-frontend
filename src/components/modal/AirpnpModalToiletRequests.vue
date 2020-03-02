<template>
    <v-row justify="center">
        <v-dialog v-model="isOpen" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Reservation for toilet : {{ toilet.title }}</span>
                </v-card-title>
                <v-card-text>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">User</th>
                                    <th class="text-left">Message</th>
                                    <th class="text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            <template v-if="toilet.requests.length > 0">
                                <tr v-for="request in toilet.requests" :key="request.id">
                                    <td>{{ request.user.username }}</td>
                                    <td>{{ request.message }}</td>
                                    <td class="text-right">
                                        <v-btn @click="handleDismissRequest(request)" color="red">
                                            <v-icon color="white">mdi-close</v-icon>
                                        </v-btn>
                                        <v-btn @click="handleAcceptRequest(request)" color="success" class="ml-1">
                                            <v-icon color="white">mdi-check</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="3">
                                        <span>No requests has been is pending.</span>
                                    </td>
                                </tr>
                            </template>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="blue darken-1" text @click="close">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import ModalMixin from '../../mixins/ModalMixin';

export default {
  name: 'AirpnpModalToiletRequests',
  mixins: [ModalMixin],
  props: {
    toilet: {
      type: Object,
    },
  },
  methods: {
    handleSaved() {
      this.$emit('confirmed');
      this.close();
    },
    handleDismissRequest({ id, message }) {
      this.$emit('request:update', { id, message, status: 'dismissed' });
    },
    handleAcceptRequest({ id, message }) {
      this.$emit('request:update', { id, message, status: 'allowed' });
    }
  }
};
</script>