<template lang="pug">
  div(class="app")
    Header
    transition(name="loader")
      Loader(
        v-if="loader.isVisisble"
        :status="loader.status")
    div(class="main")
      div(class="container")
        div(class="main__block")
          p(class="main__title")
            | Заполните форму
          div(class="form")
            div(class="form__block form__block_inputs")
              div(class="form__input")
                label(
                  class="form__label"
                  for="fromCity")
                  | Откуда
                  span {{form.from ? `: ${form.from}` : ''}}
                Search(
                  class="form__search"
                  :list="cities"
                  :placeholder="'Из города'"
                  :selectItem="(item) => form.from = item"
                  :exeption="form.to")
              div(class="form__input")
                label(
                  class="form__label"
                  for="toCity")
                  | Куда
                  span {{form.to ? `: ${form.to}` : ''}}
                Search(
                  class="form__search"
                  :list="cities"
                  :placeholder="'В город'"
                  :selectItem="(item) => form.to = item"
                  :exeption="form.from")
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
                :class="{form__button_passive: !form.from || !form.to || !form.type || isCalculating}"
                @click="getInfo()")
                | {{isCalculating ? 'Идет рассчет...' : 'Рассчитать'}}
        div(
          v-if="table.length > 0"
          class="main__block")
          p(class="main__title")
            | Результат расчетов
          div(class="table")
            template(v-for="row in table")
              div(class="table__title")
                | {{row.title}}
              div(class="table__value")
                | {{row.value}}
</template>

<script>
const Header = () => import('@/components/Header.vue')
const Loader = () => import('@/components/Loader.vue')
const Search = () => import('@/components/Search.vue')

import { GoogleSpreadsheet } from 'google-spreadsheet'

let doc

