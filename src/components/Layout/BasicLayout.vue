<template>
  <div class="page-container">
    <the-header></the-header>
    <div class="page-main">
      <the-aside></the-aside>
      <router-view></router-view>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import BasicHeader from "./BasicLayoutHeader";
import BasicAside from "./BasicLayoutAside";
import BasicFooter from "./BasicLayoutFooter";

export default {
  name: "BasicLayout",

  components: {
    "the-header": BasicHeader,
    "the-aside": BasicAside,
    "the-footer": BasicFooter
  }
};
</script>

<style lang="less" scoped>
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-main {
    display: flex;
    flex: 1;

    .page-main-container {
      position: relative;
      flex: 1;
      height: 100%;
      padding: 30px;
      background-color: #f8fafc;

      .page-main-content {
        height: 100%;
        padding: 30px;
        background-color: #fff;

        .content-header {
          text-align-last: left;
        }
      }
    }
  }
}
</style>
