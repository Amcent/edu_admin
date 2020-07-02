<template>
  <div class="tree-component-container">
    <div class="tree-item-container" v-for="item in treeData" :key="item.id">
      <el-tree
        class="tree"
        :data="[item]"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        :expand-on-click-node="false"
      >
        <div class="tree-item" slot-scope="{ node }">
          <span>
            <i
              class="el-icon-rank tree-item-icon"
              @mousedown="allowDragItem = true"
            ></i>
          </span>
          <span>{{ node.label }}</span>
          <span class="tree-item-operation">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-if="node.level !== 1"
                  :command="{ command: 'viewNode', node: node }"
                  >内容</el-dropdown-item
                >
                <el-dropdown-item :command="{ command: 'editNode', node: node }"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-tree>
      <!-- <div class="add-node" @click="addNode(item)">
        <el-button type="text" class="add-node-btn">{{
          addNodeText
        }}</el-button>
        <i class="el-icon-circle-plus"></i>
      </div> -->
    </div>

    <div class="add-main-node" @click="addMainNode">
      <el-button type="text" class="add-node-btn">{{
        addMainNodeText
      }}</el-button>
      <i class="el-icon-circle-plus"></i>
    </div>

    <el-dialog
      :title="nodeTitle"
      :visible.sync="editNodeVisible"
      style="text-align: left;"
    >
      <span>请编辑名称</span>
      <el-input
        v-model="nodeTitle"
        autocomplete="off"
        style="margin-top: 30px;"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editNodeVisible = false">取 消</el-button>
        <el-button type="primary" @click="editNodeVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      :title="nodeParentTitle"
      :visible.sync="addNodeVisible"
      style="text-align: left;"
    >
      <span>请编辑名称</span>
      <el-input
        v-model="nodeTitle"
        autocomplete="off"
        style="margin-top: 30px;"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNodeVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddNode">确 定</el-button>
      </div>
    </el-dialog>

    <el-drawer
      class="drawer"
      title="名称"
      :visible.sync="viewDrawer"
      @opened="openDrawer"
      size="40%"
    >
      <span>{{ nodeTitle }}</span>
      <el-form :model="infoForm" class="info-form" id="form">
        <el-form-item label="视频地址" label-position="top">
          <el-input v-model="infoForm.videoAddress" size="medium"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="editor" id="tree-editor"></div>
        </el-form-item>
      </el-form>
      <div class="drawer-primary-btn">
        <el-button type="primary" @click="drawerPrimaryBtn">确 定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// import Vue from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
