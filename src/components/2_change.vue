<template>
  <div class="change">
    <h3>变更</h3>
    <!--cell-class-name会在row和column中生成index字段-->
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        @cell-dblclick="dbclick"
        @selection-change="getSelectedItems"
        :cell-class-name="({ row, column, rowIndex, columnIndex }) => ((row.index = rowIndex) (column.index = columnIndex))"
    >
      <el-table-column
          type="selection"
          width="55"
      ></el-table-column>
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
    <div>
      <el-button type="primary" @click="add">插入行</el-button>
      <el-button type="danger" @click="dels">删除行</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Change",
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
      // (值类型和引用类型的区别)object对象每次添加都需要重新初始化，不能使用放在data中的初始数据，会被select视为同一个数据（单一次选中所有新行）？？？
      const row = {
        department: '',
        category: '',
        content: '',
        effect: '',
        date: '',
        support: '',
        progress: ''
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

.change {
  margin: 10px 0;
  padding: 10px;
  /*阴影效果*/
  box-shadow: #666666 0 0 10px;
}
</style>
