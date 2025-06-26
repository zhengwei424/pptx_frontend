import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store'
import axios from "axios";



Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.myAxios = axios.create({
    // baseURL: ''
    baseURL: 'http://192.168.10.168:5000'
})

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')



