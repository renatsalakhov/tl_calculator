<template lang="pug">
  div(class="page")
    div(class="container")
      h1(class="title")
        | Расчет чистой маржи
      div(class="tabs")
        button(
          class="tabs__button"
          :class="{ tabs__button_active: tab === 'new' }"
          @click="tab = 'new'")
          | Новая версия
        button(
          class="tabs__button"
          :class="{ tabs__button_active: tab === 'old' }"
          @click="tab = 'old'")
          | Старая версия
      MarginNew(v-if="tab === 'new'")
      MarginOld(v-if="tab === 'old'")
</template>

<script>
import MarginNew from '@/components/margin/MarginNew.vue'
import MarginOld from '@/components/margin/MarginOld.vue'

export default {
  components: {
    MarginNew,
    MarginOld,
  },
  data: () => ({
    tab: 'new',
  }),
  computed: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.tabs {
  margin-top: 1rem;
}

.tabs__button {
  font-size: 1.4rem;
  font-weight: 500;
  color: $text3;
  @include hover;

  & + & {
    margin-left: 2rem;
  }
}

.tabs__button_active {
  color: $text1;
}

</style>
