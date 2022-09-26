<template>
  <div class="problem">
    <h3>问题和告警处理</h3>
    <div style="margin-bottom: 5px">
      <el-button type="primary" @click="copy">复制行</el-button>
      <el-button type="primary" @click="add">插入行</el-button>
      <el-button type="danger" @click="dels">删除行</el-button>
    </div>
    <!--cell-class-name会在row和column中生成index字段-->
    <el-table
        :data="tableData"
        style="min-width: 100%"
        border
        @cell-click="click"
        @selection-change="getSelectedItems"
        :cell-class-name="({ row, column, rowIndex, columnIndex }) => ((row.index = rowIndex), (column.index = columnIndex))"
    >
      <el-table-column
          type="selection"
          min-width="55"
      ></el-table-column>
      <el-table-column
          prop="department"
          label="所属专业"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.department"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="describe"
          label="问题描述"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.describe"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.describe }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="result"
          label="处理结果"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.result"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.result }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="reason"
          label="原因分析"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.reason"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.reason }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="suggest"
          label="后续建议"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.suggest"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.suggest }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Problem",
  data() {
    return {
      currentCellRowIndex: null,
      currentCellColumnIndex: null,
      selectedItems: [],
    }
  },
  computed: {
    tableData() {
      return this.$store.state.problem
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.querySelector('input').focus()
      }
    }
  },
  methods: {
    click(row, column) {
      this.currentCellRowIndex = row.index
      this.currentCellColumnIndex = column.index
    },
    saveData() {
      this.currentCellRowIndex = null
      this.currentCellColumnIndex = null
      this.$store.commit('setProblem', this.tableData)
    },
    getSelectedItems(items) {
      this.selectedItems = items
    },
    copy() {

    },
    add() {
      const row = {
        department: '联通云',
        describe: '',
        result: '已处理',
        reason: '',
        suggest: '无',
      }
      this.tableData.push(row)
    },
    dels() {
      for (const item of this.selectedItems) {
        this.tableData.splice(item.index, 1)
      }
    }
  }
}
</script>

<style scoped>
h3 {
  color: rgb(0, 0, 0, 0.7);
}
.problem {
  margin: 10px 0;
  padding: 10px;
  /*阴影效果*/
  box-shadow: #666666 0 0 10px;
}
</style>
