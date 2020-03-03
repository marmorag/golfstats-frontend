<template>
    <div>
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
    </div>
</template>

<script>
export default {
  name: 'NonLoggedNavbarWidget'
};
</script>