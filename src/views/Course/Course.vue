<template>
  <div class="page-main-container">
    <div class="page-main-content">
      <div class="content-header">
        <router-link to="/course/create">
          <el-button type="primary">
            创建课程
          </el-button>
        </router-link>
      </div>
      <el-table class="content-table" :data="courseTable" style="width: 100%" size="medium" v-loading="loading">
        <el-table-column prop="id" label="id" width="80"> </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="title" label="副标题"> </el-table-column>
        <el-table-column prop="status" label="状态">
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
            <el-button @click="editCourse(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="deleteCourse(scope.row)">删除</el-button>
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
import courseService from "@/global/service/course";

export default {
  name: "Course",

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

      courseService
        .index(params)
        .then(res => {
          this.tableData = res.courses;
          this.total = res.total.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    editCourse(row) {
      this.$router.push({ name: "CourseEdit", params: { id: row.id } });
    },

    deleteCourse(row) {
      this.loading = true;

      let id = row.id;
      let params = { id };
      let options = {
        title: "删除课程",
        message: "确定删除课程吗？",
        showCancelButton: "取消",
        showConfirmButton: "确定"
      };

      this.$msgbox(options)
        .then(() => {
          courseService.delete(id, params).then(() => {
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
    courseTable: function() {
      return this.tableData;
    }
  }
};
</script>
