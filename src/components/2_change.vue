<template>
  <div class="change">
    <h3>变更</h3>
    <div style="margin-bottom: 5px">
      <el-button type="primary" @click="copy">复制行</el-button>
      <el-button type="primary" @click="add">插入行</el-button>
      <el-button type="danger" @click="del">删除行</el-button>
    </div>
    <!--cell-class-name会在row和column中生成index字段-->
    <el-table
        :data="tableData"
        border
        style="width: 100%"
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
          label="专业"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.department"
                    v-if="this.showCell['r'+scope.row.index+'c'+scope.column.index]"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
          <span v-else>{{ scope.row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="category"
          label="变更类别"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.category"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
          <span v-else>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="content"
          label="变更内容"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.content"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
          <span v-else>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="effect"
          label="变更影响"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.effect"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
          <span v-else>{{ scope.row.effect }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="date"
          label="变更时间"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.date"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
          <span v-else>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="support"
          label="资源支持"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.support"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
          <span v-else>{{ scope.row.support }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="progress"
          label="目前进展"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.progress"
                    v-if="scope.row.index === currentCellRowIndex && scope.column.index === currentCellColumnIndex"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
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
      selectedItems: [],
    }
  },
  computed: {
    tableData() {
      return this.$store.state.change
    },
    showCell() {
      let tmp = {}
      tmp['r' + this.currentCellRowIndex + 'c' + this.currentCellColumnIndex] = true
      return tmp
    }
  },
  // 自定义focus指令
  // directives: {
  //   focus: {
  //     inserted: function (el) {
  //       el.querySelector('input').focus()
  //     }
  //   }
  // },
  methods: {
    click(row, column) {
      this.currentCellRowIndex = row.index
      this.currentCellColumnIndex = column.index
      // 解决el-input的type为textarea时，单击表格无法自动focus（自定义focus指令）的问题
      this.$nextTick(() => {
        this.$refs['r' + row.index + 'c' + column.index].focus()
      })

    },
    keyup(event) {
      // 表的可编辑部分总行数
      let rowCount = this.tableData.length
      // 表的可编辑部分总列数
      const colCount = 7
      const action = event.key
      switch (action) {
        case 'ArrowUp': {
          this.currentCellRowIndex--
          if (this.currentCellRowIndex < 0) {
            this.currentCellRowIndex = rowCount - 1
          }
          break
        }
        case 'ArrowDown': {
          this.currentCellRowIndex++
          if (this.currentCellRowIndex >= rowCount) {
            this.currentCellRowIndex = 0
          }
          break
        }
        case 'ArrowLeft': {
          this.currentCellColumnIndex--
          if (this.currentCellColumnIndex < 0) {
            this.currentCellColumnIndex = colCount - 1
          }
          break
        }
        case 'ArrowRight': {
          this.currentCellColumnIndex++
          if (this.currentCellColumnIndex >= 7) {
            this.currentCellColumnIndex = 0
          }
          break
        }
        default: {
          break
        }
      }

      this.$nextTick(() => {
        this.$refs['r' + this.currentCellRowIndex + 'c' + this.currentCellColumnIndex].focus()
      })
    },
    saveData() {
      this.currentCellRowIndex = null
      this.currentCellColumnIndex = null
      this.showCell = {}
      this.$store.commit('setChange', this.tableData)
    },
    getSelectedItems(items) {
      this.selectedItems = items
    },
    copy() {
      for (const item of this.selectedItems) {
        // 深度拷贝
        // JSON.parse(JSON.stringify(ary))
        // JSON.parse(JSON.stringify(obj))
        this.tableData.push(JSON.parse(JSON.stringify(item)))
      }
    },
    add() {
      // (值类型和引用类型的区别)object对象每次添加都需要重新初始化，不能使用放在data中的初始数据，会被select视为同一个数据（单一次选中所有新行）？？？
      const row = {
        department: '联通云',
        category: '需求响应',
        content: '',
        effect: '',
        date: '',
        support: '无',
        progress: '已完成'
      }
      this.tableData.push(row)
    },
    del() {
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
