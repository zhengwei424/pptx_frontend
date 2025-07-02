<template>
  <div class="monthlyReports">
    <h3>自定义月报汇总</h3>
    <el-table
        :data="monthlySummaryReports.result"
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
          label="文件名"
          width=auto>
      </el-table-column>
    </el-table>
    <!-- monthlySummaryReports 分页 -->
    <div style="margin: 10px 0">
      <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="currentPage1"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="monthlySummaryReports.total">
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
      </el-upload>-->
      <!--文件下载-->
      <el-button class="download" type="primary" @click="download">下载</el-button>
      <el-button class="refresh" type="primary" @click="refresh">刷新</el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'


export default {
  name: "MonthlySummaryReports",
  data() {
    return {
      selectedItems: [],
      // report分页
      currentPage1: 1,
      pageSize1: 10,
    }
  },
  computed: {
    monthlySummaryReports() {
      return this.$store.state.monthlySummaryReports
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    download() {
      this.selectedItems.map(item => {
        const url = `/monthlySummaryReports/download/${item.name}`
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
      this.$store.dispatch('getMonthlySummaryReports', {currentPage: this.currentPage1, pageSize: this.pageSize1})
    },
    getSelectedItems(items) {
      this.selectedItems = items
    },
    // report 分页
    handleSizeChange1(val) {
      this.pageSize1 = val
      this.$store.dispatch(
          'getMonthlySummaryReports',
          {currentPage: this.currentPage1, pageSize: this.pageSize1}
      )
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val
      this.$store.dispatch(
          'getMonthlySummaryReports',
          {currentPage: this.currentPage1, pageSize: this.pageSize1}
      )
    },
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
