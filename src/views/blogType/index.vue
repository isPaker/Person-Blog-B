<template>
  <div class="blog-type-container">
    <!-- 搜索框 -->
    <div class="block">
      <el-input
        v-model="input"
        placeholder="请输入要添加的文章类别"
        class="blog-type-input"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择等级" style="width: 120px; text-align: center;">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" @click="addBlogType">添加</el-button>
    </div>

    <!-- 文章分类表格 -->
    <el-table :data="data" style="width: 100%" border v-loading="listLoading">
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="博客类别" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="文章数量" align="center">
        <template slot-scope="scope">{{ scope.row.articleCount }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBlogType(scope.row)"
            ></el-button>
          </el-tooltip>

          <!-- 删除按钮 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteBlogType(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑文章分类 -->
    <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditBlogType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogType,
  postBlogType,
  getOneBlogType,
  putBlogType,
  deleteBlogType,
} from "@/api/blogType.js";
export default {
  data() {
    return {
      data: [],
      input: "",
      select: "",
      dialogFormVisible: false,
      form: {
        name: "",
        order: "",
      },
      listLoading: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取文章分类
    fetchData() {
      this.listLoading = true;
      getBlogType().then((res) => {
        this.listLoading = false;
        this.data = res.data;
        // console.log(this.data)
      });
    },
    // 添加文章分类
    addBlogType() {
      if(this.input){
        postBlogType({ name: this.input, order: this.select }).then(() => {
          this.fetchData();
          this.$message.success("添加分类成功")
        });
      }else{
        this.$message.error("分类名称不能为空");
      }
    },
    // 编辑某一个文章分类
    editBlogType({ id }) {
      getOneBlogType(id).then((res) => {
        this.form = res.data;
        this.dialogFormVisible = true;
      });
    },
    // 删除文章分类
    deleteBlogType({ id }) {
        this.$confirm("删除该分类后，该分类下的所有文章将变为未分类状态, 是否继续?", "是否删除此文章分类", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteBlogType(id).then(() => {
              this.fetchData();
              this.$message({
                message: "修改成功",
                type: "success",
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
    },
    // 修改文章分类
    confirmEditBlogType() {
      putBlogType({
        id: this.form.id,
        data: this.form,
      }).then((res) => {
        this.fetchData();
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.dialogFormVisible = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-type-container {
  padding: 20px;
}
.blog-type-input {
  width: 500px;
  margin-right: 20px;
}
.block {
  margin: 20px 0;
}
</style>

