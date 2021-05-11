<template lang="pug">
  div(class="search")
    div(
      class="search__main"
      :class="{search__main_list: listSorted.length > 0}")
      span
        fa-icon(icon="search")
      input(
        class="search__input"
        :placeholder="placeholder"
        v-model="input")
      button(
        v-if="input"
        @click="input = '', selectItem('')")
        fa-icon(icon="times")
    div(
      v-if="listSorted.length > 0"
      class="search__list")
      button(
        v-for="item in listSorted"
        class="search__item"
        @click="selectItem(item), input = ''")
          | {{item}}
</template>

<script>
export default {
  name: 'Search',
  props: {
    list: Array,
    placeholder: String,
    selectItem: Function,
    exeption: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    input: '',
  }),
  computed: {
    listSorted() {
      if (!this.input) {
        return []
      }

      return this.list.filter((item, i, arr) => arr.indexOf(item) === i
        && item.toLowerCase().match(this.input.toLowerCase())
        && item !== this.exeption)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.search {
  position: relative;
  width: 100%;
}

.search__main {
  position: relative;

  span {
    position: absolute;
    left: 2rem;
    top: 0;
    line-height: 4rem;
    color: $text4;
    font-size: 1.4rem;
    @include transition;
  }

  button {
    position: absolute;
    right: 0;
    line-height: 4rem;
    width: 4rem;
    color: $text4;
    font-size: 1.4rem;
    @include hover;
  }
}

.search__input {
  padding-left: 4.4rem;
  padding-right: 4rem;
  height: 4rem;
  width: 100%;
  border: 1px solid $border;
  @include input;
}

.search__list {
  position: absolute;
  height: min-content;
  max-height: calc(20rem + 1px);
  width: 100%;
  background-color: $bg1;
  border: 1px solid $border;
  border-top: none;
  overflow-y: scroll;
  @include scrollbar(0.4rem);
  @include transition;
  z-index: 10;
}

.search__item {
  padding: 0 2rem;
  height: 4rem;
  width: 100%;
  text-align: left;
  font-size: 1.6rem;
  color: $text4;
  @include hover;

  &:not(:last-child) {
    border-bottom: 1px solid $border;
  }
}
</style>
