<template>
  <div class="page-main-container">
    <div class="page-main-content">
      <el-row :gutter="20" class="create-form-container">
        <el-col :span="12">
          <div class="create-header-container">
            <span class="create-header">| 基本信息</span>
          </div>
          <el-form class="create-form" ref="form" :model="form" label-position="top" size="medium" v-loading="loading">
            <el-row justify="center" :gutter="20">
              <el-col :span="12">
                <el-form-item label="企业名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业短称">
                  <el-input v-model="form.short_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业口号">
                  <el-input v-model="form.slogan"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="社会编号">
                  <el-input v-model="form.code"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人名称">
                  <el-input v-model="form.contact_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人电话">
                  <el-input v-model="form.contact_phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="企业介绍">
                  <el-input v-model="form.introduction"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="企业封面" class="create-form-cover">
                  <el-upload class="cover-uploader" action="" :show-file-list="false" :limit="1"
                    :before-upload="handleBeforeUpload" accept="image/jpg, image/jpeg, image/png">
                    <img v-if="this.form.cover_url" :src="this.form.cover_url" class="cover-image" />
                    <i v-else class="el-icon-plus uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item class="create-form-btn">
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button @click="goBackCompany">取消</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import companyService from "@/global/service/company";
import qiniuService from "@/global/service/qiniu";

export default {
  name: "CompanyCreate",

  data() {
    return {
      form: {
        name: "",
        short_name: "",
        slogan: "",
        code: "",
        introduction: "",
        contact_name: "",
        contact_phone: "",
        cover_url: ""
      },
      loading: false
    };
  },

  methods: {
    onSubmit() {
      let form = this.form;

      this.loading = true;
      companyService
        .create(form)
        .then(() => {
          this.$message({
            message: "创建成功",
            type: "success"
          });

          this.$router.push({ path: "/company" });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    goBackCompany() {
      this.$router.go(-1);
    },

    handleBeforeUpload(file) {
      this.loading = true;

      qiniuService
        .start(file)
        .then(res => {
          this.form.cover_url = res;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
