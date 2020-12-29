<template lang="pug">
  div(class="header")
    div(class="header__logo")
      img(
        src="/img/logo.png" alt="")
    p(class="header__title")
      | Рассчет стоимости грузоперевозки
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.header {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  height: 6rem;
  background-color: $bg01;
}

.header__logo {

  img {
    height: 6rem;
  }
}

.header__title {
  font-size: 1.8rem;
  font-weight: 500;
  color: $text01;
}
</style>
