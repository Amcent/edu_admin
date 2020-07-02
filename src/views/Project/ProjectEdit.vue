<template>
  <div class="page-main-container">
    <div class="page-main-content">
      <el-row :gutter="20" class="edit-form-container">
        <el-col :span="12">
          <div class="edit-header-container">
            <span class="edit-header">| 基本信息</span>
          </div>
          <el-form class="edit-form" :model="form" label-position="top" size="medium" v-loading="loading">
            <el-row justify="center" :gutter="20">
              <el-col :span="19">
                <el-form-item label="项目名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="19">
                <el-form-item label="项目介绍">
                  <el-input v-model="form.description"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="项目封面" class="edit-form-cover">
                  <el-upload class="cover-uploader" action="" :show-file-list="false" :limit="1"
                    :before-upload="handleBeforeUpload" accept="image/jpg, image/jpeg, image/png">
                    <img v-if="this.form.cover_url" :src="this.form.cover_url" class="cover-image" />
                    <i v-else class="el-icon-plus uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item class="edit-form-btn">
                  <el-button type="primary" @click="handleOnSubmit">保存</el-button>
                  <el-button @click="goBackProject">取消</el-button>
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
import projectService from "@/global/service/project";
import qiniuService from "@/global/service/qiniu";

export default {
  name: "ProjectEdit",

  data() {
    return {
      form: {
        name: "",
        description: "",
        cover_url: ""
      },
      loading: true
    };
  },

  created() {
    let id = this.$route.params.id;

    this.handleGetProject(id);
  },

  methods: {
    handleGetProject(id) {
      this.loading = false;

      projectService
        .show(id)
        .then(res => {
          this.form = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleOnSubmit() {
      let form = {
        name: this.form.name,
        description: this.form.description,
        cover_url: this.form.cover_url
      };
      let id = this.$route.params.id;

      this.loading = true;
      projectService
        .update(id, form)
        .then(() => {
          this.$message({
            message: "修改成功",
            type: "success"
          });

          this.$router.push({ path: "/project" });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    goBackProject() {
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
