<template>
  <div class="monthlyReports">
    <h3>月报JSON</h3>
    <el-table
        :data="monthlyReportsJson"
        border
        @selection-change="getJsonSelectedItems"
        style="width: 100%">
      <el-table-column
          type="selection"
          width="55"
      ></el-table-column>
      <el-table-column
          prop="fileName"
          sortable
          label="月报JSON"
          width="180">
      </el-table-column>
    </el-table>
    <el-button class="create" type="primary" @click="create">自定义月报汇总</el-button>
    <h3>月报</h3>
    <el-table
        :data="monthlyReports"
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
          label="月报"
          width="180">
      </el-table-column>
    </el-table>
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
      </el-upload>-->
      <!--文件下载-->
      <el-button class="download" type="primary" @click="download">下载</el-button>
      <el-button class="refresh" type="primary" @click="refresh">刷新</el-button>
    </div>
  </div>
</template>

<script>
import {Message} from "element-ui";
import Vue from 'vue'


export default {
  name: "MonthlyReports",
  data() {
    return {
      // 上传地址
      url: "/monthlyReports/upload",
      // 上传文件的文件名
      filename: null,
      // 文件上传是附带的额外参数
      file_info: {
        aa: 'aa'
      },
      // 请求头
      header: null,
      jsonSelectedItems: [],
      selectedItems: []
    }
  },
  computed: {
    monthlyReports() {
      return this.$store.state.monthlyReports
    },
    monthlyReportsJson() {
      return this.$store.state.monthlyReportsJson
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
        const url = `/monthlyReports/download/${item.name}`
        return new Promise((resolve, reject) => {
          Vue.prototype.myAxios.get(url,{responseType: 'blob'}).then((response) => {
            // Blob是一个不可变的、原始数据的类文件对象，它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。
            let blob = new Blob([response.data],{
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
      this.$store.dispatch('getMonthlyReports')
      this.$store.dispatch('getMonthlyReportsJson')
    },
    getJsonSelectedItems(items) {
      this.jsonSelectedItems = items
    },
    getSelectedItems(items) {
      this.selectedItems = items
    },
    // 汇总月报
    create() {
      if (this.jsonSelectedItems.length === 0) {
        this.$message({
          message: "请选择需要汇总的月报JSON",
          type: 'warning'
        });
        return
      }

      const url = "/monthlySummaryData"
      let monthly_report_json_files = []
      for (const item of this.jsonSelectedItems) {
        monthly_report_json_files.push(item.fileName)
      }
      Vue.prototype.myAxios.post(url, monthly_report_json_files).then(response => {
        if (response.data.code === 0) {
          this.$message({
            message: response.data.msg,
            type: 'success'
          });
          this.$store.dispatch('getMonthlySummaryReports')
        } else if (response.data.code === 1) {
          this.$message.error(response.data.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
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

.monthlyReports {
  margin: 10px 0;
  padding: 10px;
  /*阴影效果*/
  box-shadow: #666666 0 0 10px;
}
</style>
