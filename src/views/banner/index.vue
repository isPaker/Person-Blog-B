<template>
  <div class="banner-container">
    <!-- 首页表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="150">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="description" label="描述">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="中图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.midImg"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.bigImg"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
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
              @click="editBannerInfo(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑表单 -->
    <el-dialog title="编辑表单" :visible.sync="dialogFormVisible" top="10vh">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <!-- <Upload title="中图预览" :value="form.midImg" @input="handleMidImg" /> -->
            <Upload title="中图预览" v-model="form.midImg" />
          </el-col>
          <el-col :span="12">
            <!-- <Upload title="大图预览" :value="form.bigImg" @input="handleBigImg" /> -->
            <Upload title="大图预览" v-model="form.bigImg" />
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleFormCancel">取 消</el-button>
        <el-button type="primary" @click="editFormConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, postBanner } from "@/api/banner.js";
import Upload from "@/components/Upload";

export default {
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      form: {
        title: "",
        description: "",
        midImg: "",
        bigImg: "",
      },
    };
  },
  components: {
    Upload,
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getBanner().then((res) => {
        this.data = res.data;
        // const server_URL = "http://localhost:7001";
        // for (var item of this.data) {
        //   item.midImg2 = server_URL + item.midImg;
        //   item.bigImg2 = server_URL + item.bigImg;
        // }
      });
    },
    handleFormCancel() {
      this.dialogFormVisible = false;
    },
    editFormConfirm() {
      let arr = [...this.data];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == this.form.id) {
          arr[i] = this.form;
        }
      }
      postBanner(arr).then((res) => {
        // 编辑完成
        this.dialogFormVisible = false;
        // console.log("editFormConfirm>>>", res);
         this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.fetchData();
      });
    },
    editBannerInfo(bannerInfo) {
      this.form = { ...bannerInfo };
      this.dialogFormVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.banner-container {
  padding: 20px;
}
</style>