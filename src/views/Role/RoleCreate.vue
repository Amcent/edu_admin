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
                <el-form-item label="名称:">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="描述:">
                  <el-input v-model="form.description"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="权限:">
                  <el-row v-for="item in permissions" :key="item.id">
                    <span class="permission-group">{{ item.name }}</span>
                    <el-checkbox-group v-model="form.permissions">
                      <el-checkbox :label="data.slug" v-for="data in item.children" :key="data.id">{{ data.name }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item class="create-form-btn">
                  <el-button type="primary" @click="handleOnSubmit">立即创建</el-button>
                  <el-button @click="goBackRole">取消</el-button>
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
import roleService from "@/global/service/role";
import permissionGroupService from "@/global/service/permission_group";
import rolePermissionService from "@/global/service/role_permission";

export default {
  name: "RoleCreate",

  data() {
    return {
      form: {
        name: "",
        description: "",
        permissions: []
      },
      loading: true,
      permissions: []
    };
  },

  created() {
    this.handleGetPermission();
  },

  methods: {
    handleGetPermission() {
      permissionGroupService
        .index()
        .then(res => {
          this.permissions = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleOnSubmit() {
      this.loading = true;

      let form = { ...this.form };
      let role = {
        name: form.name,
        description: form.description
      };

      roleService
        .create(role)
        .then(res => {
          let id = res.id;
          let permission = {
            role_id: id,
            permission_slug: JSON.stringify(form.permissions)
          };

          rolePermissionService.create(permission).then(() => {
            this.$message({
              message: "创建成功",
              type: "success"
            });

            this.$router.push({ path: "/role" });
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    goBackRole() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.permission-group {
  margin-right: 20px;
}

.el-checkbox-group {
  display: inline-block;
}
</style>
