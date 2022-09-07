<template>
  <div class="workingPlan">
    <h3>下周工作计划</h3>
    <!--cell-class-name会在row和column中生成index字段-->
    <el-table
        :data="tableData"
        style="width: 100%"
        border
        @cell-dblclick="dbclick"
        @selection-change="getSelectedItems"
        :cell-class-name="({ row, column, rowIndex, columnIndex }) => ((row.index = rowIndex), (column.index = columnIndex))"
    >
      <el-table-column
          type="selection"
          width="55"
      >
      </el-table-column>
      <el-table-column
          label="序号"
          width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="department"
          label="所属专业"
          width="100"
      >
        <template slot-scope="scope">
          <el-input type="text"
                    v-model="scope.row.department"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="category"
          label="工作类别"
          width="100"
      >
        <template slot-scope="scope">
          <el-input type="text"
                    v-model="scope.row.category"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="content"
          label="工作内容"
          width="100"
      >
        <template slot-scope="scope">
          <el-input type="text"
                    v-model="scope.row.content"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="progress"
          label="工作进度"
          width="100"
      >
        <template slot-scope="scope">
          <el-input type="text"
                    v-model="scope.row.progress"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.progress }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="next"
          label="后续安排"
          width="100"
      >
        <template slot-scope="scope">
          <el-input type="text"
                    v-model="scope.row.next"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.next }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button type="primary" @click="add">添加行</el-button>
      <el-button type="danger" @click="dels">删除行</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkingPlan",
  data() {
    return {
      currentCellRowIndex: null,
      currentCellColumnIndex: null,
      selectedItems: [],
      tableData: [
        {
          department: '',
          category: '',
          content: '',
          progress: '',
          next: '',
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
  methods: {
    dbclick(row, column) {
      this.currentCellRowIndex = row.index
      this.currentCellColumnIndex = column.index
    },
    saveData() {
      this.currentCellRowIndex = null
      this.currentCellColumnIndex = null
    },
    getSelectedItems(items) {
      this.selectedItems = items
    },
    add() {
      const row = {
        department: '',
        category: '',
        content: '',
        progress: '',
        next: '',
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
.workingPlan {
  margin: 10px 0;
  padding: 10px;
  /*阴影效果*/
  box-shadow: #666666 0 0 10px;
}
</style>
