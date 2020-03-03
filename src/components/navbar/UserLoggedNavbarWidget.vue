<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" text :to="{ name: 'account' }" class="mr-3">
                    <GolfstatsUserAvatar />
                </v-btn>
            </template>
            <span>Acceder a mon compte</span>
        </v-tooltip>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" :to="{ name: 'logout' }" data-testid="logout:button">
                    <v-icon>mdi-lock-outline</v-icon>
                </v-btn>
            </template>
            <span>Déconnexion</span>
        </v-tooltip>
    </div>
</template>

<script>
import GolfstatsUserAvatar from '../GolfstatsUserAvatar.vue';

export default {
  name: 'UserLoggedNavbarWidget',
  components: { GolfstatsUserAvatar },
};
</script>