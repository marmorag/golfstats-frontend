<template>
    <v-form ref="userForm" :lazy-validation="true">
        <v-text-field @keydown.enter="$_handleSubmitted" v-model="value.email" :rules="emailRules" label="Email" name="email" prepend-icon="mdi-email" type="text"/>
        <v-text-field @keydown.enter="$_handleSubmitted" v-model="value.username" :rules="usernameRules" label="Login" name="login" prepend-icon="mdi-account" type="text"/>
        <v-text-field @keydown.enter="$_handleSubmitted" v-model="value.password" :rules="passwordRules" label="Password" name="password" prepend-icon="mdi-lock" type="password"/>
        <v-text-field @keydown.enter="$_handleSubmitted" :rules="confirmPasswordRules" label="Confirmation" name="confirm-password" prepend-icon="mdi-lock-reset" type="password"/>
    </v-form>
</template>

<script>
export default {
  name: 'AirpnpUserForm',
  props: {
    value: {
      type: Object,
      required: true,
      validate: (prop) => prop.hasOwnProperty('email')
        && prop.hasOwnProperty('username')
        && prop.hasOwnProperty('password')
    },
  },
  data() {
    return {
      emailRules: [
        (elm) => !!elm || 'Email is required',
        (elm) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(elm) ? true : 'Email is required'),
      ],
      usernameRules: [
        (elm) => !!elm || 'Login is required',
      ],
      passwordRules: [
        (elm) => !!elm || 'Password is required',
        (elm) => (!!elm && elm.length >= 8 ? true : 'Password must be at least 8 characters long.'),
        (elm) => (!!elm && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(elm) ? true : 'Password must contain at least one lower case, upper case and one number character.'),
      ],
      confirmPasswordRules: [
        (elm) => (!!elm && elm === this.value.password ? true : 'Password differs.'),
      ],
    };
  },
  methods: {
    reset() {
      this.$refs.userForm.reset();
    },
    $_handleSubmitted() {
      if (this.$refs.userForm.validate()) {
        this.$emit('submitted');
      }
    }
  }
};
</script>