export default {
  name: 'TheTree',

  props: {
    treeData: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      allowDragItem: true,
      addNodeText: '添加节',
      addMainNodeText: '添加章',
      editNodeVisible: false,
      addNodeVisible: false,
      nodeTitle: '',
      nodeParentTitle: '',
      viewDrawer: false,
      infoForm: {
        videoAddress: '',
      },
      quill: '',
    }
  },

  updated() {
    // this.$nextTick(() => {
    let nodes = document.getElementsByClassName('el-tree-node')

    //

    // function createDom(html) {
    //   let dom = document.createElement('div')
    //   dom.innerHTML = html
    //   return dom.childNodes[0]
    // }

    // let ele = createDom(newNode)
    // console.log('updated -> ele', ele)

    for (let i = 0; i < nodes.length; i++) {
      // debugger
      if (nodes[i].tabIndex == 0) {
        // let newNode = document.createElement('div')

        // // let  = document.createElement('div')
        // newNode.setAttribute('class', 'add-node')
        // newNode.innerText = 'testtest'
        // console.log(nodes[i])
        // let parent = nodes[i].parentNode

        let ele = document.createElement('div')
        ele.setAttribute('class', 'add-node')
        ele.setAttribute('id', `add_${i}`)
        ele.innerHTML = `
        <div  @click="addNode(item)>
        <el-button type="text" class="add-node-btn">
        {{ addNodeText }}</el-button>
        <i class="el-icon-circle-plus"></i>
        </div>`

        // createDom(ele)
        // console.log('updated -> ele', ele)

        nodes[i].appendChild(ele)
        console.log(nodes[i])
      }
    }
  },

  methods: {
    handleDragStart(node, ev) {
      console.log('handleDragStart -> ev', ev)
      console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('handleDragEnter -> ev', ev)
      console.log('handleDragEnter -> dropNode', dropNode)
      console.log('handleDragEnter -> draggingNode', draggingNode)
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('handleDragLeave -> ev', ev)
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('handleDragOver -> ev', ev)
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('handleDragEnd -> ev', ev)
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
      // this.allowDragItem = false;
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('handleDrop -> ev', ev)
      console.log('handleDrop -> dropType', dropType)
      console.log('handleDrop -> dropNode', dropNode)
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop(draggingNode, dropNode, type) {
      console.log(
        'allowDrop -> draggingNode, dropNode, type',
        draggingNode,
        dropNode,
        type
      )
      // if (dropNode.parent.id === 0) {
      //   return false;
      // } else {
      //   return type !== 'inner';
      // }
      return true
    },
    allowDrag() {
      return this.allowDragItem
    },

    handleCommand(e) {
      if (e.command === 'editNode') {
        this.nodeTitle = e.node.data.label
        this.editNodeVisible = true
      }

      if (e.command === 'viewNode') {
        this.nodeTitle = e.node.label
        this.viewDrawer = true
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

    insertAfter(newElement, targetElement) {
      console.log('insert -> refNode', targetElement)
      console.log('insert -> data', newElement)
      var parent = targetElement.parentNode //获取目标节点的父级标签
      if (parent.lastChild == targetElement) {
        //如果目标节点正好是最后一个节点，使用appendChild插入
        parent.appendChild(newElement)
      } else {
        parent.insertBefore(newElement, targetElement.nextSibling) //一般情况下要取得目标节点的下一个节点，再使用insertBefore()方法。
      }
    },

    addNode(node) {
      console.log('addNode -> node', node)
      this.nodeParentTitle = node.label
      this.addNodeVisible = true
    },

    handleAddNode(value) {
      console.log('kk', value)
      // this.nodeTitle = vavlue
    },

    drawerPrimaryBtn() {
      let tmp = this.quill.getContents()
      console.log('openDrawer -> tmp', tmp)
    },

    addMainNode() {
      console.log('添加章')
    },

    // handleClose(done) {
    //   //   this.$confirm('确认关闭？')
    //   //     .then((_) => {
    //   //       done()
    //   //     })
    //   //     .catch((_) => {})
    // },
  },
}
</script>

<style lang="less">
// .tree-component-container {
//   width: 50%;
//   padding: 10px;
//   background-color: #b3c0d1;

//   .tree-item-container {
//     margin-bottom: 20px;
//     padding: 10px 0 20px;
//     background-color: #fff;
//   }

//   .tree {
//     .el-tree-node__content {
//       height: 41px;
//     }

//     .tree-item {
//       position: relative;
//       width: 100%;
//       padding-left: 20px;
//       border-bottom: 1px solid #999;
//       line-height: 40px;
//       text-align: left;

//       &:hover {
//         .tree-item-icon {
//           display: block;
//         }
//       }

//       .tree-item-icon {
//         display: none;
//         position: absolute;
//         top: 12px;
//         left: -2px;
//       }

//       .tree-item-operation {
//         position: absolute;
//         right: 15px;
//         top: 3px;

//         .el-dropdown-link {
//           cursor: pointer;
//           color: #409eff;
//         }
//         .el-icon-arrow-down {
//           font-size: 12px;
//         }
//       }
//     }
//   }

//   .add-main-node {
//     height: 40px;
//     padding-right: 20px;
//     text-align: right;
//     background-color: #fff;
//   }

//   .add-node {
//     margin-right: 20px;
//     text-align: right;

//     .add-node-btn {
//       margin-right: 5px;
//     }
//   }

//   .drawer {
//     text-align: left;

//     .el-drawer__body {
//       padding: 0 20px;

//       .info-form {
//         margin-top: 30px;

//         .ql-editor {
//           min-height: 500px;
//         }
//       }
//     }
//   }
// }
</style>
