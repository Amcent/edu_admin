<template>
  <div class="page-main-container">
    <div class="page-main-content" v-loading="loading">
      <el-row :gutter="20" class="edit-form-container">
        <el-col :span="12">
          <div class="edit-header-container">
            <span class="edit-header-title">| 基本信息</span>
            <el-button :type="editting ? 'success' : 'primary'" class="edit-form-btn" @click="editStatusChange">
              {{ editBtnText }}</el-button>
          </div>
          <el-form class="edit-form" :model="form" label-position="top" size="medium" :disabled="!editting">
            <el-row justify="center" :gutter="20">
              <el-col>
                <el-form-item label="广告名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="slug">
                  <el-input v-model="form.slug"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="尺寸：宽">
                  <el-input v-model="form.widthSize"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="尺寸：高">
                  <el-input v-model="form.heightSize"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="12">
          <div class="tree-container">
            <draggable class="tree" :list="treeData" v-bind="materialOptions" @start="drag = true"
              @end="handleSortMaterial">
              <div class="tree-item" v-for="item in treeData" :key="item.name">
                <div class="tree-item-header tree-content">
                  <span class="tree-item-children-icon tree-content-icon">
                    <i class="el-icon-rank handle"></i>
                  </span>
                  <span class="tree-item-children-title tree-item-text">
                    {{ item.name }}
                  </span>
                  <span class="tree-item-children-op tree-item-op">
                    <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link">
                        <i class="el-icon-more"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="{ command: 'delMaterial', item }">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </span>
                </div>
              </div>
              <div class="tree-item-add" slot="footer" key="advertiseFooter">
                <i class="el-icon-circle-plus"></i>
                <el-button type="text" @click="handleLinkMaterial">添加物料</el-button>
              </div>
            </draggable>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import advertiseService from "@/global/service/advertise";
import materialService from "@/global/service/material";
import advertiseMaterialService from "@/global/service/advertiseMaterial";
import draggable from "vuedraggable";

export default {
  name: "AdvertiseEdit",

  data() {
    return {
      form: {
        name: "",
        slug: "",
        widthSize: "",
        heightSize: ""
      },
      editBtnText: "修改",
      editting: false,
      treeData: [],
      loading: true,
      drag: false
    };
  },

  created() {
    this.handleGetAdvertise();
  },

  methods: {
    handleGetAdvertise() {
      let id = this.$route.params.id;

      advertiseService
        .show(id)
        .then(res => {
          this.form = res;
          this.treeData = res.children;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    editStatusChange() {
      if (!this.editting) {
        this.editting = true;
        this.editBtnText = "保存";
      } else {
        let form = this.form;

        this.handleEditAdvertise(form);
      }
    },

    handleEditAdvertise(form) {
      this.loading = true;

      let id = form.id;
      let advertise = {
        name: form.name,
        slug: form.slug,
        widthSize: form.widthSize,
        heightSize: form.heightSize
      };

      advertiseService
        .update(id, advertise)
        .then(() => {
          this.$message({
            message: "保存成功",
            type: "success"
          });

          this.editting = false;
          this.editBtnText = "修改";
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleSortMaterial() {
      this.loading = true;
      let materials = [...this.treeData];

      materials.forEach((item, index) => {
        item.id = item.advertise_materials_id;
        item.sort = index + 1;
      });

      advertiseMaterialService
        .sort(materials)
        .then(() => {
          this.treeData = materials;

          this.$message({
            message: "修改成功",
            type: "success"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleLinkMaterial() {
      this.loading = true;
      this.$prompt("请输入物料id", "添加物料", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      })
        .then(({ value }) => {
          let id = Number(value);
          let hasMaterial = this.treeData.some(item => item.id === id);

          if (hasMaterial) {
            this.$message.error("此物料已存在");
            return;
          }

          materialService.show(id).then(res => {
            let material = res;
            let params = {
              advertise_id: Number(this.$route.params.id),
              material_id: id,
              sort: this.treeData.length + 1
            };

            advertiseMaterialService.create(params).then(response => {
              material.advertise_materials_id = response.id;
              material.sort = this.treeData.length + 1;
              this.treeData.push(material);

              this.$message({
                message: "关联成功",
                type: "success"
              });
            });
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleCommand(e) {
      this.loading = true;

      if (e.command === "delMaterial") {
        let id = e.item.advertise_materials_id;
        let index = e.item.sort - 1;

        advertiseMaterialService
          .delete(id)
          .then(() => {
            this.treeData.splice(index, 1);

            let materials = [...this.treeData];

            materials.forEach((item, index) => {
              item.sort = index + 1;
              item.id = item.advertise_materials_id;
            });

            advertiseMaterialService.sort(materials).then(() => {
              this.$message({
                message: "修改成功",
                type: "success"
              });
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  },

  computed: {
    materialOptions() {
      return {
        group: "material",
        ghostClass: "ghost",
        handle: ".handle",
        animation: 0
      };
    }
  },

  components: {
    draggable
  }
};
</script>

<style lang="less" scoped>
.tree-item {
  .tree-item-children {
    .tree-item-main {
      padding-left: 25px;
    }

    .tree-item-children-title {
      font-size: 14px;
    }

    .tree-item-child {
      font-size: 12px;
    }
  }

  .tree-item-child-add {
    text-align: right;
  }
}

.tree-content {
  position: relative;
  height: 40px;
  padding-left: 25px;
  line-height: 40px;
  text-align: left;

  .tree-item-text {
    display: block;
    border-bottom: 1px solid #999;
  }

  &:hover {
    .tree-content-icon {
      display: block;
    }
  }

  .tree-content-icon {
    display: none;
    position: absolute;
    top: 1px;
    left: 0;
  }

  &.tree-item-child {
    padding-left: 35px;

    .tree-item-child-icon {
      left: 15px;
    }

    .tree-item-child-op {
      position: absolute;
      right: 15px;
      top: 3px;
    }
  }

  .tree-item-op {
    position: absolute;
    right: 15px;
    top: 3px;

    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-advertisesow-down {
      font-size: 12px;
    }
  }
}

.tree-item-add {
  height: 41px;
  padding: 10px;
  background-color: #fff;
  text-align: right;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.drawer {
  text-align: left;

  .info-form {
    padding: 0 20px;

    .ql-editor {
      height: 300px;
    }
  }
  .drawer-primary-btn {
    padding-left: 20px;
  }
}

.ql-container.ql-snow {
  height: 500px;
  padding: 0 !important;
  line-height: 1.42;
  outline: none;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  word-wrap: break-word;
}
.quill-editor {
  height: 92%;
}
</style>
