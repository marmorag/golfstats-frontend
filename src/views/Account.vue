<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" offset="3">
        <span class="display-1">Account</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" offset="3">
        <v-sheet elevation="3" tile class="pa-5">
          <v-row>
            <v-col cols="1">
              <AirpnpUserAvatar color="primary" font-color="white"/>
            </v-col>
            <v-col cols="8">
              <v-row>
                <span class="title">{{ details.username }}</span>
              </v-row>
              <v-row>
                <span class="body-1">{{ details.email }}</span>
              </v-row>
              <v-row>
                <span class="font-weight-thin">Member since {{ memberSince }}</span>
              </v-row>
            </v-col>
            <v-col>
              <v-row class="mb-1">
                <v-btn @click="handleEditProfileClick">Edit profile</v-btn>
              </v-row>
              <v-row>
                <v-btn @click="handleDeleteProfileClick" color="grey darken-3" class="red--text">Delete account</v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <AirpnpModalEditProfile ref="editProfileModal" @saved="handleEditProfile"/>
    <AirpnpModalDeleteProfile ref="deleteProfileModal" @confirmed="handleDeleteProfile"/>
  </v-container>
</template>

<script>
import { format } from 'date-fns';
import UserApi from '../services/api/User';
import MessageBus from '../services/messageBus';
import AirpnpUserAvatar from '../components/AirpnpUserAvatar.vue';
import AirpnpModalEditProfile from '../components/modal/AirpnpModalEditProfile.vue';
import AirpnpModalDeleteProfile from '../components/modal/AirpnpModalDeleteProfile.vue';
import HttpClientMixin from '../mixins/HttpClientMixin';

export default {
  name: 'Account',
  mixins: [HttpClientMixin],
  components: { AirpnpUserAvatar, AirpnpModalEditProfile, AirpnpModalDeleteProfile },
  created() {
    this.userApi = new UserApi(this.httpClient);

    this.userApi.getDetails().then((result) => {
      this.details = result.status ? result.data : {};
    });
  },
  data() {
    return {
      details: {},
    };
  },
  computed: {
    memberSince() {
      if (this.details.createdAt) {
        const date = new Date(this.details.createdAt);
        return format(date, 'iiii i MMMM uuuu');
      }
      return 'N/C';
    }
  },
  methods: {
    handleEditProfileClick() {
      this.$refs.editProfileModal.open();
    },
    async handleEditProfile(data) {
      const result = await this.userApi.update(data);

      if (result.status) {
        Object.assign(this.details, data);
        MessageBus.$emit('toast', { color: 'success', message: 'Successfully updated.' });
      } else {
        MessageBus.$emit('toast', { color: 'danger', message: 'An error occured while updating your profile.' });
      }
    },
    handleDeleteProfileClick() {
      this.$refs.deleteProfileModal.open();
    },
    async handleDeleteProfile() {
      const result = await this.userApi.delete(this.details.id);

      if (result.status) {
        MessageBus.$emit('toast', { color: 'success', message: 'Successfully deleted account.' });
        setTimeout(() => {
          this.$router.push({ name: 'logout' });
        }, 1500);
      } else {
        MessageBus.$emit('toast', { color: 'danger', message: 'An error occured while deleting your profile.' });
      }
    }
  }
};
</script>
