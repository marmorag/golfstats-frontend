<template>
    <v-avatar :color="color" size="45" class="GolfstatsUserAvatar">
        <span :class="`${fontColor}--text headline`">{{ avatar }}</span>
    </v-avatar>
</template>

<script>
export default {
  name: 'GolfstatsUserAvatar',
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
      const user = this.$store.getters['auth/getUser'];
      return user.firstname[0] + user.lastname[0];
    }
  }
};
</script>

<style scoped>
    .GolfstatsUserAvatar span {
        text-transform: uppercase;
    }
</style>