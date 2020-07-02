<template>
  <div class="page-main-container">
    <div class="page-main-content" v-loading="loading">
      <el-row :gutter="20" class="page-content-header">
        <div class="page-content-header-title">Project</div>
        <div class="page-content-header-desc">{{ projectDesc }}</div>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="version-container">
            <div class="version-container-title">版本</div>
            <div class="version-tree-container">
              <draggable class="version-item" :list="treeData" v-bind="versionOptions" @start="drag = true"
                @end="handleSortVersion">
                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                  <div :class="[
                    'version-item-child',
                    'tree-content',
                    [version.id === versionId ? 'active' : ''],
                  ]" v-for="version in treeData" :key="version.name" @click="setStoryList(version.id)">
                    <span class="version-item-child-icon tree-content-icon">
                      <i class="el-icon-rank handle"></i>
                    </span>
                    <span class="version-item-child-title tree-item-text">
                      {{ version.name }}
                    </span>
                    <span class="version-item-child-op tree-item-op">
                      <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                          <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{ command: 'editVersion', version }">编辑</el-dropdown-item>
                          <el-dropdown-item v-if="
                            version.children && version.children.length == 0
                          " :command="{ command: 'delVersion', version }">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </span>
                  </div>
                </transition-group>
                <div class="tree-item-add" slot="footer" key="versionFooter">
                  <i class="el-icon-circle-plus"></i>
                  <el-button type="text" @click="handleAddVersion">添加版本</el-button>
                </div>
              </draggable>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="tree-container">
            <div class="tree-container-title">故事</div>
            <draggable class="tree" :list="storyList" v-bind="storyOptions" @start="drag = true" @end="handleSortStory">
              <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                <div class="tree-item" v-for="(story, index) in storyList" :key="story.name" :data-id="story.id">
                  <div class="tree-item-header tree-content">
                    <span class="tree-item-children-icon tree-content-icon">
                      <i class="el-icon-rank handle"></i>
                    </span>
                    <span class="tree-item-children-title tree-item-text">
                      {{ story.name }}
                    </span>
                    <span class="tree-item-children-op tree-item-op">
                      <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                          <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{ command: 'editStory', story }">编辑</el-dropdown-item>
                          <el-dropdown-item v-if="story.children && story.children.length == 0"
                            :command="{ command: 'delStory', story }">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </span>
                  </div>
                  <draggable class="tree-item-children" :data-index="index" :list="story.children" v-bind="taskOptions"
                    @start="drag = true" @end="handleSortTask">
                    <div class="tree-item-child tree-content" v-for="task in story.children" :key="task.name"
                      :data-id="task.id">
                      <span class="tree-item-child-icon tree-content-icon">
                        <i class="el-icon-rank handle"></i>
                      </span>
                      <span class="tree-item-child-title tree-item-text">
                        {{ task.name }}
                      </span>
                      <span class="tree-item-child-op tree-item-op">
                        <el-dropdown @command="handleCommand">
                          <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{ command: 'viewTask', task }">内容</el-dropdown-item>
                            <el-dropdown-item :command="{ command: 'delTask', task }">删除</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </span>
                    </div>
                    <div class="tree-item-child-add" slot="footer" key="taskFooter">
                      <i class="el-icon-circle-plus"></i>
                      <el-button type="text" @click="addTask(story.id, story.children.length)">添加任务</el-button>
                    </div>
                  </draggable>
                </div>
              </transition-group>
              <div class="tree-item-add" slot="footer" key="storyFooter">
                <i class="el-icon-circle-plus"></i>
                <el-button type="text" @click="handleAddStory">添加故事</el-button>
              </div>
            </draggable>

            <el-drawer class="drawer" :visible.sync="showDrawer" :before-close="beforeClose" size="40%">
              <el-form :model="task" class="info-form" id="form" label-position="top">
                <el-row>
                  <el-col>
                    <el-form-item label="任务名称:">
                      <el-input v-model="task.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="任务难度:">
                      <el-select v-model="task.level" placeholder="请选择">
                        <el-option v-for="item in levels" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="任务平台:">
                      <el-select v-model="task.platform" placeholder="请选择">
                        <el-option v-for="item in platforms" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="任务内容:">
                      <div class="ql-container ql-snow">
                        <quill-editor :options="editorOption" v-model="task.content" />
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div class="drawer-primary-btn">
                <el-button type="primary" @click="handleEditTask">保 存</el-button>
              </div>
            </el-drawer>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import projectService from "@/global/service/project";
