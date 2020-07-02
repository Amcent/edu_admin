<template>
  <div class="page-main-container">
    <div class="page-main-content">
      <div class="content-header">
        <router-link to="/project/create">
          <el-button type="primary">
            创建项目
          </el-button>
        </router-link>
      </div>
      <el-table class="content-table" :data="projectTable" style="width: 100%" size="medium" v-loading="loading">
        <el-table-column prop="id" label="id" width="80"> </el-table-column>
        <el-table-column prop="name" label="名称" width="300"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <el-button @click="viewProject(scope.row)" type="text" size="small">内容</el-button>
            <el-button @click="editProject(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="handleDeleteProject(scope.row)">删除</el-button>
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
import projectService from "@/global/service/project";

export default {
  name: "Project",

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

      projectService
        .index(params)
        .then(res => {
          this.tableData = res.projects;
          this.total = res.total.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    editProject(row) {
      this.$router.push({ name: "ProjectEdit", params: { id: row.id } });
    },

    viewProject(row) {
      this.$router.push({ name: "ProjectContent", params: { id: row.id } });
    },

    handleDeleteProject(row) {
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
          projectService.delete(id, { id }).then(() => {
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
    projectTable: function() {
      return this.tableData;
    }
  }
};
</script>
