<template>
  <div class="release">
    <h3>支撑发版</h3>
    <div style="margin-bottom: 5px">
      <el-button type="primary" @click="copy">复制行</el-button>
      <el-button type="primary" @click="add">插入行</el-button>
      <el-button type="danger" @click="del">删除行</el-button>
    </div>
    <!--cell-class-name会在row和column中生成index字段-->
    <el-table
        :data="tableData"
        style="width: 100%"
        border
        @cell-click="click"
        @selection-change="getSelectedItems"
        :cell-class-name="setCellClassName"
    >
      <el-table-column
          type="selection"
          min-width="55"
      >
      </el-table-column>
      <el-table-column
          prop="department"
          label="专业"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.department"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
        </template>
      </el-table-column>
      <el-table-column
          prop="date"
          label="发版时间"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.date"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
        </template>
      </el-table-column>
      <el-table-column
          prop="count"
          label="次数"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.count"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
        </template>
      </el-table-column>
      <el-table-column
          prop="content"
          label="工作内容"
          min-width="100"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.content"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
        </template>
      </el-table-column>
      <el-table-column
          prop="exception"
          label="异常情况处理"
          min-width="150"
      >
        <template slot-scope="scope">
          <el-input type="textarea"
                    v-model="scope.row.exception"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Release",
  data() {
    return {
      currentCellRowIndex: null,
      currentCellColumnIndex: null,
      selectedItems: [],
    }
  },
  computed: {
    tableData() {
      return this.$store.state.release
    }
  },
  // directives: {
  //   focus: {
  //     inserted: function (el) {
  //       el.querySelector('input').focus()
  //     }
  //   }
  // },
  methods: {
    // 此处只是给row和column加一个索引index，不设置class name，如果需要自定义class name，return一个字符串即可
    setCellClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex
      column.index = columnIndex
    },
    click(row, column) {
      this.currentCellRowIndex = row.index
      this.currentCellColumnIndex = column.index
    },
    saveData() {
      this.$store.commit('setRelease', this.tableData)
    },
    // 鼠标获取一个cell焦点之后，键盘控制el-input
    keyup(event) {
      const that = this
      // 表的可编辑部分总行数
      let rowCount = this.tableData.length
      // 最后一列索引值
      const colMaxIndex = 5
      const action = event.key
      switch (action) {
        case 'ArrowUp': {
          this.currentCellRowIndex -= 1
          if (this.currentCellRowIndex < 0) {
            this.currentCellRowIndex = rowCount - 1
          }
          break
        }
        case 'ArrowDown': {
          this.currentCellRowIndex += 1
          if (this.currentCellRowIndex >= rowCount) {
            this.currentCellRowIndex = 0
          }
          break
        }
        case 'ArrowLeft': {
          this.currentCellColumnIndex -= 1
          if (this.currentCellColumnIndex < 1) {
            this.currentCellColumnIndex = colMaxIndex
          }
          break
        }
        case 'ArrowRight': {
          this.currentCellColumnIndex += 1
          if (this.currentCellColumnIndex > colMaxIndex) {
            this.currentCellColumnIndex = 1
          }
          break
        }
        case 'Tab': {
          this.currentCellColumnIndex += 1
          if (this.currentCellColumnIndex > colMaxIndex) {
            this.currentCellRowIndex += 1
            this.currentCellColumnIndex = 1
            if (this.currentCellRowIndex >= rowCount) {
              this.currentCellRowIndex = 0
            }
          }
          break
        }
        default: {
          break
        }
      }
      this.$nextTick(() => {
        that.$refs['r'+that.currentCellRowIndex+'c'+that.currentCellColumnIndex].focus()
      })
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
      const row = {
        department: '联通云',
        date: '',
        count: '1',
        content: '配合发版',
        exception: '无',
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
.release {
  margin: 10px 0;
  padding: 10px;
  /*阴影效果*/
  box-shadow: #666666 0 0 10px;
}
</style>
