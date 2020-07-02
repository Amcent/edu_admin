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
              <el-col :span="12">
                <el-form-item label="课程名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="副标题">
                  <el-input v-model="form.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="课程提示">
                  <el-input v-model="form.tips"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="课程描述">
                  <el-input v-model="form.description"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="课程封面" class="edit-form-cover">
                  <el-upload class="cover-uploader" action="" :show-file-list="false" :limit="1"
                    :before-upload="handleBeforeUpload" accept="image/jpg, image/jpeg, image/png">
                    <img v-if="this.form.cover_url" :src="this.form.cover_url" class="cover-image" />
                    <i v-else class="el-icon-plus uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item class="edit-form-status" label="课程状态">
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
            <draggable class="tree" :list="treeData" v-bind="chapterOptions" handle=".handle" @start="drag = true"
              @end="handleSortChapter">
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
                          <el-dropdown-item :command="{ command: 'editChapter', item }">编辑</el-dropdown-item>
                          <el-dropdown-item v-if="item.children && item.children.length === 0"
                            :command="{ command: 'delChapter', item }">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </span>
                  </div>
                  <draggable class="tree-item-children" :data-index="index" :list="item.children" group="section"
                    handle=".handle" @start="drag = true" @end="handleSortSection">
                    <div class="tree-item-child tree-content" v-for="data in item.children" :key="data.name"
                      :data-id="data.id">
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
                            <el-dropdown-item :command="{ command: 'viewSection', data }">内容</el-dropdown-item>
                            <el-dropdown-item :command="{ command: 'editSection', data }">编辑</el-dropdown-item>
                            <el-dropdown-item :command="{ command: 'delSection', data }">删除</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </span>
                    </div>
                    <div class="tree-item-child-add" slot="footer" key="sectionFooter">
                      <i class="el-icon-circle-plus"></i>
                      <el-button type="text" @click="handleAddSection(item.id, item.children.length)">添加课时</el-button>
                    </div>
                  </draggable>
                </div>
              </transition-group>
              <div class="tree-item-add" slot="footer" key="chapterFooter">
                <i class="el-icon-circle-plus"></i>
                <el-button type="text" @click="handleAddChapter" class="add-node-btn">添加章节</el-button>
              </div>
            </draggable>

            <el-drawer class="drawer" :visible.sync="showDrawer" :before-close="beforeClose" size="40%">
              <el-form :model="section" class="info-form" id="form" label-position="top">
                <el-form-item label="小节名称:">
                  <div>{{ section.name }}</div>
                </el-form-item>
                <el-form-item label="视频地址:">
                  <el-input v-model="section.video_url" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="课程内容:">
                  <div class="ql-container ql-snow">
                    <quill-editor v-model="section.content" :options="editorOption" />
                  </div>
                </el-form-item>
              </el-form>
              <div class="drawer-primary-btn">
                <el-button type="primary" @click="handleEditSection">确 定</el-button>
              </div>
            </el-drawer>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import courseService from "@/global/service/course";
