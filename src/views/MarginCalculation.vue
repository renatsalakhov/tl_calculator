<template lang="pug">
  div(class="page")
    div(class="container")
      h1(class="title")
        | Расчет чистой маржи
      MarginNew
</template>

<script>
import MarginNew from '@/components/margin/MarginNew.vue'

export default {
  components: {
    MarginNew
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

</style>
