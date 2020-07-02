<template>
  <div class="page-main-container">
    <div class="page-main-content">
      <div class="content-header">
        <router-link to="/question/create">
          <el-button type="primary">
            创建
          </el-button>
        </router-link>
      </div>
      <el-table class="content-table" :data="questionTable" style="width: 100%" size="medium" v-loading="loading">
        <el-table-column prop="id" label="id" width="80"> </el-table-column>
        <el-table-column prop="stem" label="名称" width="300"> </el-table-column>
        <el-table-column prop="name" label="技能" width="300"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button @click="editdQuestion(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="handleDeletedQuestion(scope.row)">删除</el-button>
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
import questionService from "@/global/service/question";

export default {
  name: "Question",

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

      questionService
        .index(params)
        .then(res => {
          this.tableData = res.questions;
          this.total = res.total.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    editdQuestion(row) {
      this.$router.push({ name: "QuestionEdit", params: { id: row.id } });
    },

    handleDeletedQuestion(row) {
      this.loading = true;

      let id = row.id;
      let options = {
        title: "删除问题",
        message: "确定删除问题吗？",
        showCancelButton: "取消",
        showConfirmButton: "确定"
      };

      this.$msgbox(options)
        .then(() => {
          questionService.delete(id, { id }).then(() => {
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
    questionTable: function() {
      return this.tableData;
    }
  }
};
</script>
