<template>
  <header class="page-header-container">
    <div class="page-header-content">
      <div class="header-logo">
        <a href="/">
          <img src="../../assets/logo.png" />
        </a>
      </div>
      <div class="header-title">
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="breadcrumbs && breadcrumbs.length === 1">
          <el-breadcrumb-item class="breadcrumb">{{ breadcrumbs[0].name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="breadcrumbs.length > 1">
          <el-breadcrumb-item class="breadcrumb" v-for="item in breadcrumbs" :key="item.name" :to="item.to">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="header-info">
        <el-dropdown class="user-operation" @command="handleCommand">
          <div class="user-avatar">
            <!-- <img class="avatar" src="" alt=""> -->
            <div class="avatar"></div>
            <i class="el-icon-arrow-down user-dropdown"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Logout">
              <i class="el-icon-error"></i>
              <span class="dropdown-item-text">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import DataStore from "@/global/storage/index";

export default {
  name: "BasicHeader",

  methods: {
    handleCommand(command) {
      if (command === "Logout") {
        DataStore.removeToken();
        window.location.reload();
      }
    }
  },

  computed: {
    breadcrumbs() {
      return this.$route.matched
        .filter(item => item.meta && item.meta.breadcrumb)
        .map(data => ({
          name: data.meta.breadcrumb.title,
          to: data.meta.breadcrumb.replace ? { path: data.path } : undefined
        }));
    }
  }
};
</script>

<style lang="less" scoped>
.page-header-container {
  height: 60px;
  box-shadow: 0 2px 20px 0 rgba(56, 35, 219, 0.09);

  .page-header-content {
    display: flex;
    position: relative;
    height: 100%;
    margin: 0 auto;
    padding: 10px 100px 10px 300px;
    justify-content: space-between;

    .header-logo {
      display: flex;
      position: absolute;
      top: 0;
      left: 100px;
      width: 110px;
      height: 100%;
      align-items: center;

      img {
        width: 110px;
        height: 20px;
      }
    }

    .header-title {
      margin-left: 30px;

      .breadcrumb {
        line-height: 40px;
        font-size: 20px;
        font-weight: 500;
        color: #333;
      }
    }

    .header-info {
      display: inline-block;
      line-height: 60px;

      .user-operation {
        width: 60px;
        height: 100%;
        cursor: pointer;

        .user-avatar {
          display: flex;
          justify-content: space-around;
          width: 100%;
          height: 100%;

          .avatar {
            width: 40px;
            height: 40px;
            background: #999;
          }

          .user-dropdown {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            width: 14px;
            height: 14px;
          }
        }
      }
    }
  }
}
</style>
