(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-19854ee4"],{5685:function(t,s,e){"use strict";e("a8b9")},"920b":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"page"},[s("div",{staticClass:"container"},[s("h1",{staticClass:"title title_center"},[t._v("Расчет страховки")]),s("div",{staticClass:"section section_center"},[s("div",{staticClass:"form"},[s("div",{staticClass:"form__block"},[s("div",{staticClass:"form__item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],staticClass:"form__input form__input_number",attrs:{placeholder:"Введите стоимость груза",type:"number"},domProps:{value:t.input},on:{keyup:function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"enter",13,s.key,"Enter")?null:t.getResult()},input:function(s){s.target.composing||(t.input=s.target.value)}}}),s("button",{staticClass:"form__button",class:{form__button_passive:!t.input},on:{click:function(s){return t.getResult()}}},[t._v("Рассчитать")])])])])]),t.results.length>0?s("div",{staticClass:"section"},[s("p",{staticClass:"section__title section__title_center"},[t._v("Результат расчетов")]),s("div",{staticClass:"table"},[t._l(t.results,(function(e){return[s("div",{staticClass:"table__title"},[t._v(t._s(e.title))]),s("div",{staticClass:"table__value"},[t._v(t._s(e.value))])]}))],2),t._m(0)]):t._e()])])},n=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"section__desc"},[s("p",[t._v("* Страховка для грузов, стоимостью более 1 млн рублей")]),s("p",[t._v("** Стоимость страховки суммируется со стоимостью перевозки и сообщается клиенту в виде общей стоимости")])])}],a={data:()=>({input:"",results:[]}),methods:{getResult(){this.input?this.results=[{title:"Себестоимость",value:(67e-5*this.input).toFixed(2)+" руб."},{title:"Страховка с маржой",value:(.0015*this.input).toFixed(2)+" руб."}]:this.results=[]}}},l=a,u=(e("5685"),e("2877")),c=Object(u["a"])(l,i,n,!1,null,"15978521",null);s["default"]=c.exports},a8b9:function(t,s,e){}}]);
//# sourceMappingURL=chunk-19854ee4.70929788.js.map