export default {
  components: {
    Header,
    Loader,
    Search
  },
  data: () => ({
    loader: {
      isVisisble: true,
      status: ''
    },
    isCalculating: false,
    cities: [],
    form: {
      from: '',
      to: '',
      type: '',
    },
    types: [
      {
        key: '1.5',
        text: 'Газель 1.5 тонны',
      },
      {
        key: '3',
        text: '3-тонник',
      },
      {
        key: '5',
        text: '5-тонник',
      },
      {
        key: '10',
        text: '10-тонник',
      },
      {
        key: '20',
        text: 'Фура 20 тонн',
      },
      {
        key: '2к',
        text: 'Догруз 2 куба',
      },
      {
        key: '4к',
        text: 'Догруз 4 куба',
      },
      {
        key: '8к',
        text: 'Догруз 8 кубов',
      },
    ],
    result: {}
  }),
  computed: {
    table() {
      if (!this.result.distance) {
        return []
      }

      return [
        {
          title: 'Город отправления',
          value: this.result.from,
        },
        {
          title: 'Город назначения',
          value: this.result.to,
        },
        {
          title: 'Вид автотранспорта',
          value: this.types.filter(t => t.key === this.result.type)[0].text
        },
        {
          title: 'Расстояние',
          value: `${this.result.distance} км`
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
    async load() {
      doc = new GoogleSpreadsheet('1BPHDRVWwO4nBEF5ERPDBBdFwfmgixtXz9rHarbZ-o7c')

      this.loader.status = 'Подключение к Google Docs'

      await doc.useServiceAccountAuth({
          client_email: 'tarif-653@dogwood-envoy-300011.iam.gserviceaccount.com',
          private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCfZ3CcZRHtD82R\nFxCr5a3QgvTCTou43MHTj9OS/Kb9qauhpSKzg7deaKOw6uk3+l4VDTMe/0VmIHMQ\nJQmmVw4+OpWRYHxGa7huVF639QGSCC+dAMBOu7IRWSC+aF2ElmClBVNnftEEhu2+\n1vDS8e9uhjswupktOZ3dcydvJ51kfhdKcOyigM3Z1LSWn7FbdxN4kqyvR73oP4rv\nzoVspj8ASy52QHXFmiVm6SMsYNTNx0Rv/WdKzwyj5Whq70WxcD08L2zSzyeB/ZqR\nHIgbVUbsym2I5mahhJNQcs0Uo00EOzGIyE5KrwiwHCKaZLzRMS3UOsANRrtRYaQ9\nn/1UxUgpAgMBAAECggEAGFb8G/VW2mLaWbgy5HyKoNcONok1zoFu2zYP8VbAzOTW\nfzUu6khHfJPvwrjr6Y9CRGaikq4Z07FKwIFXSt3qH9hkNDGOaFZUcAxT9jTkC39S\nfd+6fYstcnawiEJ5XSB1G12H0brMgat0q/o4BY3JqI+4hAVKFFzC3SiTMebTop9c\nf7kx6agrZwpg/RoDIPhEoCWkddKx1wu/HqB2rH0O8hUQ2mgGWvGszkH0a/LZIoif\nNhT1PLMjINdBDfjEhRBSflixqK3Evp9UZAAVDNNePPX4b3F4ETetlKfcUNFVaypv\nQouWGJc9cGe97ibwNP975RmoDUwrJL81sEmfxx6hDQKBgQDTbDCZyJmPG8NIl4sk\nrGngsKS1FdfBtFxJ8SCebNj8CmwIh7B5SCKzJvuL714JKI4ZwnUWdNK0bTyO/Pn/\ndss+6F7CJHwWShZq+lP9LnrZDU7aI8b+6yjTvDQGw51TyMaKMzrLqluvM/Y+vMNv\n0c/+idk9aHugHqFhslm9GL2sZwKBgQDBA3sla9JKtaGttFrea0ZBvGKbIj8bPYrw\ntWxAQaGiC6RJEdFUPMtWHHOsutEWXGW2L0FEIV3Xo3NPBk3Ts84ql8gsX2SN+OR5\nTuK2PPCojMU990ACXTYYv+2aeh39NdTU2GIu8VXhpFU1WPBqwE1V9KqyYY7ZYK/6\nhInPwa+M7wKBgD8pdD+NMWsSlT3LoFMdeygYPayn0ORauLOSaPdLd2ucxXeq6erh\nxRQWklHU+hfsWL+TW52Q2x3yAISLSTiryb6Kdzyy36tdCON+07awuxy7IBKFW77u\njCztbfGTYR4VvlKtSWRtCaUG9gr6I7z1Rpk5n3/8BerpG7dvK+YVTR0DAoGBAIR7\nlzOAZr/RHEDW4uh4SaklXamOQDK6c3v1i3AvnHpV81YUXNKtSAS7UsrlEE+A7G+4\nz9ur63XwQ12ivhjp+kFSHZwXfjXU+T4q34KnIakPtvNpmw4EXPVwB+9Yku0S3hua\nywndrU1MNxB/E8ayaGLvpZr7S8n5i9Ew2Ec6cv0RAoGAJf+2/fotRvt8GxrwxFY6\nw/UTbOxOcuD8MiXL0sMUwVHb2kBRRZT1HxxRn+5vxyicCLNQOk0Vuc9bMDn7qIwf\nc8ZteZV03vOn6s/Kw46kk4jDsBQGu3muzlUcYig7pbZW/HTryEPGLX8fGPBTcW77\nFK7o1r1nrTIt/Ehl6Orz0qo=\n-----END PRIVATE KEY-----\n',
      })

      this.loader.status = 'Загрузка информации о документе'

      await doc.loadInfo()

      this.loader.status = 'Загрузка городов'

      const sheet = doc.sheetsByTitle['км (исх)']
      await sheet.loadHeaderRow()

      this.cities = sheet.headerValues.filter(v => v != '')
      this.loader.isVisisble = false
    },
    async getInfo() {
      if (!this.form.from || !this.form.to || !this.form.type) {
        this.result = {}
        return
      }
      
      if (this.isCalculating) {
        return
      }

      this.isCalculating = true

      const distSheet = doc.sheetsByTitle['км (исх)']
      const mSheet = doc.sheetsByTitle[`м${ this.form.type }`]
      const pSheet = doc.sheetsByTitle[`п${ this.form.type }`]
      const kSheet = doc.sheetsByTitle[`к${ this.form.type }`]

      let pos = [0, 0]

      pos[1] = distSheet.headerValues.indexOf(this.form.to)

      await distSheet.loadCells({
          startRowIndex: 0,
          endRowIndex: distSheet.rowCount,
          startColumnIndex: 0,
          endColumnIndex: 1
      })

      for (let r = 0; r < distSheet.rowCount; r++) {
          if (distSheet.getCell(r, 0).formattedValue == this.form.from) {
              pos[0] = r
              break
          }
      }

      const promises = [
          distSheet.loadCells({ startRowIndex: pos[0], endRowIndex: pos[0] + 1, startColumnIndex: pos[1], endColumnIndex: pos[1] + 1 }),
          mSheet.loadCells({ startRowIndex: pos[0], endRowIndex: pos[0] + 1, startColumnIndex: pos[1], endColumnIndex: pos[1] + 1 }),
          pSheet.loadCells({ startRowIndex: pos[0], endRowIndex: pos[0] + 1, startColumnIndex: pos[1], endColumnIndex: pos[1] + 1 }),
          kSheet.loadCells({ startRowIndex: pos[0], endRowIndex: pos[0] + 1, startColumnIndex: pos[1], endColumnIndex: pos[1] + 1 }),
      ]
      await Promise.all(promises)

      this.result = {
          distance: distSheet.getCell(pos[0], pos[1]).formattedValue,
          m: mSheet.getCell(pos[0], pos[1]).formattedValue,
          p: pSheet.getCell(pos[0], pos[1]).formattedValue,
          k: kSheet.getCell(pos[0], pos[1]).formattedValue,
          ...this.form
      }

      this.isCalculating = false
    }
  },
  mounted() {
    this.load()
  },
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

.main {
  padding: 4rem 0 6rem;
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

.main__block {
  
  & + & {
    margin-top: 4rem;
  }
}

.main__title {
  font-size: 1.8rem;
  font-weight: 500;
  color: $text2;
}

.form {
  margin-top: 2rem;
}

.form__block {

  & + & {
    margin-top: 4rem;
  }
}

.form__block_inputs {

  @media screen and (min-width: $md-min) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
  }
}

.form__input {

  @media screen and (max-width: $sm-max) {
    & + & {
      margin-top: 2rem;
    }
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

.form__button {
  display: block;
  margin: 0 auto;
  height: 5rem;
  min-width: 30rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: $text1;
  background-color: $accent;
  @include hover;

  @media screen and (max-width: $sm-max) {
    width: 100%;
  }
}

.form__button_passive {
  color: $text2;
  background-color: $bg3;
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

.table {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  align-items: end;
  font-size: 1.6rem;

  @media screen and (min-width: $md-min) {
    grid-template-columns: 1fr 3fr;
  }
}

.table__title {
  color: $text3;

  &:after {
    content: ':';
  }
}

.table__value {
  color: $text2;
  font-weight: 500;

  span + span:before {
    content: ',';
    margin-right: 0.6rem;
  }
}

</style>
