<template>
  <div class="project-list-container">
    <!-- 数据表格 -->
    <el-table
      :data="data"
      v-loading="listLoading"
      border
      element-loading-text="加载数据中"
      fit
      hightlight-current-row
    >
      <!-- 序号 -->
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <!-- 项目名称 -->
      <el-table-column label="项目名称" align="center" width="250">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="projectName">{{
            scope.row.name
          }}</a>
        </template>
      </el-table-column>

      <!-- 项目描述 -->
      <el-table-column label="项目描述" align="center">
        <template slot-scope="scope">{{
          scope.row.description.toString()
        }}</template>
      </el-table-column>

      <!-- 预览图 -->
      <el-table-column label="预览图" width="200" align="center">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.thumb2"
            :preview-src-list="srcList"
            style="width: 150px"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <!-- github -->
          <el-tooltip
            class="item"
            effect="dark"
            content="github"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              class="github"
              icon="iconfont icon-github"
              circle
              size="mini"
              @click="openGithubAdress(scope.row)"
            ></el-button>
          </el-tooltip>

          <!-- 编辑 -->
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
              @click="editProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <!-- 删除按钮 -->
          <el-tooltip
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog
      title="请编辑该项目信息"
      :visible.sync="dialogFormVisible"
      fullscreen
    >
      <el-form :model="form">
        <!-- 项目名称 -->
        <el-form-item label="项目名称">
          <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>

        <el-form-item label="项目描述(每一项描述以英文逗号(,)分割)">
          <el-input
            v-model="form.description"
            placeholder="请输入项目秒速，每一项描述以英文逗号分割"
          ></el-input>
        </el-form-item>

        <el-form-item label="项目链接">
          <el-input v-model="form.url" placeholder="请输入项目链接"></el-input>
        </el-form-item>

        <el-form-item label="github 地址">
          <el-input
            v-model="form.github"
            placeholder="请输入项目github地址"
          ></el-input>
        </el-form-item>

        <el-form-item label="项目预览图">
          <Upload title="" v-model="form.thumb" />
        </el-form-item>

        <el-form-item label="项目等级">
          <el-select placeholder="分类等级" v-model="form.order">
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
        <el-button type="primary" @click="confirmeditProject"
          >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllProject, deleteProject, editProject } from "@/api/project.js";
import Upload from "@/components/Upload";

const server_URL = "http://127.01:7001";
export default {
  data() {
    return {
      data: [],
      listLoading: true,
      srcList: [], //预览图数组
      dialogFormVisible: false,
      form: {
        name: "",  //项目名称
        description: "", //项目描述
        url: "",  //项目链接
        github: "", //项目github地址
        thumb: "", //项目预览图地址
        order: "", //项目分类等级
      },
    };
  },
  created() {
    this.fetchData();
  },
  components: {
    Upload,
  },
  methods: {
    fetchData() {
      getAllProject().then((res) => {
        this.listLoading = false;
        this.data = res.data;
        for (var item of this.data) {
          item.thumb2 = server_URL + item.thumb;
          this.srcList.push(item.thumb2);
        }
      });
    },
    openGithubAdress(projectInfo) {
      window.open(projectInfo.github);
    },
    // 编辑项目
    editProjectHandle(projectInfo) {
      this.dialogFormVisible = true;
      this.form = {...projectInfo}
      this.form.description = this.form.description.toString();
    },
    // 删除项目
    deleteProjectHandle({id}) {
      this.$confirm(
        "删除该项目后将无法恢复, 是否继续?",
        "是否删除此项目",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "wraning",
        }
      ).then(()=>{
        deleteProject(id).then(()=>{
          this.fetchData();
          this.$message.success("删除成功")
        })
      }).catch(()=>{
        this.$message({
          type: "info",
          message: "已取消删除",
        })
      })
    },
    // 确认修改项目内容
    confirmeditProject(){
      const proInfo = {...this.form};
      proInfo.description = proInfo.description.split(",");
      proInfo.order = parseInt(proInfo.order);
      editProject(this.form.id, proInfo).then((res)=>{
        this.dialogFormVisible = false;
        this.fetchData();
        this.$message.success("修改成功");
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.project-list-container {
  padding: 20px;
  .projectName:hover {
    color: rgb(168, 168, 168);
  }
}
</style>
