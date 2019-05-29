import Vue from 'vue'
import App from './App.vue'
import router from '../../plugins/router'
import store from '../../plugins/store'
import '../../plugins/element.js'
import { Message } from 'element-ui'

Vue.config.productionTip = false
if(store.state.token == ""){
  Message({type:"error",message:"请登录"})
  setTimeout(() => {
    window.location.href = "./login.html"
  }, 1000);
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
