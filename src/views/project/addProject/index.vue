<template>
  <div class="add-project-container">
    <div class="block">项目名称</div>
    <div>
      <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
    </div>

    <div class="block">项目描述(每一项描述以英文逗号(,)分割)</div>
    <div>
      <el-input v-model="form.description" placeholder="请输入项目秒速，每一项描述以英文逗号分割"></el-input>
    </div>

    <div class="block">项目链接</div>
    <div>
      <el-input v-model="form.url" placeholder="请输入项目链接"></el-input>
    </div>

    <div class="block">gitHub 地址</div>
    <div>
      <el-input v-model="form.github" placeholder="请输入项目github地址"></el-input>
    </div>

    <div class="block">项目预览图</div>
    <div>
      <Upload title="" v-model="form.thumb" />
    </div>

    <div class="block">项目等级</div>
    <div>
      <el-select placeholder="分类等级" v-model="form.order">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
    </div>

    <div class="block">
      <el-button type="primary" plain @click="addProjectHandle">发布项目</el-button>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import { addProject } from "@/api/project.js";

export default {
  data(){
    return {
      form: {
        name: "",  //项目名称
        description: "", //项目描述
        url: "",  //项目链接
        github: "", //项目github地址
        thumb: "", //项目预览图地址
        order: "", //项目分类等级
      }
    }
  },
  components: {
    Upload,
  },
  methods: {
    addProjectHandle(){
      // 处理description和order
      let projectInfo = {...this.form};
      projectInfo.description = projectInfo.description.split(",");
      projectInfo.order = parseInt(projectInfo.order);
      // 发送项目信息
      addProject(projectInfo).then((res)=>{
        this.$router.push("/projectList");
        this.$message.success("添加成功")
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.add-project-container {
  padding: 20px;
  .block {
    margin: 20px 0;
  }
}
</style>