<template>
  <div class="message-container">
    <!-- 留言板表格 -->
    <el-table v-loading="listLoading" :data="data" border>
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
      <el-table-column label="内容" align="center">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column label="创建日期" align="center" width="230">
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
              @click="hanedleDeleteMessage(scope.row)"
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
import { getMessage, deleteMessage } from "@/api/message.js";
export default {
  data() {
    return {
      data: [],
      listLoading: false,
      currentPage: 1, //当前页, 为什么当前页变化分页组件能监听到?
      limit: 10,  // 每页显示条目数
      totalPage: 0, //总页数
      count: 0,  // 留言总条数
      paginationCurPage: 1,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getMessage(this.currentPage, this.limit).then(({data}) => {
        // console.log("message", data);
        this.listLoading = false;
        this.data = data.rows;
        this.count = data.total;
        this.totalPage = Math.ceil( this.count / this.limit );
      });
    },
    handleSizeChange(limitNum){
      this.limit = parseInt(limitNum);
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
    hanedleDeleteMessage({id}){
      // console.log("deletemessage", id)
      this.$confirm(
        "是否确认删除此留言?",
        "是否删除此留言",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(()=>{
        deleteMessage(id).then(()=>{
          this.fitchData();
          this.$message.success("删除成功")
        })
      }).catch(()=>{
        this.$message({
          type: "info",
          message: "已取消删除",
        })
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.message-container {
  padding: 20px;
  .block {
    margin: 20px 0;
  }
}
</style>