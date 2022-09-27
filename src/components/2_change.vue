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
        <!--v-if和refs冲突，不能同时使用-->
        <template slot-scope="scope">
          <div :ref="'r'+scope.row.index+'c'+scope.column.index">
            <el-input type="textarea"
                      v-model="scope.row.department"
                      v-show="showCell['r'+scope.row.index+'c'+scope.column.index]"
                      @blur="saveData"
                      @keyup.native="keyup"

            />
            <span v-show="showCell['r'+scope.row.index+'c'+scope.column.index] !== true">{{ scope.row.department }}</span>
          </div>
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
                    v-show="showCell['r'+scope.row.index+'c'+scope.column.index]"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
          <span v-show="showCell['r'+scope.row.index+'c'+scope.column.index] !== true">{{ scope.row.category }}</span>
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
                    v-show="showCell['r'+scope.row.index+'c'+scope.column.index]"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
          <span v-show="showCell['r'+scope.row.index+'c'+scope.column.index] !== true">{{ scope.row.content }}</span>
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
                    v-show="showCell['r'+scope.row.index+'c'+scope.column.index]"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
          <span v-show="showCell['r'+scope.row.index+'c'+scope.column.index] !== true">{{ scope.row.effect }}</span>
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
                    v-show="showCell['r'+scope.row.index+'c'+scope.column.index]"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
          <span v-show="showCell['r'+scope.row.index+'c'+scope.column.index] !== true">{{ scope.row.date }}</span>
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
                    v-show="showCell['r'+scope.row.index+'c'+scope.column.index]"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
          <span v-show="showCell['r'+scope.row.index+'c'+scope.column.index] !== true">{{ scope.row.support }}</span>
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
                    v-show="showCell['r'+scope.row.index+'c'+scope.column.index]"
                    @blur="saveData"
                    @keyup.native="keyup"
                    :ref="'r'+scope.row.index+'c'+scope.column.index"
          />
          <span v-show="showCell['r'+scope.row.index+'c'+scope.column.index] !== true">{{ scope.row.progress }}</span>
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
      currentCell: null,
      selectedItems: [],
      showCell: {},
    }
  },
  computed: {
    tableData() {
      return this.$store.state.change
    }
  },
  watch: {
    'tableData.length': {
      immediate: true,
      handler() {
        this.initShowCell()
      }
    }
  },
  updated() {
    this.initShowCell()
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
    // 初始化showCell
    initShowCell() {
      for (let i = 0; i < this.tableData.length; i++) {
        // 因为第一列是select，tableData从第二列开始
        for (let j = 1; j < 8; j++) {
          this.showCell['r' + i + 'c' + j] = false
        }
      }
    },
    // 鼠标获取cell焦点
    click(row, column) {
      const that = this
      that.currentCellRowIndex = row.index
      that.currentCellColumnIndex = column.index
      that.currentCell = 'r' + row.index + 'c' + column.index
      that.showCell[that.currentCell] = true
      // console.log("鼠标点击:", this.showCell)
      // this.$refs.r0c1.focus()
      // // 解决el-input的type为textarea时，单击表格无法自动focus（自定义focus指令）的问题
      that.$nextTick(() => {
        that.$refs[that.showCell].focus()
        console.log(this.$refs.r0c1)
      })

    },
    // 鼠标失去cell焦点保存数据
    saveData() {
      this.initShowCell()
      console.log("失去焦点：", this.showCell)
      this.$store.commit('setChange', this.tableData)
    },
    // 鼠标获取一个cell焦点之后，键盘控制el-input
    keyup(event) {
      // 表的可编辑部分总行数
      let rowCount = this.tableData.length
      // 表的可编辑部分总列数
      const colCount = 7
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
            this.currentCellColumnIndex = colCount
          }
          break
        }
        case 'ArrowRight': {
          this.currentCellColumnIndex += 1
          if (this.currentCellColumnIndex > 7) {
            this.currentCellColumnIndex = 1
          }
          break
        }
        default: {
          break
        }
      }

      this.$nextTick(() => {
        this.$refs[this.currentCell].focus()
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
