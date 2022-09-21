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
    change: [
        {
            department: '联通云',
            category: '需求相应',
            content: '',
            effect: '',
            date: '',
            support: '无',
            progress: '已完成'
        }
    ],
    release: [
        {
            department: '联通云',
            date: '',
            count: '1',
            content: '配合发版',
            exception: '无',
        }
    ],
    permissionManagement: [
        {
            department: '联通云',
            environment: '',
            demander: '',
            content: '',
            progress: '已完成',
        }
    ],
    cooperation: [
        {
            department: '联通云',
            environment: '',
            demander: '',
            content: '',
            progress: '已完成',
        }
    ],
    problem: [
        {
            department: '联通云',
            describe: '',
            result: '已处理',
            reason: '',
            suggest: '无',
        }
    ],
    workingPlan: [
        {
            department: '',
            category: '',
            content: '',
            progress: '',
            next: '',
        }
    ],
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
    }
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
