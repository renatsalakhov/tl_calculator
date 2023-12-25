<template lang="pug">
  div(class="page")
    div(class="container")
      h1(class="title title_center")
        | Расчет ставки заказчику
        br
        | при известной ставке перевозчика
      div(class="section section_center")
        div(class="form")
          div(class="form__block")
            div(class="form__item")
              input(
                class="form__input form__input_number"
                placeholder="Введите ставку перевозчика"
                type="number"
                v-model="form.input"
                @keyup.enter="getResult()")
            div(class="form__item")
              div(class="form__types")
                div(
                  v-for="type in types"
                  class="radio"
                  :class="{radio_checked: form.type === type.key}"
                  @click="() => form.type = type.key")
                  span(class="radio__box")
                  span(class="radio__text")
                    | {{type.text}}
              button(
                class="form__button"
                :class="{form__button_passive: !form.input || !form.type}"
                @click="getResult()")
                | Рассчитать
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
  data: () => ({
    form: {
      input: '',
      type: '',
    },
    types: [
      {
        key: 'matching',
        text: 'Формы оплаты заказчика и перевозчика совпадают',
      },
      {
        key: 'vat',
        text: 'Заказчик с НДС, перевозчик без НДС/наличка',
      },
    ],
    results: [],
  }),
  methods: {
    getResult() {
      if (!this.form.input || !this.form.type) {
        this.results = []
        return
      }

      const result = this.$store.getters.getMarginByCarrier(this.form.input)
      const vat = this.form.type === 'vat' ? 0.2 : 0

      this.results = [
        {
          title: 'Ставка перевозчика',
          value: `${result.carrier} руб.`
        },
        {
          title: 'Ставка заказчику',
          value: `${result.customer + result.carrier * vat} руб.`
        },
        {
          title: `Маржа${vat ? ' (с учетом НДС 20%)': ''}`,
          value: `${result.value + result.carrier * vat} руб.`
        },
        {
          title: `Процент маржи${vat ? ' (с учетом НДС 20%)': ''}`,
          value: `${result.percent + vat * 100}%`
        },
      ]
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

.form__item {

  & + & {
    margin-top: 2rem;
  }
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
