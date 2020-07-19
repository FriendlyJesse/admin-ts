<template>
  <section class="login-form">
    <h4 class="title">
      登录
    </h4>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item prop="user">
        <el-input
          v-model="ruleForm.user"
          prefix-icon="iconfont iconuser"
          placeholder="账号"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          prefix-icon="iconfont iconpassword"
          placeholder="密码"
        />
      </el-form-item>
      <el-form-item class="submit">
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >
          提交
        </el-button>
      </el-form-item>
      <p class="forget">
        忘记密码？
      </p>
    </el-form>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form';

@Component
export default class LoginForm extends Vue {

  ruleForm = {
    user: '',
    password: ''
  }
  rules = {
    user: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]
  }

  submitForm (formName: string) {
    (this.$refs[formName] as ElForm).validate((valid) => {
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
  .title {
    margin-bottom: 40px;
    text-align: center;
    font-size: 24px;
  }
  ::v-deep .el-input {
    padding-left: 25px;
    height: 48px;
    width: 100%;
    border-radius: 4px;
    line-height: 48px;
    letter-spacing: 0.5px;
    background-color: #1f2029;
    
    border: none;
    box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
    &__inner {
      color: #c4c3ca;
      font-size: 14px;
      font-weight: 500;
      transition: all 200ms linear;
      background: none;
      border: none;
    }
    &__prefix {
      left: 18px;
      .iconfont {
        font-size: 24px;
        color: #ffeba7;
      }
    }
  }
  .el-form-item__error {
    color: #f922df;
  }
  .submit {
    text-align: center;
    .el-button {
      height: 44px;
      padding: 0 30px;
      color: #102770;
      background: #ffeba7;
      border-color: #ffeba7;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 1px;
      box-shadow: 0 8px 24px 0 rgba(255, 235, 167, .2);
      &:hover {
        color: #fff;
        box-shadow: 0px 0px 20px 10px rgba(255, 235, 255, 0.2);;
      }
    }
  }
  .forget {
    text-align: center;
    margin-top: 24px;
    color: #c4c3ca;
  }
</style>