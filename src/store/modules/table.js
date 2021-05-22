import { GoogleSpreadsheet } from 'google-spreadsheet'

let doc

export default {
  state: {
    cities: [],
    excludedCities: [],
    margins: [],
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
        key: 'Трал',
        text: 'Трал',
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
        key: '6к',
        text: 'Догруз 6 кубов',
      },
      {
        key: '8к',
        text: 'Догруз 8 кубов',
      },
      {
        key: '10к',
        text: 'Догруз 10 кубов',
      },
    ],
  },
  getters: {
    getMarginByCarrier: (state) => (value) => {
      let data = value < state.margins[0].carrier ? state.margins[0] : state.margins[state.margins.length - 1]

      for (let i = 0; i < state.margins.length - 1; i++) {
        if (value >= state.margins[i].carrier && value < state.margins[i + 1].carrier) {
          data = state.margins[i]
        }
      }

      return {
        carrier: Math.floor(+value),
        customer: Math.floor(value * (1 + data.percent / 100)),
        percent: data.percent,
        value: Math.floor(value * data.percent / 100)
      }
    },
  },
  mutations: {
    setCities(state, data) {
      state.cities = data
    },
    setExcludedCities(state, data) {
      state.excludedCities = data
    },
    setMargins(state, data) {
      state.margins = data
    }
  },
  actions: {
    async loadTable({ commit, dispatch }) {
      if (doc) {
        return
      }

      doc = new GoogleSpreadsheet('1BPHDRVWwO4nBEF5ERPDBBdFwfmgixtXz9rHarbZ-o7c')

      commit('showLoader', 'Подключение к Google Docs')

      await doc.useServiceAccountAuth({
          client_email: 'tarif-653@dogwood-envoy-300011.iam.gserviceaccount.com',
          private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCfZ3CcZRHtD82R\nFxCr5a3QgvTCTou43MHTj9OS/Kb9qauhpSKzg7deaKOw6uk3+l4VDTMe/0VmIHMQ\nJQmmVw4+OpWRYHxGa7huVF639QGSCC+dAMBOu7IRWSC+aF2ElmClBVNnftEEhu2+\n1vDS8e9uhjswupktOZ3dcydvJ51kfhdKcOyigM3Z1LSWn7FbdxN4kqyvR73oP4rv\nzoVspj8ASy52QHXFmiVm6SMsYNTNx0Rv/WdKzwyj5Whq70WxcD08L2zSzyeB/ZqR\nHIgbVUbsym2I5mahhJNQcs0Uo00EOzGIyE5KrwiwHCKaZLzRMS3UOsANRrtRYaQ9\nn/1UxUgpAgMBAAECggEAGFb8G/VW2mLaWbgy5HyKoNcONok1zoFu2zYP8VbAzOTW\nfzUu6khHfJPvwrjr6Y9CRGaikq4Z07FKwIFXSt3qH9hkNDGOaFZUcAxT9jTkC39S\nfd+6fYstcnawiEJ5XSB1G12H0brMgat0q/o4BY3JqI+4hAVKFFzC3SiTMebTop9c\nf7kx6agrZwpg/RoDIPhEoCWkddKx1wu/HqB2rH0O8hUQ2mgGWvGszkH0a/LZIoif\nNhT1PLMjINdBDfjEhRBSflixqK3Evp9UZAAVDNNePPX4b3F4ETetlKfcUNFVaypv\nQouWGJc9cGe97ibwNP975RmoDUwrJL81sEmfxx6hDQKBgQDTbDCZyJmPG8NIl4sk\nrGngsKS1FdfBtFxJ8SCebNj8CmwIh7B5SCKzJvuL714JKI4ZwnUWdNK0bTyO/Pn/\ndss+6F7CJHwWShZq+lP9LnrZDU7aI8b+6yjTvDQGw51TyMaKMzrLqluvM/Y+vMNv\n0c/+idk9aHugHqFhslm9GL2sZwKBgQDBA3sla9JKtaGttFrea0ZBvGKbIj8bPYrw\ntWxAQaGiC6RJEdFUPMtWHHOsutEWXGW2L0FEIV3Xo3NPBk3Ts84ql8gsX2SN+OR5\nTuK2PPCojMU990ACXTYYv+2aeh39NdTU2GIu8VXhpFU1WPBqwE1V9KqyYY7ZYK/6\nhInPwa+M7wKBgD8pdD+NMWsSlT3LoFMdeygYPayn0ORauLOSaPdLd2ucxXeq6erh\nxRQWklHU+hfsWL+TW52Q2x3yAISLSTiryb6Kdzyy36tdCON+07awuxy7IBKFW77u\njCztbfGTYR4VvlKtSWRtCaUG9gr6I7z1Rpk5n3/8BerpG7dvK+YVTR0DAoGBAIR7\nlzOAZr/RHEDW4uh4SaklXamOQDK6c3v1i3AvnHpV81YUXNKtSAS7UsrlEE+A7G+4\nz9ur63XwQ12ivhjp+kFSHZwXfjXU+T4q34KnIakPtvNpmw4EXPVwB+9Yku0S3hua\nywndrU1MNxB/E8ayaGLvpZr7S8n5i9Ew2Ec6cv0RAoGAJf+2/fotRvt8GxrwxFY6\nw/UTbOxOcuD8MiXL0sMUwVHb2kBRRZT1HxxRn+5vxyicCLNQOk0Vuc9bMDn7qIwf\nc8ZteZV03vOn6s/Kw46kk4jDsBQGu3muzlUcYig7pbZW/HTryEPGLX8fGPBTcW77\nFK7o1r1nrTIt/Ehl6Orz0qo=\n-----END PRIVATE KEY-----\n',
      })

      commit('showLoader', 'Загрузка информации о документе')

      await doc.loadInfo()

      await dispatch('loadCities')
      await dispatch('loadMargins')

      commit('hideLoader')
    },
    async loadCities({ commit }) {
      commit('showLoader', 'Загрузка городов')

      const citiesSheet = doc.sheetsByTitle['км (исх)']
      const excludedCitiesSheet = doc.sheetsByTitle['Города искл.']

      await citiesSheet.loadHeaderRow()
      const exceptions = await excludedCitiesSheet.getRows()

      commit('setCities', citiesSheet.headerValues.filter(v => !!v))
      commit('setExcludedCities', exceptions.map(r => r['Город']).filter(i => !!i))
    },
    async loadMargins({ commit }) {
      commit('showLoader', 'Загрузка таблицы маржи')

      const sheet = doc.sheetsByTitle['% маржа']
      const rows = await sheet.getRows()

      const margins = rows.map(r => {
        return {
          carrier: + r['Ставка перевозчика'],
          percent: + r['Процент'].split('%').join('')
        }
      })

      commit('setMargins', margins)
    },
    async getInfo({ commit, getters }, data) {
      commit('hideLoader')

      const distSheet = doc.sheetsByTitle['км (исх)']
      const mSheet = doc.sheetsByTitle[`м${ data.type }`]
      const pSheet = doc.sheetsByTitle[`п${ data.type }`]

      let pos = [0, 0]
      console.log(distSheet)

      pos[1] = distSheet.headerValues.indexOf(data.to)

      await distSheet.loadCells({
        startRowIndex: 0,
        endRowIndex: distSheet.rowCount,
        startColumnIndex: 0,
        endColumnIndex: 1
      })

      for (let r = 0; r < distSheet.rowCount; r++) {
        if (distSheet.getCell(r, 0).formattedValue == data.from) {
          pos[0] = r
          break
        }
      }

      const promises = [
        distSheet.loadCells({ startRowIndex: pos[0], endRowIndex: pos[0] + 1, startColumnIndex: pos[1], endColumnIndex: pos[1] + 1 }),
        mSheet.loadCells({ startRowIndex: pos[0], endRowIndex: pos[0] + 1, startColumnIndex: pos[1], endColumnIndex: pos[1] + 1 }),
        pSheet.loadCells({ startRowIndex: pos[0], endRowIndex: pos[0] + 1, startColumnIndex: pos[1], endColumnIndex: pos[1] + 1 }),
      ]
      await Promise.all(promises)

      const p = pSheet.getCell(pos[0], pos[1]).formattedValue

      return {
        distance: distSheet.getCell(pos[0], pos[1]).formattedValue,
        m: mSheet.getCell(pos[0], pos[1]).formattedValue,
        p: p,
        k: getters.getMarginByCarrier(p).customer,
        ...data
      }
    }
  }
}
