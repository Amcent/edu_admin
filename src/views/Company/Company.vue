<template>
  <div class="page-main-container">
    <div class="page-main-content">
      <div class="content-header">
        <router-link to="/company/create">
          <el-button type="primary">
            创建企业
          </el-button>
        </router-link>
      </div>
      <el-table class="content-table" :data="companyTable" style="width: 100%" size="medium" v-loading="loading">
        <el-table-column prop="id" label="id" width="80"> </el-table-column>
        <el-table-column prop="name" label="名称" width="300"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button @click="editCompany(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="handleDeleteCompany(scope.row)">删除</el-button>
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
import companyService from "@/global/service/company";

export default {
  name: "Company",

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
    this.getData();
  },

  methods: {
    getData() {
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };

      companyService
        .index(params)
        .then(res => {
          console.log("getData -> res", res);
          this.tableData = res.companies;
          this.total = res.total.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    editCompany(row) {
      this.$router.push({ name: "CompanyEdit", params: { id: row.id } });
    },

    handleDeleteCompany(row) {
      this.loading = true;

      let id = row.id;
      let options = {
        title: "删除企业",
        message: "确定删除企业吗？",
        showCancelButton: "取消",
        showConfirmButton: "确定"
      };

      this.$msgbox(options)
        .then(() => {
          companyService.delete(id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.getData();
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    pageChange(page) {
      this.currentPage = page;
      this.getData();
    }
  },

  computed: {
    companyTable: function() {
      return this.tableData;
    }
  }
};
</script>
