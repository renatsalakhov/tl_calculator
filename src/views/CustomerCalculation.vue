<template lang="pug">
  div(class="page")
    div(class="container")
      h1(class="title title_center")
        | Расчет ставки заказчику
      div(class="section section_center")
        div(class="form")
          div(class="form__block")
            div(class="form__item")
              input(
                class="form__input form__input_number"
                placeholder="Введите ставку перевозчика"
                type="number"
                v-model="input"
                @keyup.enter="getResult()")
              button(
                class="form__button"
                @click="getResult()")
                | {{isCalculating ? 'Идет расчет...' : 'Рассчитать'}}
      div(
        v-if="results.length > 0"
        class="section")
        p(class="section__title section__title_center")
          | Результат расчетов
        div(class="table")
          template(v-for="row in results")
            div(class="table__title")
              | {{row.title}}
            div(class="table__value")
              | {{row.value}}
</template>

<script>
export default {
  name: 'MarginCalculation',
  data: () => ({
    isCalculating: false,
    input: '',
    result: {},
  }),
  computed: {
    results() {
      if (!this.result.carrier) {
        return []
      }

      return [
        {
          title: 'Ставка перевозчика',
          value: `${this.result.carrier} руб.`
        },
        {
          title: 'Ставка заказчику',
          value: `${this.result.customer} руб.`
        },
        {
          title: 'Маржа',
          value: `${this.result.value} руб.`
        },
        {
          title: 'Процент маржи',
          value: `${this.result.percent}%`
        },
      ]
    }
  },
  methods: {
    getResult() {
      if (!this.input) {
        this.result = {}
        return
      }

      if (this.isCalculating) {
        return
      }

      this.result = this.$store.getters.getMarginByCarrier(this.input)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.section_center {
  margin-left: auto;
  margin-right: auto;
  max-width: 40rem;
}

.form__input {
  padding: 0 2rem;
  height: 4rem;
  width: 100%;
  border: 1px solid $border;
  @include input;

  .form__label + & {
    margin-top: 1rem;
  }
}

.form__input_number {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
}


.form__button {
  margin-top: 2rem;
  width: 100%;
}

.result {
  margin-top: 4rem;
  font-size: 2rem;
  color: $text3;

  span {
    font-weight: 600;
    color: $text2;    
  }

  @media screen and (min-width: $sm-min) {
    margin-top: 6rem;
    text-align: center;
  }
}

</style>
