<template>
  <div class="blog-list-container">
    <!-- 文章列表 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + (currentPage - 1)*limit + 1 }}</template>
      </el-table-column>
      <el-table-column label="文章名称" width="230" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="文章预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="handleBlogTitle(scope.row)"
              slot="reference"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="文章描述" width="300" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>

      <el-table-column label="浏览数" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>

      <el-table-column label="评论量" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>

      <el-table-column label="所属分类" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.category === null ? "未分类" : scope.row.category.name }}
        </template>
      </el-table-column>

      <el-table-column label="创建日期" width="230" align="center">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-tooltip
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
              @click="editBlog(scope.row)"
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
              @click="deleteBlog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页按钮 -->
    <div class="block">
      <el-pagination
        background
        :page-size="limit"
        :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, total, ->, sizes, jumper"
        :total="count"
        @size-change="handleSizeChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getBlog, deleteBlog } from "@/api/blog.js";

const frontEnd_URL = "http://localhost:9528";
// const server_URL = "http://127.01:7001";
export default {
  data() {
    return {
      data: [],
      srcList: [],
      currentPage: 1, //当前页码
      limit: 5, //每一页显示条数
      totalPage: 0, //总页数
      count: 0, //数据总条数
      paginationCurPage: 1, //分页当前页码
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getBlog(this.currentPage, this.limit).then(({ data }) => {
        // console.log(data);
        this.data = data.rows;
        for (let item of this.data) {
          // item.thumb = server_URL + item.thumb;
          this.srcList.push(item.thumb);
        }
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.limit);

        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    // 跳转到点击的那片文章
    handleBlogTitle(blogInfo) {
      window.open(`${frontEnd_URL}/blog/${blogInfo.id}`);
    },
    //每页显示条目个数变化
    handleSizeChange(pageLimitNum) {
      this.limit = parseInt(pageLimitNum);
      this.currentPage = 1;
      this.paginationCurPage = 1;
      this.fetchData();
    },
    // 当前页面
    handleCurrentChange(currentPageNum) {
      this.currentPage = currentPageNum;
      this.fetchData();
    },
    // 上一页
    handlePrevClick() {
      this.currentPage -= 1;
    },
    // 下一页
    handleNextClick() {
      this.currentPage += 1;
    },
    // 编辑文章
    editBlog(blogInfo) {
      this.$router.push(`/editBlog/${blogInfo.id}`);
    },
    // 删除文章
    deleteBlog({id}) {
      this.$confirm(
        "删除文章后，该文章下的所有评论也会一同删除, 是否继续?",
        "是否删除此文章",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteBlog(id).then(() => {
            this.fetchData();
            this.$message({
              message: "删除成功",
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
  },
};
</script>

<style lang="scss" scoped>
.blog-list-container {
  padding: 20px;
}
.block {
  margin: 20px 0;
}
</style>
