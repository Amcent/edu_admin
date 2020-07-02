<template>
  <div class="page-main-container">
    <div class="page-main-content">
      <div class="content-header">
        <router-link to="/ability/create">
          <el-button type="primary">
            创建
          </el-button>
        </router-link>
      </div>
      <el-table class="content-table" :data="abilityTable" style="width: 100%" size="medium" v-loading="loading">
        <el-table-column prop="id" label="id" width="80"> </el-table-column>
        <el-table-column prop="name" label="名称" width="300"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button @click="editAbility(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="deleteAbility(scope.row)">删除</el-button>
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
import abilityService from "@/global/service/ability";

export default {
  name: "Ability",

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

      abilityService
        .index(params)
        .then(res => {
          this.tableData = res.abilities;
          this.total = res.total.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    editAbility(row) {
      this.$router.push({ name: "AbilityEdit", params: { id: row.id } });
    },

    deleteAbility(row) {
      this.loading = true;

      let id = row.id;
      let options = {
        title: "删除技能",
        message: "确定删除技能吗？",
        showCancelButton: "取消",
        showConfirmButton: "确定"
      };

      this.$msgbox(options)
        .then(() => {
          abilityService.delete(id, { id }).then(() => {
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
    abilityTable: function() {
      return this.tableData;
    }
  }
};
</script>
