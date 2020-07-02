<template>
  <div class="info-container">
    <div class="container-header">
      <span class="form-title">| 基本信息</span>
      <el-button
        :type="editting ? 'success' : 'primary'"
        class="edit-form"
        @click="editStatusChange"
        >{{ editBtnText }}</el-button
      >
    </div>
    <el-form
      class="create-form"
      ref="form"
      :model="form"
      label-width="80px"
      label-position="top"
      :disabled="!editting"
    >
      <el-form-item
        v-for="item in formInputItems"
        :key="item.name"
        :label="item.label"
        :style="item.style"
      >
        <el-input
          v-model="form[item.name]"
          @input="inputChange"
          size="medium"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程封面" class="course-cover">
        <el-upload
          class="uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="cover" />
          <i v-else class="el-icon-plus uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="course-status" v-if="statusParams" label="状态">
        <el-switch
          v-model="form.status"
          :active-text="statusParams.activeText"
          :inactive-text="statusParams.inactiveText"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TheFormInfo',

  props: {
    formInputItems: {
      type: Array,
      default: () => [],
    },

    statusParams: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      editBtnText: '修改',
      editting: false,
      form: {},
      imageUrl: '',
    }
  },

  created() {
    let form = { ...this.$store.state.editForm }

    if (form.status == 0) {
      form.status = false
    } else if (form.status == 1) {
      form.status = true
    }

    this.form = form
  },

  methods: {
    inputChange(e, name) {
      console.log('inputChange -> name', name)
      console.log('inputChange -> e', e)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    editStatusChange() {
      if (!this.editting) {
        this.editting = true
        this.editBtnText = '保存'
      } else {
        console.log('保存')
        this.editting = false
        this.editBtnText = '修改'
      }
    },
  },
}
</script>

<style lang="less" scoped>
.info-container {
  width: 40%;

  .container-header {
    text-align: left;

    .form-title {
      font-size: 24px;
    }

    .edit-form {
      float: right;
    }
  }

  .create-form {
    margin-top: 30px;
    text-align: left;

    .course-name,
    .course-subtitle {
      display: inline-block;
      width: 300px;
    }

    .course-name {
      margin-right: 30px;
    }

    .course-cover {
      display: inline-block;
      vertical-align: top;
      width: 180px;

      .uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        &:hover {
          border-color: #409eff;
        }

        .uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .cover {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
    }

    .course-status {
      display: inline-block;
      vertical-align: top;
      margin-left: 100px;
    }
  }
}
</style>
