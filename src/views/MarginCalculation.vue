<template lang="pug">
  div(class="page")
    div(class="container")
      h1(class="title")
        | Рассчет чистой маржи
      div(class="section")
        div(class="form")
          div(class="form__block")
            div(class="form__item")
              label(
                class="form__label")
                | Ставка заказчика
              input(
                class="form__input form__input_number"
                placeholder="Введите ставку заказчика"
                type="number"
                v-model="form.customer.rate")
            div(class="form__item")
              p(class="form__label")
                | Форма оплаты заказчика
              div(class="form__types")
                div(
                  v-for="type in types"
                  class="radio"
                  :class="{radio_checked: form.customer.type === type.key}"
                  @click="() => form.customer.type = type.key")
                  span(class="radio__box")
                  span(class="radio__text")
                    | {{type.text}}
            div(class="form__item")
              p(class="form__label")
                | Процент: 
                span {{customerPercent}}%
          div(class="form__block")
            div(class="form__item")
              label(
                class="form__label")
                | Ставка перевозчика
              input(
                class="form__input form__input_number"
                placeholder="Введите ставку перевозчика"
                type="number"
                v-model="form.carrier.rate")
            div(class="form__item")
              p(class="form__label")
                | Форма оплаты перевозчику
              div(class="form__types")
                div(
                  v-for="type in types"
                  class="radio"
                  :class="{radio_checked: form.carrier.type === type.key}"
                  @click="() => form.carrier.type = type.key")
                  span(class="radio__box")
                  span(class="radio__text")
                    | {{type.text}}
            div(class="form__item")
              p(class="form__label")
                | Процент: 
                span {{carrierPercent}}%
        div(class="result")
          | Чистая маржа: 
          span
            | {{margin}} руб.
</template>

<script>
export default {
  name: 'MarginCalculation',
  components: {
  },
  data: () => ({
    form: {
      customer: {
        rate: '',
        type: 'cash',
      },
      carrier: {
        rate: '',
        type: 'cash',
      },
    },
    types: [
      {
        key: 'cash',
        text: 'Наличные',
      },
      {
        key: 'vat',
        text: 'С НДС',
      },
      {
        key: 'no vat',
        text: 'Без НДС',
      },
    ]
  }),
  computed: {
    customerPercent() {
      const customer = this.form.customer.type

      if (customer === 'cash') {
        return 0
      }
      
      return 1.5
    },
    carrierPercent() {
      const customer = this.form.customer.type
      const carrier = this.form.carrier.type

      if (customer === 'vat' && carrier === 'no vat') {
        return 5
      }

      if ((customer === 'vat' || customer === 'no vat') && carrier === 'cash') {
        return 7
      }

      if (customer === 'cash' && (carrier === 'vat' || carrier === 'no vat')) {
        return -3.5
      }

      if (customer === 'no vat' && carrier === 'vat') {
        return -3.5
      }

      return 0
    },
    margin() {
      const customer = +this.form.customer.rate
      const carrier = +this.form.carrier.rate

      if (!customer || !carrier) {
        return 0
      }

      return customer * (100 - this.customerPercent) / 100 - carrier * (100 + this.carrierPercent) / 100
    }
  },
  mounted() {
    this.$store.commit('hideLoader')
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.form {
  display: grid;

  @media screen and (min-width: $md-min) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 4rem;
  }
}

.form__block {
  
  @media screen and (max-width: $sm-max) {
    & + & {
      margin-top: 4rem;
    }
  }
}

.form__item {

  & + & {
    margin-top: 3rem;
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

.form__types {
  margin-top: 1rem;

  @media screen and (min-width: $sm-min) {
    display: flex;
    justify-content: space-between;
  }
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
