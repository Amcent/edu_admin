<template>
  <div class="page-main-container">
    <div class="page-main-content">
      <div class="content-header">
        <router-link to="/career/create">
          <el-button type="primary">
            创建职业
          </el-button>
        </router-link>
      </div>
      <el-table class="content-table" :data="careerTable" style="width: 100%" size="medium" v-loading="loading">
        <el-table-column prop="id" label="id" width="80"> </el-table-column>
        <el-table-column prop="name" label="名称" width="300"> </el-table-column>
        <el-table-column prop="status" width="80" label="状态">
          <template slot-scope="scope">
            <span class="status status-completed" v-if="scope.row.status === 1">
              已完成
            </span>
            <span class="status status-not_completed" v-if="scope.row.status === 0">
              未完成
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button @click="editCareer(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="handleDeleteCareer(scope.row)">删除</el-button>
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
import careerService from "@/global/service/career";

export default {
  name: "Career",

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

      careerService
        .index(params)
        .then(res => {
          this.tableData = res.careers;
          this.total = res.total.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    editCareer(row) {
      this.$router.push({ name: "CareerEdit", params: { id: row.id } });
    },

    handleDeleteCareer(row) {
      this.loading = true;

      let id = row.id;
      let params = { id };
      let options = {
        title: "删除职业",
        message: "确定删除职业吗？",
        showCancelButton: "取消",
        showConfirmButton: "确定"
      };

      this.$msgbox(options)
        .then(() => {
          careerService.delete(id, params).then(() => {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.handleGetData();
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
    careerTable: function() {
      return this.tableData;
    }
  }
};
</script>