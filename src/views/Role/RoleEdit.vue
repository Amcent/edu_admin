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
                <el-form-item class="edit-form-btn">
                  <el-button type="primary" @click="onSubmit">保存</el-button>
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
  name: "RoleEdit",

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
    this.handleGetRole();
  },

  methods: {
    handleGetRole() {
      let id = this.$route.params.id;

      roleService
        .show(id)
        .then(res => {
          let form = res;
          form.permissions = JSON.parse(form.permissions);
          this.form = form;
        })
        .finally(() => {
          this.loading = false;
        });
    },

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

    onSubmit() {
      this.loading = true;

      let form = { ...this.form };
      let roleId = form.id;
      let permissionId = form.permission_id;
      let role = {
        name: form.name,
        description: form.description
      };

      Promise.all([
        roleService.update(roleId, role),
        rolePermissionService.update(permissionId, {
          permission_slug: JSON.stringify(form.permissions)
        })
      ])
        .then(() => {
          this.$message({
            message: "保存成功",
            type: "success"
          });

          this.$router.push({ path: "/role" });
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
