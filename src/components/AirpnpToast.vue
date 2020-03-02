<template>
    <v-snackbar v-model="isOpen" top right :color="toastColor">
        <slot>{{ toastMessage }}</slot>
        <v-btn color="white" text @click="close">
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
import MessageBus from '../services/messageBus';

export default {
  name: 'AirpnpToast',
  mounted() {
    MessageBus.$on('toast', this.open);
    MessageBus.$on('toast:close', this.close);
  },
  data() {
    return {
      isOpen: false,
      toastMessage: 'Default toast message',
      toastColor: 'success',
    };
  },
  methods: {
    open({ color = 'success', message = 'Default toast message' }) {
      this.toastColor = color;
      this.toastMessage = message;
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    }
  }
};
</script>
