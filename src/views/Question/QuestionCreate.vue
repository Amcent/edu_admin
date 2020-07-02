<template>
  <div class="page-main-container">
    <div class="page-main-content">
      <el-row :gutter="20" class="create-form-container">
        <el-col :span="12">
          <div class="create-header-container">
            <span class="create-header">| 基本信息</span>
          </div>
          <el-form class="create-form" :model="form" label-position="top" size="medium" v-loading="loading">
            <el-row justify="center" :gutter="20">
              <el-col>
                <el-form-item label="题目:">
                  <el-input v-model="form.stem"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="技能:">
                  <el-select v-model="form.ability_id" placeholder="请选择">
                    <el-option v-for="item in abilities" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="等级:">
                  <el-select v-model="form.level" placeholder="请选择">
                    <el-option v-for="item in levels" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="选项:">
                  <el-row class="question-options" v-for="(item, index) in form.option" :key="index">
                    <el-input v-model="form.option[index]"></el-input>
                    <i class="el-icon-close" @click="delOption(index)"></i>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item>
                  <el-button plain v-if="form.option && form.option.length < 4" @click="addOption">
                    +
                  </el-button>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item>
                  <el-row>
                    <el-radio v-model="form.answer" v-for="(item, index) in form.option" :key="index"
                      :label="index + 1">
                      {{ answers[index] }}</el-radio>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item class="create-form-btn">
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button @click="goBackQuestion">取消</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import questionService from "@/global/service/question";
import abilityService from "@/global/service/ability";

export default {
  name: "QuestionCreate",

  data() {
    return {
      form: {
        stem: "",
        ability_id: null,
        level: null,
        option: ["", "", ""],
        answer: ""
      },
      answers: {
        0: "A",
        1: "B",
        2: "C",
        3: "D"
      },
      imageUrl: "",
      loading: true,
      abilities: [],
      levels: [
        {
          value: 1,
          label: "入门"
        },
        {
          value: 2,
          label: "初阶"
        },
        {
          value: 3,
          label: "中阶"
        },
        {
          value: 4,
          label: "高阶"
        }
      ]
    };
  },

  created() {
    this.handleGetAbilities();
  },

  methods: {
    handleGetAbilities() {
      abilityService
        .index()
        .then(res => {
          this.abilities = res.abilities;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    onSubmit() {
      let form = { ...this.form };
      form.option = JSON.stringify(form.option);

      this.loading = true;
      questionService
        .create(form)
        .then(() => {
          this.$message({
            message: "创建成功",
            type: "success"
          });

          this.$router.push({ path: "/question" });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    goBackQuestion() {
      this.$router.go(-1);
    },

    delOption(index) {
      this.form.option.splice(index, 1);
    },

    addOption() {
      this.form.option.push("");
    }
  }
};
</script>

<style lang="less" scoped>
.question-options {
  position: relative;
  margin-top: 10px;

  .el-icon-close {
    position: absolute;
    top: 12px;
    right: -22px;

    &:hover {
      color: #409eff;
    }
  }
}
</style>
