<template>
  <div class="inspect">
    <h3>巡检</h3>
    <!--cell-class-name会在row和column中生成index字段-->
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        @cell-dblclick="dbclick"
        :cell-class-name="({ row, column, rowIndex, columnIndex }) => ((row.index = rowIndex), (column.index = columnIndex))"
    >
      <el-table-column
          prop="department"
          label="专业"
          width="100">
        联通云
      </el-table-column>
      <el-table-column
          prop="inspect_counts"
          label="巡检次数"
          width="100"
      >
        <template slot-scope="scope">
          <el-input type="text"
                    v-model="scope.row.inspect_counts"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.inspect_counts }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="error_counts"
          label="异常次数"
          width="100"
      >
        <template slot-scope="scope">
          <el-input type="text"
                    v-model="scope.row.error_counts"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.error_counts }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="reports_commit"
          label="报告提交次数"
          width="100"
      >
        <template slot-scope="scope">
          <el-input type="text"
                    v-model="scope.row.reports_commit"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.reports_commit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="周一">
        <el-table-column
            prop="Mon_morning"
            label="上午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Mon_morning"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Mon_morning }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="Mon_afternoon"
            label="下午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Mon_afternoon"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Mon_afternoon }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="周二">
        <el-table-column
            prop="Tue_morning"
            label="上午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Tue_morning"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Tue_morning }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="Tue_afternoon"
            label="下午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Tue_afternoon"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Tue_afternoon }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="周三">
        <el-table-column
            prop="Wed_morning"
            label="上午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Wed_morning"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Wed_morning }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="Wed_afternoon"
            label="下午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Wed_afternoon"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Wed_afternoon }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="周四">
        <el-table-column
            prop="Thu_morning"
            label="上午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Thu_morning"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Thu_morning }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="Thu_afternoon"
            label="下午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Thu_afternoon"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Thu_afternoon }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="周五">
        <el-table-column
            prop="Fri_morning"
            label="上午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Fri_morning"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Fri_morning }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="Fri_afternoon"
            label="下午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Fri_afternoon"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Fri_afternoon }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="周六">
        <el-table-column
            prop="Sat_morning"
            label="上午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Sat_morning"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Sat_morning }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="Sat_afternoon"
            label="下午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Sat_afternoon"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Sat_afternoon }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="周日">
        <el-table-column
            prop="Sun_morning"
            label="上午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Sun_morning"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Sun_morning }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="Sun_afternoon"
            label="下午"
            width="80"
        >
          <template slot-scope="scope">
            <el-input type="text"
                      v-model="scope.row.Sun_afternoon"
                      v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                      @blur="saveData"
                      v-focus
            />
            <span v-else>{{ scope.row.Sun_afternoon }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Inspect',
  data() {
    return {
      currentCellRowIndex: null,
      currentCellColumnIndex: null,
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
  directives: {
    focus: {
      inserted: function (el) {
        el.querySelector('input').focus()
      }
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
      this.currentCellRowIndex = row.index
      this.currentCellColumnIndex = column.index
    },
    saveData() {
      this.currentCellRowIndex = null
      this.currentCellColumnIndex = null
    },
  }
}
</script>


<style scoped>
h3 {
  color: rgb(0, 0, 0, 0.7);
}
.inspect {
  margin: 10px 0;
  padding: 10px;
  /*阴影效果*/
  box-shadow: #666666 0 0 10px;
}
</style>
