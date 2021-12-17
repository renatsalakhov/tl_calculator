<template lang="pug">
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
    div(class="result")
      | Чистая маржа: 
      span
        | {{margin.toFixed(2)}} руб.
</template>

<script>
export default {
  name: 'MarginNew',
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
    margin() {
      const customer = this.form.customer
      const carrier = this.form.carrier

      if (!customer.rate || !carrier.rate) {
        return 0
      }

      if (customer.type === 'vat' && carrier.type === 'vat') {
        return (customer.rate - carrier.rate) / 1.2
      }

      if (customer.type === 'vat' && carrier.type === 'no vat') {
        return customer.rate / 1.2 - carrier.rate
      }

      if (customer.type === 'vat' && carrier.type === 'cash') {
        return customer.rate / 1.2 - carrier.rate * 1.13
      }

      if (customer.type === 'no vat' && carrier.type === 'vat') {
        return customer.rate * 0.9 - carrier.rate / 1.2
      }

      if (customer.type === 'no vat' && carrier.type === 'no vat') {
        return (customer.rate - carrier.rate) * 0.9
      }

      if (customer.type === 'no vat' && carrier.type === 'cash') {
        return customer.rate * 0.9 - carrier.rate * 1.015
      }

      if (customer.type === 'cash' && carrier.type === 'vat') {
        return customer.rate - carrier.rate * 5 / 6
      }

      if (customer.type === 'cash' && carrier.type === 'no vat') {
        return customer.rate - carrier.rate * 0.9
      }

      if (customer.type === 'cash' && carrier.type === 'cash') {
        return customer.rate - carrier.rate
      }

      return 0
    }
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

.form__label {

  .form__types + & {
    margin-top: 2rem;
  }
}

.form__types {
  margin-top: 1rem;

  @media screen and (min-width: $sm-min) {
    display: flex;
    justify-content: space-between;
  }
}

.form__types_list {
  justify-content: start;

  @media screen and (min-width: $sm-min) {
    .radio + .radio {
      margin-left: 4rem;
    }
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
