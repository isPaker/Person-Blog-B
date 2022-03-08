<template>
  <div class="add-blog-container">
    <!-- 文章标题 -->
    <div class="block">文章标题</div>
    <div>
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>

    <!-- 文章编辑 -->
    <div class="block">文章编辑</div>
    <editor
      ref="toastuiEditor"
      :initialValue="form.editorText"
      height="500px"
      :options="editorOptions"
    />

    <!-- 文章描述 -->
    <div class="block">文章描述</div>
    <el-input type="textarea" v-model="form.description"></el-input>

    <!-- 文章图片 -->
    <div class="block">文章图片</div>
    <div>
      <Upload title="" v-model="form.thumb" />
    </div>

    <!-- 选择分类 -->
    <div class="block">文章选择分类</div>
    <div>
      <el-select v-model="form.select" placeholder="请选择">
        <el-option
          v-for="item in blogType"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>

    <!-- 发布按钮 -->
    <div class="block">
      <el-button
        type="primary"
        @click="addBlogHandle"
      >{{btnContent}}</el-button>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import { postBlog } from "@/api/blog.js";
import { getBlogType } from "@/api/blogType.js";

export default {
  data() {
    return {
      form: {
        title: "", //文章标题
        editorText: "", //文章编辑内容
        description: "", //文章描述
        thumb: "", //文章图片地址
        select: "",  //文章分类
      },
      editorOptions: {
        language: "zh-CN",
      },
      blogType: [],  //博客分类
      btnContent: "发布文章",
    };
  },
  components: {
    editor: Editor,
    Upload,
  },
  created(){
    // 获取文章分类
    getBlogType().then(({ data })=>{
      this.blogType = data
    })
  },
  methods: {
    addBlogHandle(){
      // markdown文档内容
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");

      let blogInfo = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      }
    
      if(blogInfo.title && blogInfo.description && blogInfo.categoryId && blogInfo.htmlContent){
        // 满足新增条件
        postBlog(blogInfo).then(({data})=>{

          this.$alert(`文章 ${data.title} 新增成功`, '提示', {
            confirmButtonText: '确定',
            callback: () => {
              this.$router.push("/blogList");
            },
          });

        })
      }else{
        this.$message.error("请填写所有信息");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.add-blog-container {
  padding: 20px;
}
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>