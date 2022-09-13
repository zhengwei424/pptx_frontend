import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const actions = {
    getWeeklyReports(context) {
        new Promise((resolve, reject) => {
            axios.get(
                "http://192.168.10.168:5000/weeklyReports",
            ).then(response => {
                const {data} = response
                context.commit('GETWEEKLYREPORTS', data)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    getMonthlyReports(context) {
        new Promise((resolve, reject) => {
            axios.get(
                "http://192.168.10.168:5000/monthlyReports",
            ).then(response => {
                const {data} = response
                context.commit('GETMONTHLYREPORTS', data)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    }
}

const mutations = {
    GETWEEKLYREPORTS(state, data) {
        state.weeklyReports = data
    },
    GETMONTHLYREPORTS(state, data) {
        state.monthlyReports = data
    }
}

const state = {
    weeklyReports: [],
    monthlyReports: []
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
})
