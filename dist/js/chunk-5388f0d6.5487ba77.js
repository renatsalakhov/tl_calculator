(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5388f0d6"],{"295b":function(t,r,a){"use strict";a("8338")},8338:function(t,r,a){},d3a2:function(t,r,a){"use strict";a.r(r);var s=function(){var t=this,r=t.$createElement,a=t._self._c||r;return a("div",{staticClass:"page"},[a("div",{staticClass:"container"},[a("h1",{staticClass:"title"},[t._v("Расчет чистой маржи")]),a("div",{staticClass:"section"},[a("div",{staticClass:"form"},[a("div",{staticClass:"form__block"},[a("div",{staticClass:"form__item"},[a("label",{staticClass:"form__label"},[t._v("Ставка заказчика")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.customer.rate,expression:"form.customer.rate"}],staticClass:"form__input form__input_number",attrs:{placeholder:"Введите ставку заказчика",type:"number"},domProps:{value:t.form.customer.rate},on:{input:function(r){r.target.composing||t.$set(t.form.customer,"rate",r.target.value)}}})]),a("div",{staticClass:"form__item"},[a("p",{staticClass:"form__label"},[t._v("Форма оплаты заказчика")]),a("div",{staticClass:"form__types"},t._l(t.types,(function(r){return a("div",{staticClass:"radio",class:{radio_checked:t.form.customer.type===r.key},on:{click:function(){return t.form.customer.type=r.key}}},[a("span",{staticClass:"radio__box"}),a("span",{staticClass:"radio__text"},[t._v(t._s(r.text))])])})),0)]),a("div",{staticClass:"form__item"},[a("p",{staticClass:"form__label"},[t._v("Процент: "),a("span",[t._v(t._s(t.customerPercent)+"%")])])])]),a("div",{staticClass:"form__block"},[a("div",{staticClass:"form__item"},[a("label",{staticClass:"form__label"},[t._v("Ставка перевозчика")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.carrier.rate,expression:"form.carrier.rate"}],staticClass:"form__input form__input_number",attrs:{placeholder:"Введите ставку перевозчика",type:"number"},domProps:{value:t.form.carrier.rate},on:{input:function(r){r.target.composing||t.$set(t.form.carrier,"rate",r.target.value)}}})]),a("div",{staticClass:"form__item"},[a("p",{staticClass:"form__label"},[t._v("Форма оплаты перевозчику")]),a("div",{staticClass:"form__types"},t._l(t.types,(function(r){return a("div",{staticClass:"radio",class:{radio_checked:t.form.carrier.type===r.key},on:{click:function(){return t.form.carrier.type=r.key}}},[a("span",{staticClass:"radio__box"}),a("span",{staticClass:"radio__text"},[t._v(t._s(r.text))])])})),0)]),a("div",{staticClass:"form__item"},[a("p",{staticClass:"form__label"},[t._v("Процент: "),a("span",[t._v(t._s(t.carrierPercent)+"%")])])])])]),a("div",{staticClass:"result"},[t._v("Чистая маржа: "),a("span",[t._v(t._s(t.margin)+" руб.")])])])])])},e=[],i={data:function(){return{form:{customer:{rate:"",type:"cash"},carrier:{rate:"",type:"cash"}},types:[{key:"cash",text:"Наличные"},{key:"vat",text:"С НДС"},{key:"no vat",text:"Без НДС"}]}},computed:{customerPercent:function(){var t=this.form.customer.type;return"cash"===t?0:1.5},carrierPercent:function(){var t=this.form.customer.type,r=this.form.carrier.type;return"vat"===t&&"no vat"===r?5:"vat"!==t&&"no vat"!==t||"cash"!==r?"cash"!==t||"vat"!==r&&"no vat"!==r?"no vat"===t&&"vat"===r?-3.5:0:-3.5:7},margin:function(){var t=+this.form.customer.rate,r=+this.form.carrier.rate;return t&&r?t*(100-this.customerPercent)/100-r*(100+this.carrierPercent)/100:0}}},o=i,c=(a("295b"),a("2877")),n=Object(c["a"])(o,s,e,!1,null,"9ead4e66",null);r["default"]=n.exports}}]);
//# sourceMappingURL=chunk-5388f0d6.5487ba77.js.map