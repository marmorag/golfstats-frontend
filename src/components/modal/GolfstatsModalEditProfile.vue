<template>
    <v-row justify="center">
        <v-dialog v-model="isOpen" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">User Profile</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <GolfstatsUserForm ref="userForm" v-model="user" @sumitted="handleSaved"/>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="blue darken-1" text @click="close">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="handleSaved">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import GolfstatsUserForm from '../GolfstatsUserForm.vue';
import ModalMixin from '../../mixins/ModalMixin';

export default {
  name: 'GolfstatsModalEditProfile',
  components: { GolfstatsUserForm },
  mixins: [ModalMixin],
  data() {
    return {
      user: {
        email: null,
        username: null,
        password: null,
      },
    };
  },
  methods: {
    handleSaved() {
      this.$emit('saved', { ...this.user });
      this.$refs.userForm.reset();
      this.close();
    }
  }
};
</script>