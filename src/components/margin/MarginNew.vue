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
              v-for="type in form.customer.types"
              :key="type"
              class="radio"
              :class="{radio_checked: form.customer.type === type}"
              @click="() => form.customer.type = type")
              span(class="radio__box")
              span(class="radio__text")
                | {{types[type]}}
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
              v-for="type in form.carrier.types"
              :key="type"
              class="radio"
              :class="{radio_checked: form.carrier.type === type}"
              @click="() => form.carrier.type = type")
              span(class="radio__box")
              span(class="radio__text")
                | {{types[type]}}
                
    div(v-if="result.error" class="result")
      p(class="result__text result__text_error")
        | Выбранная форма оплаты недоступна
    div(v-else class="result")
      p(class="result__text")
        | Чистая маржа: 
        span
          | {{margin}} руб.
      p(class="result__text result__text_small")
        | Оформлять на компанию: 
        span
          | {{result.paperwork}}
</template>

<script>
export default {
  name: "MarginNew",
  data: () => ({
    form: {
      customer: {
        rate: "",
        type: "cash",
        types: ["cash", "vat", "vat 5"],
      },
      carrier: {
        rate: "",
        type: "cash",
        types: ["cash", "vat", "vat 5", "no vat"],
      },
    },
    types: {
      cash: "Наличные",
      vat: "НДС 20%",
      "vat 5": "НДС 5%",
      "no vat": "Без НДС",
    },
  }),
  computed: {
    result() {
      const customer = this.form.customer;
      const carrier = this.form.carrier;

      if (customer.type === "vat") {
        if (carrier.type === "vat") {
          return this.getResult(customer.rate / 1.2 - carrier.rate / 1.2);
        }

        if (carrier.type === "no vat") {
          return this.getResult(customer.rate / 1.2 - carrier.rate);
        }

        if (carrier.type === "vat 5") {
          return this.getResult(customer.rate / 1.2 - carrier.rate / 1.05);
        }

        if (carrier.type === "cash") {
          return this.getResult(customer.rate / 1.2 - carrier.rate * 1.13);
        }
      }

      if (customer.type === "vat 5") {
        if (carrier.type === "vat") {
          return this.getResult(
            (customer.rate / 1.05 - carrier.rate) * 0.9,
            "ИП"
          );
        }

        if (carrier.type === "no vat") {
          return this.getResult(
            (customer.rate / 1.05 - carrier.rate) * 0.9,
            "ИП"
          );
        }

        if (carrier.type === "cash") {
          return this.getResult(
            (customer.rate / 1.05) * 0.9 - carrier.rate * 1.13,
            "ИП"
          );
        }
      }

      if (customer.type === "cash") {
        if (carrier.type === "vat") {
          return this.getResult(customer.rate - carrier.rate / 1.2);
        }

        if (carrier.type === "no vat") {
          return this.getResult(customer.rate - carrier.rate * 0.9, "ИП");
        }

        if (carrier.type === "vat 5") {
          return this.getResult(customer.rate - carrier.rate / 1.05);
        }

        if (carrier.type === "cash") {
          return this.getResult(customer.rate - carrier.rate);
        }
      }

      return this.getResult();
    },
    margin() {
      return this.result.margin.toFixed(2);
    },
  },
  methods: {
    getResult(margin, paperwork) {
      return {
        margin: margin ?? 0,
        paperwork: paperwork ?? "Тайгер",
        error: typeof margin === "undefined",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vars.scss";

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
    flex-wrap: wrap;
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

.result__text {
  & + & {
    margin-top: 16px;
  }
}

.result__text_small {
  font-size: 1.4rem;
}

.result__text_error {
  font-size: 1.4rem;
  color: red;
}
</style>
