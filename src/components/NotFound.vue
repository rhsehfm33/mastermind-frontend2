<template>
  <!-- <v-container>
      <v-sheet class="mx-auto text-center " max-width="500" height="500">
        <div class="grey--text title">Page Not Found</div>
        <v-btn text color="deep-purple accent-4" @click="backPage">
          뒤로 가기
        </v-btn>
      </v-sheet>
    </v-container> -->
  <v-container class="fill-height">
    <v-row align="center" justify="center" class="flex-column">
      <h1 class="grey--text title">PAGE NOT FOUND</h1>
      <v-btn text color="deep-purple accent-4" @click="backPage">
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
