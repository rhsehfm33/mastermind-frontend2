<template>
  <v-main>
    <v-container>
      <v-card class="mx-auto card-not-found" max-width="500" height="500">
        <v-card-title>Not Found</v-card-title>
        <v-btn text color="deep-purple accent-4" @click="backPage">
          뒤로 가기
        </v-btn>
      </v-card>
    </v-container>
  </v-main>
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

<style>
.card-not-found {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  align-items: center;
}
</style>