import chapterService from "@/global/service/chapter";
import sectionService from "@/global/service/section";
import qiniuService from "@/global/service/qiniu";
import draggable from "vuedraggable";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  name: "CourseEdit",

  data() {
    return {
      form: {
        name: "",
        title: "",
        tips: "",
        description: "",
        status: null,
        cover_url: ""
      },
      editBtnText: "修改",
      editting: false,
      treeData: [],
      section: {},
      showDrawer: false,
      editorOption: {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }],
            ["bold"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
          ]
        },
        placeholder: "Insert text here ..."
      },
      loading: true,
      drag: false
    };
  },

  created() {
    let id = this.$route.params.id;

    courseService.show(id).then(res => {
      this.form = res;
      this.handleGetTreeData();
    });
  },

  methods: {
    handleGetTreeData() {
      let id = this.$route.params.id;

      courseService
        .show(id)
        .then(res => {
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
        let form = {
          id: this.form.id,
          name: this.form.name,
          title: this.form.title,
          tips: this.form.tips,
          description: this.form.description,
          cover_url: this.form.cover_url,
          status: this.form.status
        };

        this.handleEditCourse(form);
      }
    },

    handleEditCourse(form) {
      this.loading = true;

      courseService
        .update(form.id, form)
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

    handleSortChapter(e) {
      this.loading = true;

      let chapters = [];
      let fromChapter = this.treeData[e.oldIndex];
      let toChapter = this.treeData[e.newIndex];

      fromChapter.sort = e.oldIndex + 1;
      toChapter.sort = e.newIndex + 1;
      chapters.push(fromChapter, toChapter);

      chapterService
        .sort(chapters)
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

    handleSortSection(e) {
      this.loading = true;

      let fromChapterIndex = e.from.dataset.index;
      let toChapterIndex = e.to.dataset.index;
      let sectionId = e.item.dataset.id;
      let chapterId = this.treeData[toChapterIndex].id;
      let sections = [];

      if (fromChapterIndex === toChapterIndex) {
        this.treeData[toChapterIndex].children.forEach((item, index) => {
          item.sort = index + 1;
          sections.push(item);
        });

        sectionService
          .sort(sections)
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
        this.treeData[fromChapterIndex].children.forEach((item, index) => {
          item.sort = index + 1;
          sections.push(item);
        });

        this.treeData[toChapterIndex].children.forEach((item, index) => {
          item.sort = index + 1;
          item.chapter_id = chapterId;
          sections.push(item);
        });

        sectionService
          .sort(sections)
          .then(() => {
            sectionService.update(sectionId, { chapter_id: chapterId });
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

    handleAddChapter() {
      this.loading = true;
      this.$prompt("请输入章节名称", "添加章节", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      })
        .then(({ value }) => {
          let params = {
            name: value,
            course_id: Number(this.$route.params.id),
            sort: this.treeData.length + 1
          };

          chapterService.create(params).then(res => {
            params.id = res.id;
            params.children = [];
            this.treeData.push(params);
          });

          this.$message({
            type: "success",
            message: "添加成功"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleAddSection(id, length) {
      this.loading = true;
      this.$prompt("请输入课时名称", "添加课时", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      })
        .then(({ value }) => {
          let params = {
            chapter_id: id,
            name: value,
            sort: length + 1
          };

          sectionService.create(params).then(res => {
            this.treeData.forEach(item => {
              if (item.id == id) {
                let section = params;
                section.id = res.id;
                item.children.push(section);
              }
            });

            this.$message({
              type: "success",
              message: "添加成功"
            });
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleCommand(e) {
      this.loading = true;

      let options = {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        inputValue: "",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        closeOnHashChange: false
      };

      if (e.command === "editChapter") {
        options.inputValue = e.item.name;
        this.$prompt("请输入章节名称", "编程章节", options)
          .then(({ value }) => {
            let id = e.item.id;

            chapterService.update(id, { name: value }).then(() => {
              this.treeData[e.item.sort - 1].name = value;
              this.$message({
                type: "success",
                message: "修改成功"
              });
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }

      if (e.command === "delChapter") {
        let id = e.item.id;

        chapterService
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

      if (e.command === "editSection") {
        let id = e.data.id;
        let chapterId = e.data.chapter_id;
        let message = "请输入小节名称";
        let title = e.data.name;

        options.inputValue = e.data.name;
        this.$prompt(message, title, options)
          .then(({ value }) => {
            sectionService.update(id, { name: value }).then(() => {
              this.treeData.forEach(item => {
                if (item.id == chapterId) {
                  item.children.forEach(data => {
                    if (data.id == id) {
                      data.name = value;
                    }
                  });
                }
              });

              this.$message({
                type: "success",
                message: "修改成功"
              });
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }

      if (e.command === "viewSection") {
        let id = e.data.id;

        this.showDrawer = true;
        sectionService
          .show(id)
          .then(res => {
            this.section = res;
          })
          .finally(() => {
            this.loading = false;
          });
      }

      if (e.command === "delSection") {
        let id = e.data.id;
        let chapterId = e.data.chapter_id;

        sectionService
          .delete(id)
          .then(() => {
            this.treeData.forEach(item => {
              if (item.id == chapterId) {
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
      this.$confirm("确认关闭？").then(() => {
        done();
      });
    },

    handleEditSection() {
      let id = this.section.id;
      let params = {
        video_url: this.section.video_url,
        content: this.section.content
      };

      this.loading = true;
      sectionService
        .update(id, params)
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功"
          });

          this.showDrawer = false;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },

  computed: {
    chapterOptions() {
      return {
        group: "chapter",
        ghostClass: "ghost",
        animation: 0
      };
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },

  components: {
    draggable,
    quillEditor
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

.add-node-btn {
  padding: 0;
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
