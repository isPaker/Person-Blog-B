<template>
  <div class="setting-container">
    <div class="title">网站信息</div>

    <div class="block">网站标题</div>
    <div class="input-container">
      <el-input v-model="form.siteTitle" disabled></el-input>
    </div>

    <div class="block">邮箱</div>
    <div class="input-container">
      <el-input v-model="form.mail" disabled></el-input>
    </div>

    <div class="block">备案号</div>
    <div class="input-container">
      <el-input v-model="form.icp" disabled></el-input>
    </div>

    <div class="block">网站头像</div>
    <div>
      <el-image
        style="width: 100px; height: 100px;"
        :src="form.avatar"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <div class="subTitle">网址图标信息</div>
    <div class="block">网址图标地址</div>
    <div class="input-container">
      <el-input v-model="form.favicon" placeholder="请输入图片地址" disabled></el-input>
    </div>

    <div class="block">网址图标预览</div>
    <div class="input-container">
      <el-image
        style="width: 50px; height: 50px;"
        :src="form.favicon"
      ></el-image>
    </div>

    <el-divider></el-divider>
    <div class="subTitle">github 信息</div>
    <div class="block">github 名字</div>
    <div class="input-container">
      <el-input v-model="form.githubName" disabled></el-input>
    </div>
    <div class="block">github 地址</div>
    <div class="input-container">
      <el-input v-model="form.github" disabled></el-input>
    </div>
    <el-divider></el-divider>
    <div class="subTitle">QQ 信息</div>
    <div class="block">QQ 号码</div>
    <div class="input-container">
      <el-input v-model="form.qq" disabled></el-input>
    </div>
    <div class="block">QQ 二维码图片预览</div>
    <div class="input-container">
      <el-image
        style="width: 100px; height: 100px;"
        :src="form.qqQrCode"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <div class="subTitle">微信信息</div>
    <div class="block">微信号</div>
    <div class="input-container">
      <el-input v-model="form.weixin" disabled></el-input>
    </div>
    <div class="block">微信二维码图片预览</div>
    <div class="input-container">
      <el-image
        style="width: 100px; height: 100px;"
        :src="form.weixinQrCode"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <el-button type="primary" @click="openEditPanel">进入编辑模式</el-button>

    <!-- 弹出层 -->
    <el-dialog
      title="请编辑信息"
      :visible.sync="dialogFormVisible"
      width="50%"
      top="5vh"
      fullscreen
    >
      <el-form v-model="form">
        <el-form-item label="网站标题">
          <el-input v-model="form2.siteTitle"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form2.mail"></el-input>
        </el-form-item>
        <el-form-item label="备案号">
          <el-input v-model="form2.icp"></el-input>
        </el-form-item>
        <el-form-item label="网站头像地址">
          <!-- <el-input v-model="form2.avatar"></el-input> -->
          <div>
            <Upload title="" v-model="form2.avatar" />
          </div>
        </el-form-item>
        <el-form-item label="网站图标地址">
          <el-input v-model="form2.favicon"></el-input>
        </el-form-item>
        <el-form-item label="github 名字">
          <el-input v-model="form2.githubName"></el-input>
        </el-form-item>
        <el-form-item label="github 地址">
          <el-input v-model="form2.github"></el-input>
        </el-form-item>
        <el-form-item label="QQ 号码">
          <el-input v-model="form2.qq"></el-input>
        </el-form-item>
        <el-form-item label="QQ 二维码图片地址">
          <!-- <el-input v-model="form2.qqQrCode"></el-input> -->
          <div>
            <Upload title="" v-model="form2.qqQrCode" />
          </div>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="form2.weixin"></el-input>
        </el-form-item>
        <el-form-item label="微信二维码图片地址">
          <!-- <el-input v-model="form2.weixinQrCode"></el-input> -->
          <div>
            <Upload title="" v-model="form2.weixinQrCode" />
          </div>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEditSetting">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Upload from "@/components/Upload"
import { getSetting, putSetting } from "@/api/setting.js";
export default {
  data(){
    return {
      data: [],
      form: {
        siteTitle: "",
        mail: "",
        icp: "",
        avatar: "",
        favicon: "",
        githubName: "",
        github: "",
        qq: null,
        qqQrCode: "",
        weixin: null,
        weixinQrCode: "",
      },
      form2: {
        siteTitle: "",
        mail: "",
        icp: "",
        avatar: "",
        favicon: "",
        githubName: "",
        github: "",
        qq: null,
        qqQrCode: "",
        weixin: null,
        weixinQrCode: "",
      },
      dialogFormVisible: false,
    }
  },
  components: {
    Upload,
  },
  created(){
    this.fetchData();
  },
  methods: {
    fetchData(){
      getSetting().then(({data})=>{
        this.form = data;
        this.form2 = {...this.form};
      })
    },
    openEditPanel(){
      this.dialogFormVisible = true;
    },
    confirmEditSetting(){
      putSetting(this.form2).then(()=>{
        this.dialogFormVisible = false;
        this.fetchData();
        this.$message.success("修改成功")
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.setting-container {
  padding: 20px;
  .block{
    margin: 20px 0;
  }
  .title{
    font-weight: 700;
    font-size: 20px;
    margin-top: 20px;
  }
  .subTitle{
    font-weight: 700;
    margin-top: 20px;
  }
  .input-container{
    width: 500px;
  }
}
</style>