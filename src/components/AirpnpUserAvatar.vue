<template>
    <v-avatar :color="color" size="30" class="AirpnpUserAvatar">
        <span :class="`${fontColor}--text headline`">{{ avatar }}</span>
    </v-avatar>
</template>

<script>
export default {
  name: 'AirpnpUserAvatar',
  props: {
    color: {
      type: String,
      default: 'white',
    },
    fontColor: {
      type: String,
      default: 'black'
    }
  },
  computed: {
    avatar() {
      return this.$store.getters['auth/getUser'].username[0];
    }
  }
};
</script>

<style scoped>
    .AirpnpUserAvatar span {
        text-transform: uppercase;
    }
</style>