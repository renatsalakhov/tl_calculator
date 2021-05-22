export default {
  state: {
    isVisible: true,
    status: '',
  },
  mutations: {
    showLoader(state, status = '') {
      state.isVisible = true
      state.status = status
    },
    hideLoader(state) {
      state.isVisible = false
      state.status = ''
    },
  },
}
