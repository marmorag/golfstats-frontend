<template>
    <v-container class="fill-height" fluid data-testid="login:container">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Login form</v-toolbar-title>
                        <v-spacer />
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="loginForm" :lazy-validation="true">
                            <v-text-field v-model="login" :error-messages="errors.login" :rules="loginRules" label="Login" name="login" prepend-icon="mdi-account" type="text"/>
                            <v-text-field v-model="password" @keydown.enter="handleLogin" :error-messages="errors.password" :rules="passwordRules" label="Password" name="password" prepend-icon="mdi-lock" type="password"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" @click="handleLogin">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import MessageBus from '../services/messageBus';

export default {
  name: 'Login',
  data() {
    return {
      login: null,
      password: null,
      errors: {
        login: null,
        password: null,
      },
      loginRules: [
        (elm) => !!elm || 'Login is required',
      ],
      passwordRules: [
        (elm) => !!elm || 'Password is required',
      ],
    };
  },
  methods: {
    async handleLogin() {
      if (this.$refs.loginForm.validate()) {
        const result = await this.$store.dispatch('auth/login', { username: this.login, password: this.password });

        if (result.status) {
          this.$router.push({ name: 'home' });
        } else {
          MessageBus.$emit('toast', { color: 'danger', message: result.message });
        }
      }
    },
  }
};
</script>