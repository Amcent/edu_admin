<template>
  <div class="page-main-container">
    <div class="page-main-content" v-loading="loading">
      <el-row :gutter="20" class="edit-form-container">
        <el-col :span="12">
          <div class="edit-header-container">
            <span class="edit-header-title">| 基本信息</span>
            <el-button :type="editting ? 'success' : 'primary'" class="edit-form-btn" @click="editStatusChange">
              {{ editBtnText }}</el-button>
          </div>
          <el-form class="edit-form" :model="form" label-position="top" size="medium" :disabled="!editting">
            <el-row :gutter="20">
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
                <el-form-item label="物料图片" class="edit-form-cover">
                  <el-upload class="cover-uploader" action="" :show-file-list="false" :limit="1"
                    :before-upload="handleBeforeUpload" accept="image/jpg, image/jpeg, image/png">
                    <img v-if="this.form.cover_url" :src="this.form.cover_url" class="cover-image" />
                    <i v-else class="el-icon-plus uploader-icon"></i>
                  </el-upload>
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
  name: "MaterialEdit",

  data() {
    return {
      form: {
        name: "",
        content: "",
        jump_url: "",
        new_tab: null
      },
      editBtnText: "修改",
      editting: false,
      treeData: [],
      loading: true,
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

  created() {
    this.handleGetMaterial();
  },

  methods: {
    handleGetMaterial() {
      let id = this.$route.params.id;

      materialService
        .show(id)
        .then(res => {
          this.form = res;
          this.treeData = res.children;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    editStatusChange() {
      if (!this.editting) {
        this.editting = true;
        this.editBtnText = "保存";
      } else {
        let form = { ...this.form };

        this.handleEditMaterial(form);
      }
    },

    handleEditMaterial(form) {
      this.loading = true;

      let id = form.id;
      let material = {
        name: form.name,
        content: form.content,
        jump_url: form.jump_url,
        new_tab: form.new_tab
      };

      materialService
        .update(id, material)
        .then(() => {
          this.$message({
            message: "保存成功",
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

    beforeClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  }
};
</script>
