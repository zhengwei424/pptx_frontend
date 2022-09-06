<template>
  <div>
    <!--cell-class-name会在row和column中生成index字段-->
    <el-table
        :data="tableData"
        style="width: 100%"
        @cell-dblclick="dbclick"
        :cell-class-name="({ row, column, rowIndex, columnIndex }) => ((row.index = rowIndex), (column.index = columnIndex))"
    >
      <el-table-column
          prop="department"
          label="专业"
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
          label="变更类别"
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
          label="变更内容"
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
          prop="effect"
          label="变更影响"
          width="100"
      >
        <template slot-scope="scope">
          <el-input type="text"
                    v-model="scope.row.effect"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.effect }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="date"
          label="变更时间"
          width="100"
      >
        <template slot-scope="scope">
          <el-input type="text"
                    v-model="scope.row.date"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="support"
          label="资源支持"
          width="100"
      >
        <template slot-scope="scope">
          <el-input type="text"
                    v-model="scope.row.support"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    v-focus
          />
          <span v-else>{{ scope.row.support }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="progress"
          label="目前进展"
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
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Change",
  data() {
    return {
      currentCellRowIndex: null,
      currentCellColumnIndex: null,
      tableData: [
        {
          department: '',
          category: '',
          content: '',
          effect: '',
          date: '',
          support: '',
          progress: ''
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
  // watch: {
  //   tableData: {
  //     deep: true,
  //     handler(a, b) {
  //       console.log("old: ", a, "new: ", b)
  //     }
  //   }
  // },
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

</style>