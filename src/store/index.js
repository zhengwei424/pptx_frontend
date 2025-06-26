import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {
    getWeeklyReports(context) {
        new Promise((resolve, reject) => {
            Vue.prototype.myAxios.get(
                "/weeklyReports",
            ).then(response => {
                const {data} = response
                context.commit('GETWEEKLYREPORTS', data)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    getWeeklyReportsJson(context) {
        new Promise((resolve, reject) => {
            Vue.prototype.myAxios.get(
                "/weeklyReportsJson",
            ).then(response => {
                const {data} = response
                context.commit('GETWEEKLYREPORTSJSON', data)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    getMonthlyReports(context) {
        new Promise((resolve, reject) => {
            Vue.prototype.myAxios.get(
                "/monthlyReports",
            ).then(response => {
                const {data} = response
                context.commit('GETMONTHLYREPORTS', data)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    getMonthlyReportsJson(context) {
        new Promise((resolve, reject) => {
            Vue.prototype.myAxios.get(
                "/monthlyReportsJson",
            ).then(response => {
                const {data} = response
                context.commit('GETMONTHLYREPORTSJSON', data)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    getMonthlySummaryReports(context) {
        new Promise((resolve, reject) => {
            Vue.prototype.myAxios.get(
                "/monthlySummaryReports",
            ).then(response => {
                const {data} = response
                context.commit('GETMONTHLYSUMMARYREPORTS', data)
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
    GETWEEKLYREPORTSJSON(state, data) {
        state.weeklyReportsJson = data
    },
    GETMONTHLYREPORTS(state, data) {
        state.monthlyReports = data
    },
    GETMONTHLYREPORTSJSON(state, data) {
        state.monthlyReportsJson = data
    },
    GETMONTHLYSUMMARYREPORTS(state, data) {
        state.monthlySummaryReports = data
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
    },
    setFormData(state, data) {
        state.formData = data
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
    formData: {
        year: (new Date()).getFullYear().toString(),
        month: '',
        week: ''
    },
    weeklyReports: [],
    weeklyReportsJson: [],
    monthlyReports: [],
    monthlyReportsJson: [],
    monthlySummaryReports: [],
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
    }
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
