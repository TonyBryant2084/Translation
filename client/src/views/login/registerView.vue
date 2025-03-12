<template>
  <div id="register">
    <el-container class="register-container">
      <el-card class="register-card">
        <h2 class="register-title">注册 / 登録</h2>
        <el-form
          :model="registerForm"
          :rules="rules"
          ref="registerForm"
          class="register-form"
        >
          <!-- 用户名输入 -->
          <el-form-item prop="username">
            <div class="label-wrapper">
              <span class="label-text">用户名 / ユーザー名</span>
            </div>
            <el-input
              v-model="registerForm.username"
              placeholder="请输入用户名 / ユーザー名を入力してください"
              class="form-input"
            ></el-input>
          </el-form-item>

          <!-- 密码输入 -->
          <el-form-item prop="password">
            <div class="label-wrapper">
              <span class="label-text">密码 / パスワード</span>
            </div>
            <el-input
              type="password"
              v-model="registerForm.password"
              placeholder="请输入密码 / パスワードを入力してください"
              class="form-input"
            ></el-input>
          </el-form-item>

          <!-- 确认密码输入 -->
          <el-form-item prop="confirmPassword">
            <div class="label-wrapper">
              <span class="label-text">确认密码 / パスワード確認</span>
            </div>
            <el-input
              type="password"
              v-model="registerForm.confirmPassword"
              placeholder="请再次输入密码 / パスワードを再度入力してください"
              class="form-input"
            ></el-input>
          </el-form-item>

          <!-- 邮箱输入 (可选) -->
          <el-form-item prop="email">
            <div class="label-wrapper">
              <span class="label-text">邮箱 / メール</span>
            </div>
            <el-input
              v-model="registerForm.email"
              placeholder="请输入邮箱 / メールアドレスを入力してください"
              class="form-input"
            ></el-input>
          </el-form-item>

          <!-- 注册按钮 -->
          <el-form-item class="submit-wrapper">
            <el-button
              type="primary"
              @click="submitForm('registerForm')"
              class="submit-btn"
              >注册 / 登録</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterView",
  data() {
    // 密码验证规则
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码 / パスワードを入力してください"));
      } else if (value.length < 6 || value.length > 12) {
        callback(new Error("密码长度必须在6到12位之间"));
      } else {
        callback();
      }
    };

    // 确认密码验证规则
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error("两次输入的密码不一致 / パスワードが一致しません"));
      } else {
        callback();
      }
    };

    return {
      registerForm: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        email: [
          {
            type: "email",
            message:
              "请输入有效的邮箱地址 / 有効なメールアドレスを入力してください",
            trigger: ["blur", "change"],
          },
        ],
        username: [
          {
            required: true,
            message: "请输入用户名 / ユーザー名を入力してください",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "用户名长度为3到10个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
        confirmPassword: [
          {
            required: true,
            validator: validateConfirmPassword,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register();
        }
      });
    },
    register() {
      axios
        .post("http://127.0.0.1:80/api/register", this.registerForm)
        .then((response) => {
          if (response.data.status == 0) {
            this.$message.success("注册成功 / 登録成功");
            this.$router.push("/");
          } else {
            this.$message.error(
              response.data.msg || "注册失败 / 登録に失敗しました"
            );
          }
        })
        .catch((error) => {
          console.error("登录请求出错 / ログインリクエストエラーです:" + error);
          this.$message.error(
            "登录请求出错，请稍后重试 / ログインリクエストにエラーがありましたので、後ほどリトライしてください"
          );
        });
    },
  },
};
</script>

<style scoped>
/* 容器样式 */
.register-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 表单卡片 */
.register-card {
  width: 420px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 标题 */
.register-title {
  text-align: center;
  margin-bottom: 20px;
}

/* 标签和输入框排列 */
.label-wrapper {
  display: flex;
  align-items: center;
  min-width: 140px;
}

.label-text {
  white-space: nowrap;
  font-size: 14px;
  color: #606266;
}

/* 输入框统一宽度 */
.form-input {
  flex: 1;
  width: 100%;
  min-width: 240px;
}

/* 按钮样式 */
.submit-btn {
  width: 100%;
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  margin-top: 10px;
}

/* 提交按钮容器 */
.submit-wrapper {
  display: flex;
  justify-content: center;
}
</style>
