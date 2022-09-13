<template>
  <div class="weeklyReports">
    <h3>周报</h3>
    <el-table
        :data="weeklyReports"
        border
        @selection-change="getSelectedItems"
        style="width: 100%">
      <el-table-column
          type="selection"
          width="55"
      ></el-table-column>
      <el-table-column
          prop="name"
          label="周报"
          width="180">
      </el-table-column>
    </el-table>
    <div>
      <!--文件上传-->
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
      <!--文件下载-->
      <el-button class="download" type="primary" @click="download">下载</el-button>
      <el-button class="refresh" type="primary" @click="refresh">刷新</el-button>
    </div>
  </div>
</template>

<script>
import {Message} from "element-ui"
import axios from "axios";

export default {
  name: "WeeklyReports",
  data() {
    return {
      // 上传地址
      url: "http://192.168.10.168:5000/weeklyReports/upload",
      // 上传文件的文件名
      filename: null,
      // 文件上传是附带的额外参数
      file_info: {
        aa: 'aa'
      },
      // 请求头
      header: null,
      selectedItems: [],
    }
  },
  computed: {
    weeklyReports() {
      return this.$store.state.weeklyReports
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    file_upload(resp) {
      Message({
        message: resp.msg,
        type: 'success',
        duration: 5 * 1000
      })
    },
    download() {
      this.selectedItems.map(item => {
        const url = `http://192.168.10.168:5000/weeklyReports/download/${item.name}`
        return new Promise((resolve, reject) => {
          axios.get(url).then((response) => {
            // Blob是一个不可变的、原始数据的类文件对象，它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。
            let blob = new Blob([response.data])
            const link = document.createElement('a')
            link.download = item.name
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            document.body.appendChild(link)
            link.click()
            URL.revokeObjectURL(link.href)
            document.body.removeChild(link)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      })
      // Promise.all(queue).then(result => {
      //   console.log(result)
      // })
    },
    refresh() {
      this.$store.dispatch('getWeeklyReports')
    },
    getSelectedItems(items) {
      this.selectedItems = items
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
