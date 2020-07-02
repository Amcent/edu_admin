<template>
  <div class="page-aside-container">
    <div class="page-aside-content">
      <el-menu class="aside-nav-list" :default-active="$route.name" :router="true">
        <el-menu-item class="aside-nav-item" index="/">
          <span class="nav-item-title">概况</span>
        </el-menu-item>
        <el-menu-item class="aside-nav-item" v-for="item in filteredPermission" :key="item.permission"
          :index="item.path">
          <span class="nav-item-title">{{ item.meta.title }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import routes from "@/router/routes.js";
import authService from "@/global/service/auth";

export default {
  name: "BasicAside",

  data() {
    return {
      filteredPermission: []
    };
  },

  created() {
    this.handleGetPermissions();
  },

  methods: {
    handleGetPermissions() {
      authService.getPermission().then(res => {
        const permissions = JSON.parse(res);
        const adminRoutes = routes[1].children;
        const filteredPermission = [];

        this.$store.commit("setPermissions", permissions);
        adminRoutes.forEach(item => {
          if (item.permission) {
            permissions.forEach(data => {
              if (item.permission === data) {
                filteredPermission.push(item);
              }
            });
          }
        });
        this.filteredPermission = filteredPermission;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page-aside-container {
  min-width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 20px 0 rgba(56, 35, 219, 0.09);

  .page-aside-content {
    width: 100%;
    height: 100%;

    .aside-nav-list {
      height: 100%;

      .aside-nav-item {
        font-size: 16px;
      }
    }
  }
}
</style>
