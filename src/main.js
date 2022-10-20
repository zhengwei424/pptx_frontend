import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store'
import axios from "axios"


Vue.use(ElementUI)
Vue.config.productionTip = false

let startApp = function () {
    axios
        .get("serverConfig.json")
        .then((res) => {
            Vue.prototype.VUE_APP_BACKEND_URL = res.data.VUE_APP_BACKEND_URL
            new Vue({
                render: h => h(App),
                store,
            }).$mount('#app')
        })
        .catch((error) => {
            console.log(error)
        })
}
startApp()


