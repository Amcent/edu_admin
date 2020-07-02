<template>
  <div class="page-main-container">
    <div class="page-main-content">
      <el-row :gutter="20" class="create-form-container">
        <el-col :span="12">
          <div class="create-header-container">
            <span class="create-header">| 基本信息</span>
          </div>
          <el-form class="create-form" :model="form" label-position="top" size="medium" v-loading="loading">
            <el-row justify="center" :gutter="20">
              <el-col>
                <el-form-item label="广告名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="slug">
                  <el-input v-model="form.slug"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="尺寸：宽">
                  <el-input v-model="form.widthSize"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="尺寸：高">
                  <el-input v-model="form.heightSize"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item class="create-form-btn">
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button @click="goBackCourse">取消</el-button>
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
import advertiseService from "@/global/service/advertise";

export default {
  name: "AdvertiseCreate",

  data() {
    return {
      form: {
        name: "",
        slug: "",
        widthSize: "",
        heightSize: ""
      },
      loading: false
    };
  },

  methods: {
    onSubmit() {
      let form = { ...this.form };

      this.loading = true;
      advertiseService
        .create(form)
        .then(() => {
          this.$message({
            message: "创建成功",
            type: "success"
          });

          this.$router.push({ path: "/advertise" });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    goBackCourse() {
      this.$router.go(-1);
    }
  }
};
</script>
