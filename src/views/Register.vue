<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Registration form</v-toolbar-title>
                        <v-spacer />
                    </v-toolbar>
                    <v-card-text>
                        <GolfstatsUserForm v-model="user" @sumitted="handleRegister"/>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" @click="handleCancel">Cancel</v-btn>
                        <v-btn color="primary" @click="handleRegister">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import UserApi from '../services/api/User';
import MessageBus from '../services/messageBus';
import GolfstatsUserForm from '../components/GolfstatsUserForm.vue';
import HttpClientMixin from '../mixins/HttpClientMixin';

export default {
  name: 'Login',
  components: { GolfstatsUserForm },
  mixins: [HttpClientMixin],
  data() {
    return {
      user: {
        email: null,
        username: null,
        password: null,
      }
    };
  },
  mounted() {
    this.userApi = new UserApi(this.httpClient);
  },
  methods: {
    handleCancel() {
      this.$router.push({ name: 'home' });
    },
    async handleRegister() {
      const result = await this.userApi.register(this.user);

      if (result.status) {
        MessageBus.$emit('toast', { color: 'success', message: 'Successfully registered.' });
        await this.$router.push({ name: 'home' });
      } else {
        MessageBus.$emit('toast', { color: 'danger', message: 'An error occured while trying to register.' });
      }
    },
  }
};
</script>