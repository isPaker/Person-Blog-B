<template>
  <div class="comment-container">
    <!-- 评论表格 -->
    <el-table
      v-loading="listLoading"
      :data="data"
      element-loading-text="加载数据中"
      border
      fit
      hightlight-current-row
    >
      <el-table-column label="序号" align="center" width="60">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="头像" align="center" width="80">
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            size="small"
            :src="scope.row.avatar"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" width="150">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column label="评论文章" align="center" width="150">
        <template slot-scope="scope">{{ scope.row.blog.title }}</template>
      </el-table-column>
      <el-table-column label="评论内容" align="center">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column label="评论日期" align="center" width="230">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-tooltip
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="handleDeleteComment(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next, total, ->, sizes, jumper"
        :current-page.sync="paginationCurPage"
        :page-size="limit"
        :page-sizes="[5, 10, 20, 30]"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        >
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { getComment, deleteComment } from "@/api/comment.js";

export default {
  data() {
    return {
      listLoading: false,
      data: [],
      currentPage: 1, // 列表当前页
      limit: 10,  //每页条数
      totalPage: 0, //总页数
      count: 0,  //评论总条数
      paginationCurPage: 1, //分页组件当前页数
    };
  },
  created(){
    this.fetchData();
  },
  methods: {
    fetchData(){
      this.listLoading = true;
      getComment(this.currentPage, this.limit).then((res)=>{
        // console.log("comment>>>", res)
        this.listLoading = false;
        this.data = res.data.rows;
        this.count = res.data.total;
        this.totalPage = Math.ceil( this.count / this.limit );
      })
    },
    // 删除评论
    handleDeleteComment({id}){
      this.$confirm(
        "点击确定删除该评论，是否删除?",
        "是否删除该评论",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(()=>{
        deleteComment(id).then(()=>{
          this.fetchData();
          this.$message.success("删除成功")
        })
      }).catch(()=>{
        this.$message.info("取消删除")
      })
    },
    handleSizeChange(limitNum){
      this.limit = limitNum;
      this.currentPage = 1;
      this.paginationCurPage = 1;
      this.fetchData();
    },
    handleCurrentChange(pageNum){
      this.currentPage = pageNum;
      this.fetchData();
    },
    handlePrevClick(){
      this.currentPage -= 1;
    },
    handleNextClick(){
      this.currentPage += 1;
    },
  },
};
</script>

<style scoped>
.comment-container {
  padding: 20px;
}
</style>

