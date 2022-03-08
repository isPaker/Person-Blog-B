<template>
  <div class="about-container">
    <div class="block">关于我</div>
    <el-input
      v-model="url"
      placeholder="请输入"
      :disabled="isDisabled"
    ></el-input>
    <div class="block">
      <el-button type="primary" @click="handleBtnClick" >{{btnContent}}</el-button>
    </div>
  </div>
</template>

<script>
import { getAbout, editAbout } from "@/api/about.js"

export default {
  data(){
    return {
      url: "",
      isDisabled: true,
      btnContent: "编辑",
    }
  },
  created(){
    this.fetchData();
  },
  methods: {
    fetchData(){
      getAbout().then((res)=>{
        // console.log(res)
        this.url = res.data;
      })
    },
    handleBtnClick(){
      if(this.btnContent == "编辑"){
        this.btnContent = "完成";
        this.isDisabled = !this.isDisabled;
      }else{
        if(this.url){
          this.btnContent = "编辑";
          this.isDisabled = !this.isDisabled;
          editAbout({url: this.url}).then((res)=>{
            this.$message.success("更新成功")
          })
        }else{
          this.$message({
            message: "输入框不能为空",
            type: "wraning",
          })
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.about-container {
  padding: 20px;
  .block{
    margin: 20px 0;
  }
}
</style>