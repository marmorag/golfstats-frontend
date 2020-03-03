<template>
  <v-app>
    <v-app-bar app color="primary">
      <div class="d-flex align-center">
        <v-btn :to="{ name: isUserLogged ? 'dashboard' : 'home' }">
          <v-img class="shrink mr-2" contain src="./assets/golf-bag.svg" transition="scale-transition" width="40" />
        </v-btn>
      </div>

      <v-spacer />

      <template v-if="isUserLogged">
        <UserLoggedNavbarWidget />
      </template>

      <template v-else>
        <NonLoggedNavbarWidget />
      </template>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <GolfstatsToast ref="toast"/>
  </v-app>
</template>

<script>
import GolfstatsToast from './components/GolfstatsToast.vue';
import UserLoggedNavbarWidget from './components/navbar/UserLoggedNavbarWidget.vue';
import NonLoggedNavbarWidget from './components/navbar/NonLoggedNavbarWidget.vue';

export default {
  name: 'App',
  components: {
    NonLoggedNavbarWidget, UserLoggedNavbarWidget, GolfstatsToast
  },
  computed: {
    isUserLogged() {
      return this.$store.getters['auth/isUserLogged'];
    }
  },
};
</script>
