<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%"
        @cell-dblclick="dbclick">
      <el-table-column
          prop="department"
          label="专业"
          width="150">
        惠企
      </el-table-column>
      <el-table-column
          prop="inspect_counts"
          label="巡检次数"
          width="150"
          type="index"
          :index="1"
      >
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.inspect_counts" v-if="isEdit && scope.column.index === 1" @blur="saveData"/>
          <span @click="test(scope.column)" v-else>{{ scope.row.inspect_counts }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="error_counts"
          label="异常次数"
          width="150"
          type="index"
          :index="2"
      >
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.error_counts" v-if="isEdit && scope.column.index === 2" @blur="saveData"/>
          <span v-else>{{ scope.row.error_counts }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="reports_commit"
          label="报告提交次数"
          width="150"
          type="index"
          :index="3"
      >
      </el-table-column>
      <el-table-column label="周一">
        <el-table-column
            prop="Mon_morning"
            label="上午"
            width="50"
            type="index"
            :index="4"
        >
        </el-table-column>
        <el-table-column
            prop="Mon_afternoon"
            label="下午"
            width="50"
            type="index"
            :index="5"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column label="周二">
        <el-table-column
            prop="Tue_morning"
            label="上午"
            width="50"
            type="index"
            :index="6"
        >
        </el-table-column>
        <el-table-column
            prop="Tue_afternoon"
            label="下午"
            width="50"
            type="index"
            :index="7"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column label="周三">
        <el-table-column
            prop="Wed_morning"
            label="上午"
            width="50"
            type="index"
            :index="8"
        >
        </el-table-column>
        <el-table-column
            prop="Wed_afternoon"
            label="下午"
            width="50"
            type="index"
            :index="9"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column label="周四">
        <el-table-column
            prop="Thu_morning"
            label="上午"
            width="50"
            type="index"
            :index="10"
        >
        </el-table-column>
        <el-table-column
            prop="Thu_afternoon"
            label="下午"
            width="50"
            type="index"
            :index="11"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column label="周五">
        <el-table-column
            prop="Fri_morning"
            label="上午"
            width="50"
            type="index"
            :index="12"
        >
        </el-table-column>
        <el-table-column
            prop="Fri_afternoon"
            label="下午"
            width="50"
            type="index"
            :index="13"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column label="周六">
        <el-table-column
            prop="Sat_morning"
            label="上午"
            width="50"
            type="index"
            :index="14"
        >
        </el-table-column>
        <el-table-column
            prop="Sat_afternoon"
            label="下午"
            width="50"
            type="index"
            :index="15"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column label="周日">
        <el-table-column
            prop="Sun_morning"
            label="上午"
            width="50"
            type="index"
            :index="16"
        >
        </el-table-column>
        <el-table-column
            prop="Sun_afternoon"
            label="下午"
            width="50"
            type="index"
            :index="17"
        >
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Reports',
  data() {
    return {
      isEdit: false,
      tableData: [
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
      ]
    }
  },
  watch: {
    tableData: {
      deep: true,
      handler(a, b) {
        console.log("old: ", a, "new: ", b)
      }
    }
  },
  methods: {
    dbclick(row, column) {
      this.isEdit = true
      console.log(row, column)
    },
    saveData() {
      this.isEdit = false
    },
    test(index) {
      console.log(index)
    }
  }
}
</script>


<style scoped>

</style>
