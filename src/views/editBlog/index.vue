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

    <!-- 修改按钮 -->
    <div class="block">
      <el-button
        type="primary"
        @click.prevent="editBlogHandle"
      >{{btnContent}}</el-button>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import { getOneBlog, editBlog } from "@/api/blog.js";
import { getBlogType } from "@/api/blogType.js";

export default {
  data() {
    return {
      id: null,  // 单篇文章id
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
      btnContent: "确认修改",
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
    });
    this.id = this.$route.params.id; //得到当前编辑文章id
    // 获取单篇文章
    getOneBlog(this.id).then(({ data })=>{
        // 数据回填
        // this.form.title = data.title;
        // this.form.description = data.description;
        // this.form.thumb = data.thumb;
        this.form = data;
        this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
        this.form.select = data.category === null ? "" : data.category.name;
    })
  },
  methods: {
    editBlogHandle(){
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
      console.log(this.form.id)
      if(blogInfo.title && blogInfo.description && blogInfo.categoryId && blogInfo.htmlContent){
        // 满足新增条件
        editBlog({
            id: this.form.id, 
            data: blogInfo,
        }).then((res)=>{
            console.log("then>>", res)
            this.$router.push("/blogList");
            // this.$message.success('文章修改成功');
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