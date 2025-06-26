<template>
  <div>
    <div class="week">
      <h2 style="line-height: 50px; margin-left: 10px">周报</h2>
    </div>
    <inspect></inspect>
    <change></change>
    <release></release>
    <permission-management></permission-management>
    <cooperation></cooperation>
    <problem></problem>
    <working-plan></working-plan>
    <div class="commit">
      <h3>提交</h3>
      <el-form :inline="true" :model="formData">
        <el-form-item>
          <!--v-model的值就是默认选项-->
          <el-input v-model="formData.year" placeholder="年"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formData.month" placeholder="月">
            <el-option label="1月" value="01"></el-option>
            <el-option label="2月" value="02"></el-option>
            <el-option label="3月" value="03"></el-option>
            <el-option label="4月" value="04"></el-option>
            <el-option label="5月" value="05"></el-option>
            <el-option label="6月" value="06"></el-option>
            <el-option label="7月" value="07"></el-option>
            <el-option label="8月" value="08"></el-option>
            <el-option label="9月" value="09"></el-option>
            <el-option label="10月" value="10"></el-option>
            <el-option label="11月" value="11"></el-option>
            <el-option label="12月" value="12"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formData.week" placeholder="周">
            <el-option label="第1周" value="01"></el-option>
            <el-option label="第2周" value="02"></el-option>
            <el-option label="第3周" value="03"></el-option>
            <el-option label="第4周" value="04"></el-option>
            <el-option label="第5周" value="05"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="files">
      <h2 style="line-height: 50px;margin-left: 10px">文件列表</h2>
    </div>
    <weekly-reports></weekly-reports>
    <monthly-reports></monthly-reports>
    <monthly-summary-reports></monthly-summary-reports>
  </div>
</template>

<script>
import Inspect from './1_inspect'
import Change from './2_change'
import Release from './3_release'
import PermissionManagement from './4_permissionManagement'
import Cooperation from './5_cooperation'
import Problem from './6_problem'
import WorkingPlan from './7_workingPlan'
import WeeklyReports from './8_weeklyReports'
import MonthlyReports from './9_monthlyReports'
import MonthlySummaryReports from './10_monthlySummaryReports'
import Vue from 'vue'

export default {
  name: "Reports",
  components: {
    Inspect,
    Change,
    Release,
    PermissionManagement,
    Cooperation,
    Problem,
    WorkingPlan,
    WeeklyReports,
    MonthlyReports,
    MonthlySummaryReports
  },
  data() {
    return {
      activeNames: ['1']
    }
  },
  computed: {
    formData() {
      return this.$store.state.formData
    }
  },
  watch: {
    formData: {
      handler: function (val) {
        this.$store.commit('setFormData', val)
      },
      deep: true
    }
  },
  methods: {
    onSubmit() {
      const weeklyData = this.$store.getters.weeklyData
      // status === 0 表示创建 1表示修改
      Vue.prototype.myAxios.post('/weeklyReportsData', {
        "status": 0,
        "weeklyData": weeklyData,
        "formdata": this.formData
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.data.code === 0) {
          this.$message({
            message: response.data.msg,
            type: 'success'
          });
          this.$store.dispatch('getWeeklyReports')
          this.$store.dispatch('getWeeklyReportsJson')
        } else if (response.data.code === 1) {
          this.$message.error(response.data.msg)
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>
.week, .files {
  height: 50px;
  background-image: linear-gradient(to top, #6a85b6 0%, #bac8e0 100%);
}

.commit {
  height: 200px;
  margin: 10px 0;
  padding: 10px;
  box-shadow: #666666 0 0 10px;
}

.el-form {
  margin-top: 50px;
}
</style>
