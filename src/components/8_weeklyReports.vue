<template>
  <div class="weeklyReports">
    <h3>周报JSON</h3>
    <el-table
        :data="weeklyReportsJson.result"
        border
        style="width: 100%">
      <el-table-column
          width="55"
      >
        <template scope="scope">
          <el-radio v-model="editTitle" :label="scope.row.fileName">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column
          prop="fileName"
          sortable
          label="文件名"
          width="180">
      </el-table-column>
      <el-table-column
          sortable
          label="操作"
          width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row.fileName)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- weeklyReportJson 分页 -->
    <div style="margin: 10px 0">
      <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="currentPage1"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="weeklyReportsJson.total">
        >
      </el-pagination>
    </div>

    <el-button type="primary" @click="updateWeeklyReport">指定JSON更新周报</el-button>

    <h3>周报</h3>
    <el-table
        :data="weeklyReports.result"
        border
        @selection-change="getSelectedItems"
        style="width: 100%">
      <el-table-column
          type="selection"
          width="55"
      ></el-table-column>
      <el-table-column
          prop="name"
          sortable
          label="周报"
          width="180">
      </el-table-column>
    </el-table>

    <!-- weeklyReport 分页 -->
    <div style="margin: 10px 0">
      <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="weeklyReports.total">
        >
      </el-pagination>
    </div>
    <div>
      <!--文件上传
      <el-upload
          class="upload-demo"
          :show-file-list="false"
          name="file"
          :multiple="true"
          :action="url"
          :data="file_info"
          :on-success="file_upload"
      >
        <el-button type="primary">上传</el-button>
      </el-upload>
      -->
      <!--文件下载-->
      <el-button class="download" type="primary" @click="download">下载</el-button>
      <el-button class="refresh" type="primary" @click="refresh">刷新</el-button>
      <el-button class="create" type="primary" @click="create">合成月报</el-button>
    </div>
    <!--编辑json-->
    <el-dialog
        :title="editTitle"
        :visible.sync="dialogVisible"
        width="80%"
    >
      <MonacoEditor
          :value="editValue"
          width="800px"
          height="500px"
          language="json"
          @input="getNewJsonData"
      ></MonacoEditor>
      <span slot="footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="updateJson">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {Message} from "element-ui"
import MonacoEditor from 'monaco-editor-vue'
import Vue from 'vue'