import versionService from "@/global/service/version";
import storyService from "@/global/service/story";
import taskService from "@/global/service/task";
import draggable from "vuedraggable";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  name: "ProjectEdit",

  data() {
    return {
      projectDesc: "",
      imageUrl: "",
      treeData: [],
      storyList: [],
      versionId: null,
      showDrawer: false,
      levels: [
        {
          value: 1,
          label: "入门"
        },
        {
          value: 2,
          label: "初级"
        },
        {
          value: 3,
          label: "中级"
        },
        {
          value: 4,
          label: "高级"
        }
      ],
      platforms: [
        {
          value: 1,
          label: "API"
        },
        {
          value: 2,
          label: "前台"
        },
        {
          value: 3,
          label: "后台"
        },
        {
          value: 4,
          label: "小程序"
        }
      ],
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
      loading: false,
      drag: false,
      task: {}
    };
  },

  created() {
    let id = this.$route.params.id;
    this.handleGetProjectData(id);
  },

  methods: {
    handleGetProjectData(id) {
      projectService
        .show(id)
        .then(res => {
          this.treeData = res.children;
          this.storyList = res.children[0].children;
          this.versionId = res.children[0].id;
          this.projectDesc = res.description;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleSortVersion() {
      let versions = [];

      this.loading = true;
      this.treeData.forEach((item, index) => {
        let version = {
          id: item.id,
          sort: index + 1
        };

        versions.push(version);
      });

      versionService
        .sort(versions)
        .then(() => {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    setStoryList(id) {
      let version = this.treeData.filter(item => item.id == id);
      this.storyList = version[0].children;
      this.versionId = id;
    },

    handleSortStory() {
      this.loading = true;

      let stories = [];

      this.storyList.forEach((item, index) => {
        item.sort = index + 1;
        stories.push(item);
      });

      storyService
        .sort(stories)
        .then(() => {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleSortTask(e) {
      this.loading = true;

      let fromStoryIndex = e.from.dataset.index;
      let toStoryIndex = e.to.dataset.index;
      let taskId = e.item.dataset.id;
      let storyId = this.storyList[toStoryIndex].id;
      let versionId = this.versionId;

      if (fromStoryIndex === toStoryIndex) {
        let tasks = [];

        this.treeData.forEach(version => {
          if (version.id === versionId) {
            version.children[toStoryIndex].children.forEach((task, index) => {
              task.sort = index + 1;
              tasks.push(task);
            });
          }
        });

        taskService
          .sort(tasks)
          .then(() => {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        let tasks = [];

        this.treeData.forEach(version => {
          if (versionId === version.id) {
            version.children[fromStoryIndex].children.forEach((item, index) => {
              item.sort = index + 1;
              tasks.push(item);
            });

            version.children[toStoryIndex].children.forEach((item, index) => {
              item.sort = index + 1;
              tasks.push(item);
            });
          }
        });

        taskService
          .update(taskId, { story_id: storyId })
          .then(() => {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          })
          .finally(() => {
            this.loading = false;
          });

        taskService
          .sort(tasks)
          .then(() => {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

    handleAddStory() {
      this.loading = true;
      this.$prompt("请输入故事名称", "添加故事", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      })
        .then(({ value }) => {
          let params = {
            name: value,
            project_id: Number(this.$route.params.id),
            version_id: this.versionId,
            sort: this.storyList.length + 1
          };

          storyService.create(params).then(res => {
            this.treeData.forEach(item => {
              if (item.id === this.versionId) {
                params.id = res.id;
                params.children = [];
                item.children.push(params);
              }
            });
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleAddVersion() {
      this.loading = true;

      this.$prompt("请输入版本名称", "添加版本", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      })
        .then(({ value }) => {
          let version = {
            project_id: Number(this.$route.params.id),
            name: value,
            sort: this.treeData.length + 1
          };

          versionService.create(version).then(res => {
            version.id = res.id;
            version.children = [];
            this.treeData.push(version);

            this.$message({
              message: "添加成功",
              type: "success"
            });
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    addTask(id, length) {
      this.loading = true;

      let storyId = id;
      let storyLength = length;

      this.$prompt("请输入故事名称", "添加故事", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      })
        .then(({ value }) => {
          let params = {
            name: value,
            project_id: Number(this.$route.params.id),
            version_id: this.versionId,
            story_id: storyId,
            sort: storyLength + 1
          };

          taskService.create(params).then(res => {
            this.treeData.forEach(item => {
              if (item.id === this.versionId) {
                item.children.forEach(data => {
                  if (data.id === storyId) {
                    params.id = res.id;
                    data.children.push(params);
                  }
                });
              }
            });

            this.$message({
              message: "添加成功",
              type: "success"
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
        inputPattern: /\S/,
        inputErrorMessage: "输入不能为空"
      };

      if (e.command === "editVersion") {
        options.inputValue = e.version.name;
        this.$prompt("请输入版本名称", "编辑版本", options)
          .then(({ value }) => {
            let id = e.version.id;

            versionService.update(id, { name: value }).then(() => {
              this.treeData[e.version.sort - 1].name = value;

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

      if (e.command === "delVersion") {
        let id = e.version.id;

        versionService
          .delete(id)
          .then(() => {
            this.treeData.forEach((item, index) => {
              if (item.id == id) {
                this.treeData.splice(index, 1);

                this.$message({
                  message: "删除成功",
                  type: "success"
                });
              }
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }

      if (e.command === "editStory") {
        let id = e.story.id;
        let message = "请输入任务名称";
        let title = e.story.name;

        options.inputValue = e.story.name;
        this.$prompt(message, title, options)
          .then(({ value }) => {
            storyService.update(id, { name: value }).then(() => {
              this.treeData.forEach(item => {
                if (item.id === this.versionId) {
                  item.children.forEach(data => {
                    if (data.id === id) {
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

      if (e.command === "delStory") {
        let id = e.story.id;
        let index = e.story.sort - 1;

        this.$confirm("确认删除？")
          .then(() => {
            storyService.delete(id).then(() => {
              this.storyList.splice(index, 1);

              this.$message({
                type: "success",
                message: "删除成功"
              });
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }

      if (e.command === "viewTask") {
        this.showDrawer = true;
        this.task = e.task;
        this.loading = false;
      }

      if (e.command === "delTask") {
        let id = e.task.id;
        let index = e.task.sort - 1;
        let storyId = e.task.story_id;
        let versionId = e.task.version_id;

        this.$confirm("确认要删除吗？")
          .then(() => {
            taskService.delete(id).then(() => {
              this.treeData.forEach(item => {
                if (item.id === versionId) {
                  item.children.forEach(data => {
                    if (data.id === storyId) {
                      data.children.splice(index, 1);
                    }
                  });
                }
              });

              this.$message({
                type: "success",
                message: "删除成功"
              });
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
    },

    handleEditTask() {
      let id = this.task.id;
      let task = this.task;

      this.loading = true;

      taskService
        .update(id, task)
        .then(() => {
          this.showDrawer = false;

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

  computed: {
    versionOptions() {
      return {
        group: "version",
        ghostClass: "ghost",
        animation: 0,
        handle: ".handle"
      };
    },
    storyOptions() {
      return {
        group: "story",
        ghostClass: "ghost",
        animation: 0,
        handle: ".handle"
      };
    },
    taskOptions() {
      return {
        group: "task",
        ghostClass: "ghost",
        animation: 0,
        handle: ".handle"
      };
    }
  },

  components: {
    draggable,
    quillEditor
  }
};
</script>

<style lang="less" scoped>
.page-content-header {
  height: 60px;
  text-align: left;

  .page-content-header-title {
    line-height: 24px;
    font-size: 24px;
    color: #333;
    font-weight: 600;
  }

  .page-content-header-desc {
    margin-top: 20px;
    line-height: 24px;
    font-size: 20px;
    color: #666;
    font-weight: 500;
  }
}

.version-container {
  .version-container-title {
    margin-top: 30px;
    padding-left: 20px;
    line-height: 20px;
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  .version-tree-container {
    margin-top: 50px;
    padding: 1px;
    background-color: #f5f6f7;

    .version-item {
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 1px 4px 0 rgba(31, 35, 41, 0.05);
      background-color: #fff;
      line-height: 41px;
      color: #666;

      .version-item-child {
        font-size: 12px;
        cursor: pointer;

        .version-item-child-title {
          font-size: 14px;
        }

        &.active {
          background-color: rgba(179, 192, 209, 0.3);
        }
      }

      .tree-item-add {
        height: 41px;
        padding: 10px;
        background-color: #fff;
        text-align: right;
      }
    }
  }
}

.tree-container {
  .tree-container-title {
    margin-top: 30px;
    padding-left: 20px;
    line-height: 20px;
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  .tree {
    margin-top: 50px;

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

  .tree-item-add {
    height: 41px;
    padding: 10px;
    background-color: #fff;
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
    .el-icon-storysow-down {
      font-size: 12px;
    }
  }
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
