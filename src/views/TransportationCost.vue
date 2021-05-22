<template lang="pug">
  div(class="page")
    div(class="container")
      h1(class="title")
        | Расчет стоимости грузоперевозки
      div(class="section")
        div(class="form")
          div(class="form__block form__block_inputs")
            div(class="form__item")
              label(
                class="form__label"
                for="fromCity")
                | Откуда
                span {{form.from ? `: ${form.from}` : ''}}
              Search(
                class="form__search"
                :list="cities"
                :placeholder="'Из города'"
                :selectItem="(item) => form.from = item")
            div(class="form__item")
              label(
                class="form__label"
                for="toCity")
                | Куда
                span {{form.to ? `: ${form.to}` : ''}}
              Search(
                class="form__search"
                :list="cities"
                :placeholder="'В город'"
                :selectItem="(item) => form.to = item")
          div(class="form__block")
            p(class="form__label")
              | Вид автотранспорта
            div(class="form__types")
              div(
                v-for="type in types"
                class="radio"
                :class="{radio_checked: form.type === type.key}"
                @click="() => form.type = type.key")
                span(class="radio__box")
                span(class="radio__text")
                  | {{type.text}}
          div(class="form__block")
            button(
              class="form__button"
              :class="{form__button_passive: !form.from || !form.to || !form.type || form.from === form.to || isCalculating || isCityExcluded}"
              @click="getInfo()")
              | {{isCalculating ? 'Идет расчет...' : isCityExcluded ? 'Невозможно рассчитать' : 'Рассчитать'}}
          p(
            v-if="isCityExcluded"
            class="form__status")
            | Данное направление считать в АТИ
      div(
        v-if="results.length > 0"
        class="section")
        p(class="section__title section__title_center")
          | Результат расчетов
        div(class="results")
          div(class="results__cities")
            | {{result.from}}
            span
              fa-icon(icon="arrow-right")
            | {{result.to}} ({{result.distance}}км)
        div(class="table")
          template(v-for="row in results")
            div(class="table__title")
              | {{row.title}}
            div(class="table__value")
              | {{row.value}}
</template>

<script>
const Search = () => import('@/components/Search.vue')

export default {
  name: 'TransportationCost',
  components: {
    Search
  },
  data: () => ({
    isCalculating: false,
    form: {
      from: '',
      to: '',
      type: '',
    },
    result: {}
  }),
  computed: {
    types() {
      return this.$store.state.table.types
    },
    cities() {
      return this.$store.state.table.cities
    },
    excludedCities() {
      return this.$store.state.table.excludedCities
    },
    isCityExcluded() {
      return this.excludedCities.includes(this.form.from) || this.excludedCities.includes(this.form.to)
    },
    results() {
      if (!this.result.distance) {
        return []
      }

      return [
        {
          title: 'Вид автотранспорта',
          value: this.types.filter(t => t.key === this.result.type)[0].text
        },
        {
          title: `Ставка за км`,
          value: `${this.result.m} руб./км`
        },
        {
          title: 'Ставка перевозчика',
          value: `${this.result.p} руб.`
        },
        {
          title: 'Ставка для клиента',
          value: `${this.result.k} руб.`
        },
        {
          title: 'Маржа',
          value: `${this.result.k - this.result.p} руб.`
        },
        {
          title: 'Срок доставки',
          value: `${Math.ceil(this.result.distance / 700)} дн.`
        },
      ]
    }
  },
  methods: {
    async getInfo() {
      if (!this.form.from || !this.form.to || !this.form.type || this.form.from === this.form.to) {
        this.result = {}
        return
      }

      if (this.isCalculating) {
        return
      }

      this.isCalculating = true

      this.result = await this.$store.dispatch('getInfo', this.form)

      this.isCalculating = false
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.form {
  margin-top: 2rem;
}

.form__block {

  & + & {
    margin-top: 3rem;
  }
}

.form__block_inputs {

  @media screen and (min-width: $md-min) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
  }
}

.form__item {

  @media screen and (max-width: $sm-max) {
    & + & {
      margin-top: 3rem;
    }
  }
}

.form__search {
  margin-top: 1rem;
}

.form__types {
  margin-top: 1rem;
  display: grid;
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;

  @media screen and (min-width: $sm-min) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: $md-min) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: $lg-min) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.form__status {
  margin: 2rem 0;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  color: $text1;
}

.results {
  margin-top: 2rem;
}

.results__cities {
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  color: $text2;
  
  span {
    margin: 0 1rem;
    font-size: 1.4rem;
  }
}

</style>
