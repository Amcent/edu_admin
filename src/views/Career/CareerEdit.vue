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
                <el-form-item label="职业名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="职业描述">
                  <el-input v-model="form.description"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="职业封面" class="edit-form-cover">
                  <el-upload class="cover-uploader" action="" :show-file-list="false" :limit="1"
                    :before-upload="handleBeforeUpload" accept="image/jpg, image/jpeg, image/png">
                    <img v-if="this.form.cover_url" :src="this.form.cover_url" class="cover-image" />
                    <i v-else class="el-icon-plus uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item class="edit-form-status" label="职业状态">
                  <el-switch v-model="form.status" :active-value="1" :inactive-value="0" active-text="已完成"
                    inactive-text="未完成" active-color="#13ce66" inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="12">
          <div class="tree-container">
            <draggable class="tree" :list="treeData" v-bind="pathOptions" handle=".handle" @start="drag = true"
              @end="handleSortPath">
              <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                <div class="tree-item" v-for="(item, index) in treeData" :key="item.name">
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
                          <el-dropdown-item :command="{ command: 'handleEditPath', item }">编辑</el-dropdown-item>
                          <el-dropdown-item v-if="item.children && item.children.length == 0"
                            :command="{ command: 'delPath', item }">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </span>
                  </div>
                  <draggable class="tree-item-children" :data-index="index" :list="item.children" group="course"
                    handle=".handle" @start="drag = true" @end="handleSortCourse">
                    <div class="tree-item-child tree-content" v-for="data in item.children" :key="data.name"
                      :data-id="data.id" :data-course-id="data.course_id">
                      <span class="tree-item-child-icon tree-content-icon">
                        <i class="el-icon-rank handle"></i>
                      </span>
                      <span class="tree-item-child-title tree-item-text">
                        {{ data.name }}
                      </span>
                      <span class="tree-item-child-op tree-item-op">
                        <el-dropdown @command="handleCommand">
                          <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{ command: 'delCourse', data }">删除</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </span>
                    </div>
                    <div class="tree-item-child-add" slot="footer" key="sectionFooter">
                      <i class="el-icon-circle-plus"></i>
                      <el-button type="text" @click="handleLinkCourse(item.id, item.children.length)">关联课程</el-button>
                    </div>
                  </draggable>
                </div>
              </transition-group>
              <div class="tree-item-add" slot="footer" key="chapterFooter">
                <i class="el-icon-circle-plus"></i>
                <el-button type="text" @click="addPath">添加路径</el-button>
              </div>
            </draggable>
          </div>
        </el-col>
      </el-row>

      <el-dialog :title="dialogFormType === 'create' ? '添加职业路径' : '修改职业路径'" :visible.sync="dialogFormVisible"
        :before-close="beforeClose">
        <el-form :model="dialogForm">
          <el-form-item label="路径名称">
            <el-input v-model="dialogForm.name" @input="inputChange"></el-input>
          </el-form-item>
          <el-form-item label="路径描述">
            <el-input v-model="dialogForm.description" type="textarea" @input="inputChange"></el-input>
          </el-form-item>
          <el-form-item class="edit-form-btns">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="pathSubimt">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import careerService from "@/global/service/career";
import pathService from "@/global/service/path";
import careerCourseService from "@/global/service/career_course";
import courseService from "@/global/service/course";
import qiniuService from "@/global/service/qiniu";
import draggable from "vuedraggable";

