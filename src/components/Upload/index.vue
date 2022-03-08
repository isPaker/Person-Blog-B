<template>
  <div class="upload-container">
    <div class="upload-title">{{ title }}</div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      :headers="headers"
    >
      <img v-if="value" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: ["title", "value"],
  computed: {
    imageUrl() {
      if (this.value) {
        return "http://localhost:7001" + this.value;
      }
    },
    headers() {
      return {
        Authorization: "Bearer " + localStorage.getItem("adminToken"), // 从本地获取 token，添加到 header 里面
      };
    },
  },
  methods: {
    handleImageSuccess(res) {
      // console.log("handleAvatarSuccess>>>", res);
      if (!res.code && res.data){
        this.$emit("input", res.data)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-container {
  display: flex;
  .upload-title {
    font-weight: 100;
    margin-right: 15px;
  }
}
.avatar-uploader {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>