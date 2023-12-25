<template lang="pug">
  div(class="loader")
    div(class="loader__body")
      //- img(
      //-   src="/img/logo.png"
      //-   class="loader__logo")
      p(class="loader__title")
        | Логистический калькулятор
      p(class="loader__status")
        | {{status || 'Загрузка'}}...
</template>

<script>
export default {
  name: 'Loader',
  computed: {
    status() {
      return this.$store.state.loader.status
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.loader {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: $bg01;
  z-index: 50;
}

.loader-enter-active,
.loader-leave-active {
  transition: 0.3s;
}

.loader-enter,
.loader-leave-to {
  opacity: 0;
}

.loader__body {
  padding-bottom: 4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.loader__logo {
  height: 10rem;
  animation-name: spinner;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

@keyframes spinner { 
  from {
    transform: rotateY(0deg);
  } 
  to {
    transform: rotateY(-360deg);
  } 
}

.loader__title {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 20px;
  color: $text01;
}

.loader__status {
  font-size: 1.4rem;
  font-weight: 400;
  color: $text2;
}
</style>
