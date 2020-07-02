<template>
  <div class="page-main-container">
    <div class="page-main-content">
      <div class="content-header">
        <router-link to="/advertise/create">
          <el-button type="primary">
            创建广告
          </el-button>
        </router-link>
      </div>
      <el-table class="content-table" :data="advertiseTable" style="width: 100%" size="medium" v-loading="loading">
        <el-table-column prop="id" label="id" width="80"> </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="slug" label="slug"></el-table-column>
        <el-table-column prop="widthSize" label="尺寸：宽"></el-table-column>
        <el-table-column prop="heightSize" label="尺寸：高"></el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button @click="editAdvertise(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="deleteAdvertise(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :page-size="pageSize" :current-page="currentPage" layout="total, prev, pager, next"
          :total="total" @current-change="pageChange" :hide-on-single-page="true">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import advertiseService from "@/global/service/advertise";

export default {
  name: "Advertise",

  data() {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: null,
      loading: true
    };
  },

  created() {
    this.handleGetData();
  },

  methods: {
    handleGetData() {
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };

      advertiseService
        .index(params)
        .then(res => {
          this.tableData = res.advertises;
          this.total = res.total.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    editAdvertise(row) {
      this.$router.push({ name: "AdvertiseEdit", params: { id: row.id } });
    },

    deleteAdvertise(row) {
      this.loading = true;

      let id = row.id;
      let params = { id };
      let options = {
        title: "删除广告",
        message: "确定删除广告吗？",
        showCancelButton: "取消",
        showConfirmButton: "确定"
      };

      this.$msgbox(options)
        .then(() => {
          advertiseService.delete(id, params).then(() => {
            this.handleGetData();

            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    pageChange(page) {
      this.currentPage = page;
      this.handleGetData();
    }
  },

  computed: {
    advertiseTable: function() {
      return this.tableData;
    }
  }
};
</script>