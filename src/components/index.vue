<template>
  <div>
    <el-collapse accordion>
      <el-collapse-item title="周报" name="1">
        <inspect></inspect>
        <change></change>
        <release></release>
        <permission-management></permission-management>
        <cooperation></cooperation>
        <problem></problem>
        <working-plan></working-plan>
        <el-form :inline="true" :model="formData">
          <el-form-item label="年">
            <el-input v-model="formData.year" placeholder="年"></el-input>
          </el-form-item>
          <el-form-item label="月">
            <el-select v-model="formData.month" placeholder="月">
              <el-option label="1月" value="1"></el-option>
              <el-option label="2月" value="2"></el-option>
              <el-option label="3月" value="3"></el-option>
              <el-option label="4月" value="4"></el-option>
              <el-option label="5月" value="5"></el-option>
              <el-option label="6月" value="6"></el-option>
              <el-option label="7月" value="7"></el-option>
              <el-option label="8月" value="8"></el-option>
              <el-option label="9月" value="9"></el-option>
              <el-option label="10月" value="10"></el-option>
              <el-option label="11月" value="11"></el-option>
              <el-option label="12月" value="12"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="月">
            <el-select v-model="formData.week" placeholder="月">
              <el-option label="第1周" value="1"></el-option>
              <el-option label="第2周" value="2"></el-option>
              <el-option label="第3周" value="3"></el-option>
              <el-option label="第4周" value="4"></el-option>
              <el-option label="第5周" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="月报" name="2">

      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script>
import Inspect from '@/components/1_inspect'
import Change from '@/components/2_change'
import Release from '@/components/3_release'
import PermissionManagement from '@/components/4_permissionManagement'
import Cooperation from '@/components/5_cooperation'
import Problem from '@/components/6_problem'
import WorkingPlan from '@/components/7_workingPlan'

export default {
  name: "Reports",
  components: {
    Inspect,
    Change,
    Release,
    PermissionManagement,
    Cooperation,
    Problem,
    WorkingPlan
  },
  data() {
    return {
      formData: {
        year: '2022',
        month: '',
        week: ''
      }
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>

<style scoped>

</style>
