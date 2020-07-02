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
              <el-col>
                <el-form-item label="姓名:">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="手机号码:">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="角色:">
                  <el-select v-model="form.role_id" placeholder="请选择">
                    <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item class="edit-form-btn">
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                  <el-button @click="goBackManager">取消</el-button>
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
import managerService from "@/global/service/manager";
import roleService from "@/global/service/role";

export default {
  name: "ManagerCreate",

  data() {
    return {
      form: {
        name: "",
        phone: "",
        role_id: null
      },
      loading: true,
      roles: []
    };
  },

  created() {
    this.handleGetManager();
    this.handleGetRoles();
  },

  methods: {
    handleGetManager() {
      let id = this.$route.params.id;

      managerService
        .show(id)
        .then(res => {
          let form = res;
          this.form = form;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleGetRoles() {
      roleService
        .index()
        .then(res => {
          this.roles = res.roles;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    onSubmit() {
      let id = this.$route.params.id;
      let form = { ...this.form };

      this.loading = true;

      managerService
        .update(id, form)
        .then(() => {
          this.$message({
            message: "编辑成功",
            type: "success"
          });

          this.$router.push({ path: "/manager" });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    goBackManager() {
      this.$router.go(-1);
    }
  }
};
</script>
