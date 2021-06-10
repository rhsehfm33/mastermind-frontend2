<template>
  <v-main>
    <v-container>
      <!-- v-sheet는 Vuetify 기능의 기본 기반을 제공하는 변형 가능한 paper 컴포넌트 -->
      <v-sheet class="mx-auto text-center " max-width="500" height="500">
        <div class="grey--text title">Page Not Found</div>
        <v-btn text color="deep-purple accent-4" @click="backPage">
          뒤로 가기
        </v-btn>
      </v-sheet>
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

<style></style>
