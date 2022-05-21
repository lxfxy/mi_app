import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return {
      baseImgUrl: "http://127.0.0.1:9999/images/"
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
