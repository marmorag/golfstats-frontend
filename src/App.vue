<template>
  <v-app>
    <v-app-bar app color="primary" v-if="$route.name !== 'login'">
      <div class="d-flex align-center">
        <v-btn to="home">
          <v-img class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />
        </v-btn>
      </div>

      <v-spacer />

      <template v-if="isUserLogged">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text :to="{ name: 'account' }" class="mr-3">
              <AirpnpUserAvatar />
            </v-btn>
          </template>
          <span>Acceder a mon compte</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" :to="{ name: 'mytoilets' }" class="mr-3">
              <v-icon>mdi-paper-roll-outline</v-icon>
            </v-btn>
          </template>
          <span>My toilets</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" :to="{ name: 'logout' }" data-testid="logout:button">
              <v-icon>mdi-lock-outline</v-icon>
            </v-btn>
          </template>
          <span>Déconnexion</span>
        </v-tooltip>
      </template>

      <template v-else>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" :to="{ name: 'register' }" class="mr-3">
              <v-icon>mdi-account-plus</v-icon>
            </v-btn>
          </template>
          <span>Register</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" :to="{ name: 'login' }">
              <v-icon>mdi-login</v-icon>
            </v-btn>
          </template>
          <span>Login</span>
        </v-tooltip>
      </template>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <AirpnpToast ref="toast"/>
  </v-app>
</template>

<script>
import AirpnpToast from './components/GolfstatsToast.vue';
import AirpnpUserAvatar from './components/GolfstatsUserAvatar.vue';

export default {
  name: 'App',
  components: { AirpnpUserAvatar, AirpnpToast },
  computed: {
    isUserLogged() {
      return this.$store.getters['auth/isUserLogged'];
    }
  },
};
</script>
