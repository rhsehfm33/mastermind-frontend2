<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center" class="flex-column">
      <h1 class="grey--text title">PAGE NOT FOUND</h1>
      <v-btn text color="black accent-4" @click="backPage">
        뒤로 가기
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    backPage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>
