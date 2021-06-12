<template>
  <v-main>
    <v-container class="login-box">
      <v-layout>
        <v-flex elevation-4>
          <v-card class="login-card">
            <h2>{{ LoginTitle }}</h2>
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                label="e-mail"
                v-model="email"
                required
              ></v-text-field>
              <v-text-field
                label="password"
                v-model="password"
                type="password"
                required
              ></v-text-field>
              <v-btn
                block
                class="white--text"
                color="black"
                type="submit"
                :disabled="invalidForm"
                >Login</v-btn
              >
            </v-form>
            <!-- 로그인 실패할 경우  -->
            <div class="error-wrapper">
              <p v-if="error" style="color: red">{{ error }}</p>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      LoginTitle: "Welcome to Mastermind",
      email: "",
      password: "",
      error: "",
      rPath: "",
    };
  },
  computed: {
    // 공백 확인
    invalidForm() {
      return !this.email || !this.password;
    },
  },
  created() {
    this.rPath = this.$route.query.rPath || "/";
  },
  methods: {
    ...mapActions(["LOGIN"]),
    onSubmit() {
      this.LOGIN({ email: this.email, password: this.password })
        .then(data => {
          this.$router.push(this.rPath);
        })
        .catch(err => {
          this.error = err.response.data.error;
        });
    },
  },
};
</script>

<style>
.login-box {
  width: 500px;
  margin-top: 50px;
  text-align: center;
}

.login-card {
  padding: 30px;
}

.error-wrapper {
  margin: 10px;
}
</style>
