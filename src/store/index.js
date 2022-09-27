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
    },

    setInspect(state, data) {
        state.inspect = data
    },

    setChange(state, data) {
        state.change = data
    },
    setRelease(state, data) {
        state.release = data
    },
    setPermissionManagement(state, data) {
        state.permissionManagement = data
    },
    setCooperation(state, data) {
        state.cooperation = data
    },
    setProblem(state, data) {
        state.problem = data
    },
    setWorkingPlan(state, data) {
        state.workingPlan = data
    }
}

const state = {
    inspect: [
        {
            inspect_counts: 11,
            error_counts: 0,
            reports_commit: 6,
            Mon_morning: '√',
            Mon_afternoon: '√',
            Tue_morning: '√',
            Tue_afternoon: '√',
            Wed_morning: '√',
            Wed_afternoon: '√',
            Thu_morning: '√',
            Thu_afternoon: '√',
            Fri_morning: '√',
            Fri_afternoon: '√',
            Sat_morning: '',
            Sat_afternoon: '',
            Sun_morning: '√',
            Sun_afternoon: '',
        }
    ],
    change: [],
    release: [],
    permissionManagement: [],
    cooperation: [],
    problem: [],
    workingPlan: [],
    weeklyReports: [],
    monthlyReports: [],
}

const getters = {
    weeklyData(state) {
        return {
            inspect: state.inspect,
            change: state.change,
            release: state.release,
            permissionManagement: state.permissionManagement,
            cooperation: state.cooperation,
            problem: state.problem,
            workingPlan: state.workingPlan,
        }
    },
    // 初始化数据，用于变更的v-show
    initShowChangeCell(state) {
        let tmp = {}
        for (let i = 0; i < state.change.length; i++) {
            // 因为第一列是select，tableData从第二列开始
            for (let j = 1; j < 8; j++) {
                tmp['r' + i + 'c' + j] = false
            }
        }
        return tmp
    },
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