export default {
  name: "CareerEdit",

  data() {
    return {
      form: {
        name: "",
        cover_url: "",
        description: "",
        status: null,
        children: []
      },
      editBtnText: "修改",
      editting: false,
      imageUrl: "",
      treeData: [],
      loading: true,
      drag: false,
      dialogFormType: "",
      dialogFormVisible: false,
      dialogForm: {}
    };
  },

  created() {
    let id = this.$route.params.id;

    this.handleGetCareer(id);
  },

  methods: {
    handleGetCareer(id) {
      careerService
        .show(id)
        .then(res => {
          this.form = res;
          this.treeData = res.children;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleBeforeUpload(file) {
      this.loading = true;

      qiniuService
        .start(file)
        .then(res => {
          this.form.cover_url = res;
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
        let id = this.form.id;
        let form = {
          name: this.form.name,
          description: this.form.description,
          cover_url: this.form.cover_url,
          status: this.form.status
        };

        this.handleEditCareer(id, form);
      }
    },

    handleEditCareer(id, form) {
      this.loading = true;

      careerService
        .update(id, form)
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

    handleSortPath(e) {
      this.loading = true;

      let paths = [];
      let fromPath = this.treeData[e.oldIndex];
      let toPath = this.treeData[e.newIndex];

      fromPath.sort = e.oldIndex + 1;
      toPath.sort = e.newIndex + 1;
      paths.push(fromPath, toPath);

      pathService
        .sort(paths)
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleSortCourse(e) {
      this.loading = true;

      let fromPathIndex = e.from.dataset.index;
      let toPathIndex = e.to.dataset.index;
      let id = e.item.dataset.id;
      let pathId = this.treeData[toPathIndex].id;
      let careerCourse = [];

      if (fromPathIndex === toPathIndex) {
        this.treeData[toPathIndex].children.forEach((item, index) => {
          item.sort = index + 1;
          careerCourse.push(item);
        });

        careerCourseService
          .sort(careerCourse)
          .then(() => {
            this.$message({
              type: "success",
              message: "修改成功"
            });
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.treeData[fromPathIndex].children.forEach((item, index) => {
          item.sort = index + 1;
          careerCourse.push(item);
        });

        this.treeData[toPathIndex].children.forEach((item, index) => {
          item.sort = index + 1;
          item.path_id = pathId;
          careerCourse.push(item);
        });

        careerCourseService.update(id, { path_id: pathId }).finally(() => {
          this.loading = false;
        });

        careerCourseService
          .sort(careerCourse)
          .then(() => {
            this.$message({
              type: "success",
              message: "修改成功"
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

    pathSubimt() {
      if (this.dialogFormType == "create") {
        this.loading = true;
        this.handleCreatePath();
      } else {
        this.loading = true;
        this.handleEditPath();
      }
    },

    handleEditPath() {
      let id = this.dialogForm.id;
      let params = {
        career_id: Number(this.$route.params.id),
        name: this.dialogForm.name,
        description: this.dialogForm.description
      };

      pathService
        .update(id, params)
        .then(() => {
          this.treeData[this.dialogForm.index].name = this.dialogForm.name;

          this.$message({
            type: "success",
            message: "修改成功"
          });
        })
        .finally(() => {
          this.dialogFormVisible = false;
          this.loading = false;
        });
    },

    handleCreatePath() {
      let params = {
        name: this.dialogForm.name,
        description: this.dialogForm.description,
        career_id: Number(this.$route.params.id),
        sort: this.treeData.length + 1
      };

      pathService
        .create(params)
        .then(res => {
          params.id = res.id;
          params.children = [];
          this.treeData.push(params);
          this.$message({
            type: "success",
            message: "创建成功"
          });
        })
        .finally(() => {
          this.dialogFormVisible = false;
          this.loading = false;
        });
    },

    inputChange() {
      this.$forceUpdate();
    },

    addPath() {
      this.dialogFormType = "create";
      this.dialogForm = {};
      this.dialogFormVisible = true;
    },

    handleLinkCourse(path_id, length) {
      this.loading = true;
      this.$prompt("请输入课时id", "添加课时", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      })
        .then(({ value }) => {
          let id = value;

          courseService.show(id).then(res => {
            let params = {
              career_id: this.$route.params.id,
              path_id: path_id,
              course_id: id,
              sort: length + 1
            };

            careerCourseService.create(params);
            this.treeData.forEach(item => {
              if (item.id == path_id) {
                item.children.push(res);
              }
            });

            this.$message({
              type: "success",
              message: "创建成功"
            });
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleCommand(e) {
      if (e.command === "handleEditPath") {
        this.dialogFormType = "edit";
        this.dialogForm.name = e.item.name;
        this.dialogForm.description = e.item.description;
        this.dialogForm.id = e.item.id;
        this.dialogForm.index = e.item.sort - 1;
        this.dialogFormVisible = true;
      }

      if (e.command === "delPath") {
        this.loading = true;

        let id = e.item.id;

        pathService
          .delete(id)
          .then(() => {
            this.treeData.forEach((item, index) => {
              if (item.id == id) {
                this.treeData.splice(index, 1);
              }
            });

            this.$message({
              type: "success",
              message: "删除成功"
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }

      if (e.command === "delCourse") {
        this.loading = true;

        let id = e.data.id;

        careerCourseService
          .delete(id)
          .then(() => {
            this.treeData.forEach(item => {
              if (item.id == e.data.path_id) {
                item.children.forEach((data, index) => {
                  if (data.id == id) {
                    item.children.splice(index, 1);
                  }
                });
              }
            });

            this.$message({
              type: "success",
              message: "删除成功"
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

    beforeClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  },

  computed: {
    pathOptions() {
      return {
        group: "path",
        ghostClass: "ghost",
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
    .el-icon-chaptersow-down {
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

  .edit-form-btns {
    margin-top: 10px;
    text-align: right;
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
