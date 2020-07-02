<template>
  <div class="page-main-container">
    <div class="page-main-content">
      <div class="content-header">
        <router-link to="/manager/create">
          <el-button type="primary">
            创建
          </el-button>
        </router-link>
      </div>
      <el-table class="content-table" :data="managerTable" style="width: 100%" size="medium" v-loading="loading">
        <el-table-column prop="id" label="id" width="80"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="phone" label="手机号码">
        </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button @click="editdManager(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="deletedManager(scope.row)">删除</el-button>
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
import managerService from "@/global/service/manager";

export default {
  name: "Manager",

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

      managerService
        .index(params)
        .then(res => {
          this.tableData = res.managers;
          this.total = res.total.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    editdManager(row) {
      this.$router.push({ name: "ManagerEdit", params: { id: row.id } });
    },

    deletedManager(row) {
      this.loading = true;

      let id = row.id;
      let options = {
        title: "删除管理员",
        message: "确定删除管理员吗？",
        showCancelButton: "取消",
        showConfirmButton: "确定"
      };

      this.$msgbox(options)
        .then(() => {
          managerService.delete(id).then(() => {
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
    managerTable: function() {
      return this.tableData;
    }
  }
};
</script>
