<template>
    <v-row justify="center">
        <v-dialog v-model="isOpen" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning : delete profile</span>
                </v-card-title>
                <v-card-text>
                    <span class="body-1">You are about to delete your account. This action is definitive and can't be reverted.</span>
                    <span class="body-1">Are you really sure this is what you want ?</span>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="red" text @click="handleSaved">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import ModalMixin from '../../mixins/ModalMixin';

export default {
  name: 'AirpnpModalDeleteProfile',
  mixins: [ModalMixin],
  methods: {
    handleSaved() {
      this.$emit('confirmed');
      this.close();
    }
  }
};
</script>