export default {
  name: "WeeklyReports",
  components: {
    MonacoEditor
  },
  data() {
    return {
      // 上传地址
      url: "/weeklyReports/upload",
      // 上传文件的文件名
      filename: null,
      // 文件上传是附带的额外参数
      file_info: {
        aa: 'aa'
      },
      // 请求头
      header: null,
      selectedItems: [],
      // 当前选中的json文件
      editTitle: '',
      // 当前选中的json文件内容
      editValue: '',
      // 编辑后的新值
      newEditValue: '',
      // dialogVisible
      dialogVisible: false,
      // json分页
      currentPage1: 1,
      pageSize1: 10,
      // report分页
      currentPage2: 1,
      pageSize2: 10
    }
  },
  computed: {
    weeklyReports() {
      return this.$store.state.weeklyReports
    },
    weeklyReportsJson() {
      return this.$store.state.weeklyReportsJson
    }
  },
  watch: {
    editTitle: function (val) {
      // 当editTile值发生变化时，提示用户保存浏览器界面所填数据
      this.$confirm('请确认页面上所填数据是否已经提交', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: "warning"
      }).then(() => {
        // 用户点击“确认”后，将所选json渲染到页面
        this.weeklyReportsJson.result.forEach(item => {
          if (item.fileName === val) {
            let jsonObj = JSON.parse(item.fileContent)
            // 将json设置为“修改”状态
            jsonObj.status = 1
            this.$store.commit('setCurrentReportJson', jsonObj)
            // 渲染相应字段到页面
            this.$store.commit('setInspect', jsonObj.weeklyData.inspect)
            this.$store.commit('setChange', jsonObj.weeklyData.change)
            this.$store.commit('setRelease', jsonObj.weeklyData.release)
            this.$store.commit('setPermissionManagement', jsonObj.weeklyData.permissionManagement)
            this.$store.commit('setCooperation', jsonObj.weeklyData.cooperation)
            this.$store.commit('setProblem', jsonObj.weeklyData.problem)
            this.$store.commit('setWorkingPlan', jsonObj.weeklyData.workingPlan)
            this.$store.commit('setFormData', jsonObj.formData)
          }
        })
      }).catch(() => {
        // 用户点击“取消”后的操作
      })
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    file_upload(resp) {
      this.refresh()
      Message({
        message: resp.msg,
        type: 'success',
        duration: 5 * 1000
      })
    },
    download() {
      this.selectedItems.map(item => {
        const url = `/weeklyReports/download/${item.name}`
        return new Promise((resolve, reject) => {
          Vue.prototype.myAxios.get(url, {responseType: 'blob'}).then((response) => {
            // Blob是一个不可变的、原始数据的类文件对象，它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。
            let blob = new Blob([response.data], {
              // pptx的MIME Type, （linux可以通过file -i <filename>查看文件MIME Type）
              type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            })
            const link = document.createElement('a')
            link.download = item.name
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            document.body.appendChild(link)
            link.click()
            URL.revokeObjectURL(link.href)
            document.body.removeChild(link)
            this.$message({
              message: item.name + "下载成功",
              type: 'success'
            });
            resolve()
          }).catch(error => {
            this.$message.error(item.name + "文件下载失败")
            console.log("文件下载失败: " + error)
            reject(error)
          })
        })
      })
    },
    refresh() {
      this.$store.dispatch('getWeeklyReports', {currentPage: this.currentPage2, pageSize: this.pageSize2})
      this.$store.dispatch('getWeeklyReportsJson', {currentPage: this.currentPage1, pageSize: this.pageSize1})
    },
    getSelectedItems(items) {
      this.selectedItems = items
    },
    create() {
      const url = "/monthlyReportsData"
      let weekly_reports = []
      for (const item of this.selectedItems) {
        weekly_reports.push(item.name)
      }
      Vue.prototype.myAxios.post(url, weekly_reports).then(response => {
        if (response.data.code === 0) {
          this.$message({
            message: response.data.msg,
            type: 'success'
          });
          this.$store.dispatch('getMonthlyReports', {currentPage: 1, pageSize: 10})
          this.$store.dispatch('getMonthlyReportsJson', {currentPage: 1, pageSize: 10})
        } else if (response.data.code === 1) {
          this.$message.error(response.data.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 编辑json
    edit(name) {
      this.dialogVisible = true
      this.editTitle = name
      this.weeklyReportsJson.result.forEach(item => {
        if (item.fileName === name) {
          this.editValue = item.fileContent
        }
      })
    },
    getNewJsonData(value) {
      this.newEditValue = value
    },
    // 保存json并更新后端json文件
    updateJson() {
      this.dialogVisible = false
      const url = "/weeklyReportsJson"
      const data = {
        fileName: this.editTitle,
        fileContent: this.newEditValue
      }
      Vue.prototype.myAxios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.data.code === 0) {
          this.$message({
            message: response.data.msg,
            type: 'success'
          });
          this.$store.dispatch('getWeeklyReportsJson', {currentPage: this.currentPage1, pageSize: this.pageSize1})
        } else if (response.data.code === 1) {
          this.$message.error(response.data.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    updateWeeklyReport() {
      if (this.editTitle === '') {
        this.$message({
          type: "warning",
          message: '请指定JSON文件'
        })
        return
      }
      let post_data = {}
      this.weeklyReportsJson.result.forEach(item => {
        if (item.fileName === this.editTitle) {
          post_data = JSON.parse(item.fileContent)
        }
      })
      // status === 0 表示创建 1表示修改
      post_data["status"] = 1
      Vue.prototype.myAxios.post('/weeklyReportsData', post_data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.data.code === 0) {
          this.$message({
            message: response.data.msg,
            type: 'success'
          });
          this.$store.dispatch('getWeeklyReports', {currentPage: this.currentPage2, pageSize: this.pageSize2})
        } else if (response.data.code === 1) {
          this.$message.error(response.data.msg)
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // json 分页
    handleSizeChange1(val) {
      this.pageSize1 = val
      this.$store.dispatch(
          'getWeeklyReportsJson',
          {currentPage: this.currentPage1, pageSize: this.pageSize1}
      )
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val
      this.$store.dispatch(
          'getWeeklyReportsJson',
          {currentPage: this.currentPage1, pageSize: this.pageSize1}
      )
    },
    // report 分页
    handleSizeChange2(val) {
      this.pageSize2 = val
      this.$store.dispatch(
          'getWeeklyReports',
          {currentPage: this.currentPage2, pageSize: this.pageSize2}
      )
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val
      this.$store.dispatch(
          'getWeeklyReports',
          {currentPage: this.currentPage2, pageSize: this.pageSize2}
      )
    }
  }
}
</script>

<style scoped>

.upload-demo {
  display: inline-block;
}

.upload-demo, .download, .refresh {
  margin: 0 10px;
}

h3 {
  color: rgb(0, 0, 0, 0.7);
}

.weeklyReports {
  margin: 10px 0;
  padding: 10px;
  /*阴影效果*/
  box-shadow: #666666 0 0 10px;
}
</style>
