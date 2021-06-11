<template>
  <v-main>
    <v-container class="sign-up-box">
      <v-layout>
        <v-flex elevation-4>
          <v-card class="sign-up-card">
            <h2>{{ SignUpTitle }}</h2>
            <v-form @submit.prevent="onSubmit">
              <v-text-field label="name" v-model="name" required></v-text-field>
              <h5 v-if="!isEmailValid" class="duplicate-warn">
                {{ DuplicatedEmail }}
              </h5>
              <v-text-field
                label="e-mail"
                v-model="email"
                @blur="onEmailBlur()"
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
                color="deep-purple"
                type="submit"
                :disabled="invalidForm"
                >Sign up</v-btn
              >
            </v-form>
            <p v-if="error" style="color:red">{{ error }}</p>
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
      SignUpTitle: "Sign up",
      DuplicatedEmail: "Email has been already used",
      name: "",
      email: "",
      password: "",
      error: "",
      rPath: "",
      isEmailValid: true  // 입력된 이메일이 이미 사용됐으면 false, 그렇지 않으면 true
    };
  },
  computed: {
    invalidForm() {
      return !this.name || !this.email || !this.password || !this.isEmailValid;
    }
  },
  created() {
    this.rPath = this.$route.query.rPath || "/";
  },
  methods: {
    ...mapActions(["REGISTER", "CHECK_EMAIL"]),
    // Email 창에서 focus가 없어질 시에, email 중복에 대해 체크함
    onEmailBlur() {
      this.CHECK_EMAIL({ email: this.email })
        .then(data => {
          this.isEmailValid = true;
        })
        .catch(err => {
          this.isEmailValid = false;
        });
    },
    onSubmit() {
      this.REGISTER({
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(data => {
          this.$router.push("/");
        })
        .catch(err => {
          this.error = err.response.data.error;
        });
    }
  }
};
</script>

<style>
.sign-up-box {
  width: 450px;
  margin-top: 50px;
  text-align: center;
}

.sign-up-card {
  padding: 30px;
}

.duplicate-warn {
  color: red;
}
</style>
