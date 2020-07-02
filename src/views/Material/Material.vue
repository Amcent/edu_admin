<template>
  <div class="page-main-container">
    <div class="page-main-content">
      <div class="content-header">
        <router-link to="/material/create">
          <el-button type="primary">
            创建物料
          </el-button>
        </router-link>
      </div>
      <el-table class="content-table" :data="materialTable" style="width: 100%" size="medium" v-loading="loading">
        <el-table-column prop="id" label="id" width="80"> </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="jump_url" label="跳转链接">
          <template slot-scope="scope">
            <span>{{ scope.row.new_tab === 0 ? '原窗口' : '新窗口'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="new_tab" label="打开窗口"></el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button @click="editMaterial(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="deleteMaterial(scope.row)">删除</el-button>
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
import materialService from "@/global/service/material";

export default {
  name: "Material",

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

      materialService
        .index(params)
        .then(res => {
          this.tableData = res.materials;
          this.total = res.total.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    editMaterial(row) {
      this.$router.push({ name: "MaterialEdit", params: { id: row.id } });
    },

    deleteMaterial(row) {
      this.loading = true;

      let id = row.id;
      let params = { id };
      let options = {
        title: "删除物料",
        message: "确定删除物料吗？",
        showCancelButton: "取消",
        showConfirmButton: "确定"
      };

      this.$msgbox(options)
        .then(() => {
          materialService.delete(id, params).then(() => {
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
    materialTable: function() {
      return this.tableData;
    }
  }
};
</script>
