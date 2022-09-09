<template>
  <div class="file">
    <el-upload
        class="upload-demo"
        :show-file-list="false"
        :action="url"
        :name="filename"
        :headers="header"
        :data="file_info"
        :on-success="file_upload"
    >
      <el-button type="primary">上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "ReportsFile",
  data() {
    return {
      // 上传地址
      url: "http://ip:port/file/upload",
      // 上传文件的文件名
      filename: null,
      // 文件上传是附带的额外参数
      file_info: null,
      // 请求头
      header: null
    }
  },
  methods: {
    file_upload(resp) {
      Message({
        message: resp.msg,
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>

<style scoped>

</style>
