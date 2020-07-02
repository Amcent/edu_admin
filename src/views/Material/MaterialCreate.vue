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
                <el-form-item label="内容">
                  <el-input v-model="form.content"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="跳转链接">
                  <el-input v-model="form.jump_url"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="打开窗口">
                  <el-select v-model="form.new_tab" placeholder="请选择">
                    <el-option v-for="item in newTabOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="物料图片" class="create-form-cover">
                  <el-upload class="cover-uploader" action="" :show-file-list="false" :limit="1"
                    :before-upload="handleBeforeUpload" accept="image/jpg, image/jpeg, image/png">
                    <img v-if="this.form.cover_url" :src="this.form.cover_url" class="cover-image" />
                    <i v-else class="el-icon-plus uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item class="create-form-btn">
                  <el-button type="primary" @click="handleOnSubmit">立即创建</el-button>
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
import materialService from "@/global/service/material";
import qiniuService from "@/global/service/qiniu";

export default {
  name: "MaterialCreate",

  data() {
    return {
      form: {
        name: "",
        content: "",
        jump_url: "",
        new_tab: null
      },
      loading: false,
      newTabOptions: [
        {
          label: "原窗口",
          value: 0
        },
        {
          label: "新窗口",
          value: 1
        }
      ]
    };
  },

  methods: {
    handleOnSubmit() {
      let form = { ...this.form };

      this.loading = true;
      materialService
        .create(form)
        .then(() => {
          this.$message({
            message: "创建成功",
            type: "success"
          });

          this.$router.push({ path: "/material" });
        })
        .finally(() => {
          this.loading = false;
        });
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
    },

    goBackCourse() {
      this.$router.go(-1);
    }
  }
};
</script>
