<template>
  <div class="tree-container">
    <draggable
      class="tree"
      :list="treeData"
      v-bind="chapterOptions"
      @change="courseChange"
      handle=".handle"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <div class="tree-item" v-for="(item, index) in treeData" :key="item.id">
          <div class="tree-item-header tree-content">
            <span class="tree-item-children-icon tree-content-icon">
              <i class="el-icon-rank handle"></i>
            </span>
            <span class="tree-item-children-title tree-item-text">
              {{ item.name }} : {{ item.sort }} : {{ index }}
            </span>
            <span class="tree-item-children-op tree-item-op">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :command="{ command: 'editNode', id: item.id }"
                    >编辑</el-dropdown-item
                  >
                  <el-dropdown-item
                    :command="{ command: 'delNode', id: item.id }"
                    >删除</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
          <draggable
            class="tree-item-children"
            :list="item.children"
            group="section"
            @change="chapterChange"
            handle=".handle"
          >
            <div
              class="tree-item-child tree-content"
              v-for="(data, dataIndex) in item.children"
              :key="data.id"
            >
              <span class="tree-item-child-icon tree-content-icon">
                <i class="el-icon-rank handle"></i>
              </span>
              <span class="tree-item-child-title tree-item-text">
                {{ data.name }} : {{ data.sort }} : {{ dataIndex }}
              </span>
              <span class="tree-item-child-op tree-item-op">
                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      :command="{ command: 'viewNode', id: data.id }"
                      >内容</el-dropdown-item
                    >
                    <el-dropdown-item
                      :command="{ command: 'editNode', id: data.id }"
                      >编辑</el-dropdown-item
                    >
                    <el-dropdown-item
                      :command="{ command: 'delNode', id: data.id }"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
          </draggable>
          <div class="tree-item-child-add">
            <i class="el-icon-circle-plus"></i>

            <el-button type="text" slot="footer" @click="addChildNode"
              >添加子节点</el-button
            >
          </div>
        </div>
        <div class="tree-item-add" slot="footer" @click="addNode">
          <i class="el-icon-circle-plus"></i>
          <el-button type="text">添加</el-button>
        </div>
      </transition-group>
    </draggable>

    <el-drawer
      class="drawer"
      :visible.sync="showDrawer"
      @opened="openDrawer"
      size="40%"
    >
      <el-form
        :model="section"
        class="info-form"
        id="form"
        label-position="top"
      >
        <el-form-item label="小节名称:">
          <div>{{ section.name }}</div>
        </el-form-item>
        <el-form-item label="视频地址:">
          <el-input v-model="section.videoAddress" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="课程内容:">
          <div class="editor" id="tree-editor"></div>
        </el-form-item>
      </el-form>
      <div class="drawer-primary-btn">
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default {
  name: 'sortableTree',

  props: {
    treeData: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      showDrawer: false,
      section: {
        name: 'test',
        videoAddress: 'test',
      },
      quill: '',
    }
  },

  methods: {
    drag() {},
    end() {},
    courseChange(e) {
      console.log(e)
    },

    chapterChange(e) {
      console.log(e)
    },
    addNode() {},
    addChildNode() {},

    handleCommand(e) {
      if (e.command === 'editNode') {
        console.log('editNode')

        // this.nodeTitle = e.node.data.label
        // this.editNodeVisible = true
      }

      if (e.command === 'viewNode') {
        console.log('viewNode')
        this.showDrawer = true

        // this.nodeTitle = e.node.label
        // this.showDrawer = true
      }

      if (e.command === 'delNode') {
        console.log('delNode')
      }
    },

    openDrawer() {
      let editorContainer = document.getElementById('tree-editor')
      this.quill = new Quill(editorContainer, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }],
            ['bold'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
          ],
        },
      })
    },
    confirmEdit() {},
  },

  computed: {
    chapterOptions() {
      return {
        group: 'chapter',
        ghostClass: 'ghost',
        animation: 0,
      }
    },
  },

  components: {
    draggable,
  },
}
</script>

<style lang="less" scoped>
.tree-container {
  height: 100%;

  .tree {
    height: 100%;
    padding: 10px 10px 20px;
    background-color: #b3c0d1;

    .tree-item {
      margin-bottom: 20px;
      padding: 10px;
      background-color: #fff;
      line-height: 41px;
      color: #666;

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
        .el-icon-arrow-down {
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
}
</style>
