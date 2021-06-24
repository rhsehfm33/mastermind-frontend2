const getters = {
  isAuthenticated(state) {
    // accessToken 인증 여부 boolean 값 변경 후 반환
    return !!state.accessToken;
  },
};

export default getters;
