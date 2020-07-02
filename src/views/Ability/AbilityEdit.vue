<template>
  <div class="page-main-container">
    <div class="page-main-content" v-loading="loading">
      <el-row :gutter="20" class="edit-form-container">
        <el-col :span="12">
          <div class="edit-header-container">
            <span class="edit-header-title">| 基本信息</span>
          </div>
          <el-form class="edit-form" :model="form" label-position="top" size="medium" v-loading="loading">
            <el-row justify="center" :gutter="20">
              <el-col :span="12">
                <el-form-item label="技能全称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="技能标示">
                  <el-input v-model="form.tag_line"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="技能介绍">
                  <el-input v-model="form.description"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="技能封面" class="edit-form-cover">
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
                  <el-button @click="goBackAbility">取消</el-button>
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
import abilityService from "@/global/service/ability";
import qiniuService from "@/global/service/qiniu";

export default {
  name: "AbilityEdit",

  data() {
    return {
      form: {
        name: "",
        slug: "",
        tag_line: "",
        description: "",
        cover_url: ""
      },
      loading: true
    };
  },

  created() {
    let id = this.$route.params.id;
    console.log("created -> id", id);

    this.handleGetData(id);
  },

  methods: {
    handleGetData(id) {
      abilityService
        .show(id)
        .then(res => {
          this.form = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleOnSubmit() {
      let form = this.form;
      let id = this.$route.params.id;

      this.loading = true;
      abilityService
        .update(id, form)
        .then(() => {
          this.$message({
            message: "编辑成功",
            type: "success"
          });

          this.$router.push({ path: "/ability" });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    goBackAbility() {
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

