<template>
  <footer class="page-footer-container">
    <div class="footer-content">
      Copyright © 2013-2018 jiker.com All Rights Reserved. 京ICP备17070664号-5 京公网安备11010802013056
    </div>
  </footer>
</template>

<script>
export default {
  name: "BasicFooter"
};
</script>

<style lang="less" scoped>
.page-footer-container {
  height: 40px;
  background: #000;

  .footer-content {
    width: 1080px;
    height: 100%;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
}
</style>
