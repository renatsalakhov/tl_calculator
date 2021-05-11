<template lang="pug">
  div(class="app")
    Header
    transition(name="loader")
      Loader(v-if="isLoader")
    router-view
</template>

<script>
const Header = () => import('@/components/Header.vue')
const Loader = () => import('@/components/Loader.vue')

export default {
  components: {
    Header,
    Loader,
  },
  computed: {
    isLoader() {
      return this.$store.state.loader.isVisible
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/vars.scss';

* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 100%;
  text-decoration: none;
  vertical-align: baseline;
  background: transparent;
  box-sizing: border-box;
}

*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 10px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.app {
  position: relative;
}

.page {
  padding: 4rem 0 6rem;

  @media screen and (max-width: $sm-max) {
    padding-top: 10rem;
  }
}

.container {
  width: 100%;
  padding-right: 2rem;
  padding-left: 2rem;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: $sm-min) {
    max-width: 540px;
  }

  @media (min-width: $md-min) {
    max-width: 720px;
  }

  @media (min-width: $lg-min) {
    max-width: 960px;
  }
}

.title {
  font-size: 2rem;
  font-weight: 500;
  color: $text1;
}

.section {

  .title + & {
    margin-top: 2rem;
  }
  
  & + & {
    margin-top: 4rem;
  }
}

.form__label {
  font-size: 1.5rem;
  font-weight: 500;
  color: $text3;

  span {
    color: $text2;
  }
}

.radio {
  display: grid;
  grid-template-columns: 2.4rem auto;
  grid-column-gap: 1.6rem;
  align-items: center;
  height: 4rem;
  cursor: pointer;
}

.radio__text {
  font-size: 1.4rem;
  color: $text3;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  .radio_checked & {
    color: $text1;
  }
}

.radio__box {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid $accent;
  border-radius: 50%;
  cursor: pointer;

  .radio_checked & {
    
    &:before {
      content: '';
      display: block;
      position: absolute;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 1.2rem;
      height: 1.2rem;
      background-color: $accent;
      border-radius: 50%;
    }
  }
}

</style>
