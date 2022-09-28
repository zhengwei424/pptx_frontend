import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import store from './store'
import shortID from 'shortid'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.shortID = shortID

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')
