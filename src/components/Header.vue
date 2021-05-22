<template lang="pug">
  div(class="header")
    div(class="header__logo")
      img(
        src="/img/logo.png" alt="")
    p(class="header__title")
      | Tiger Logistic
    div(
      class="menu"
      :class="{menu_visible: isMenu}")
      router-link(
        to="/"
        class="menu__link"
        :class="{menu__link_active: $route.path == '/'}")
        | Грузоперевозки
      router-link(
        to="/margin"
        class="menu__link"
        :class="{menu__link_active: $route.path === '/margin'}")
        | Чистая маржа
      router-link(
        to="/customer"
        class="menu__link"
        :class="{menu__link_active: $route.path === '/customer'}")
        | Ставка клиенту
    button(
      class="menu__button"
      @click="isMenu = !isMenu")
      fa-icon(:icon="isMenu ? 'times' : 'bars'")
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    isMenu: false,
  }),
  watch: {
    $route: {
      handler() {
        this.isMenu = false
      },
      deep: true,
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.header {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  height: 6rem;
  background-color: $bg01;
  
  @media screen and (max-width: $sm-max) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    grid-template-columns: auto 1fr 6rem;
    z-index: 20;
  }
}

.header__logo {
  height: 6rem;

  img {
    height: 6rem;
  }
}

.header__title {
  font-size: 1.8rem;
  font-weight: 500;
  color: $text01;
}

.menu {

  @media screen and (max-width: $sm-max) {
    position: fixed;
    top: 6rem;
    left: 0;
    right: 0;
    padding: 1rem 2rem;
    background-color: $bg01;
    z-index: 10;
    @include transition;

    &:not(.menu_visible) {
      visibility: hidden;
      opacity: 0;
    }
  }
  
  @media screen and (min-width: $md-min) {
    text-align: right;
    padding-right: 4rem;
  }
}

.menu__link {
  position: relative;
  display: inline-block;
  font-size: 1.6rem;
  line-height: 4rem;
  color: $text02;
  @include transition;

  &_active {
    color: $text01;
  }

  &:hover {
    color: $text01;
  }

  @media screen and (max-width: $sm-max) {
    display: block;
  }
  
  @media screen and (min-width: $md-min) {

    &:not(:last-child) {
      margin-right: 4rem;
    }

    &_active {

      &:after {
        content: '';
        position: absolute;
        bottom: 0.4rem;
        left: 0;
        height: 1px;
        width: 100%;
        background-color: $accent;
      }
    }
  }
}

.menu__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 4rem;
  width: 4rem;
  font-size: 2.4rem;
  color: $text03;
  
  @media screen and (min-width: $md-min) {
    display: none;
  }
}

.menu__button {
  height: 6rem;
  width: 6rem;
  font-size: 2.4rem;
  color: $text02;

  @media screen and (min-width: $md-min) {
    display: none;
  }
}
</style>
