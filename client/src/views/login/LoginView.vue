<template>
  <div id="login">
    <el-container class="login-container">
      <el-card class="login-card">
        <h2 class="login-title">登录 / ログイン</h2>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          class="login-form"
        >
          <!-- 用户名输入 -->
          <el-form-item prop="username">
            <div class="label-wrapper">
              <span class="label-text">用户名 / ユーザー名</span>
            </div>
            <el-input
              v-model="loginForm.username"
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
              v-model="loginForm.password"
              placeholder="请输入密码 / パスワードを入力してください"
              class="form-input"
            ></el-input>
          </el-form-item>

          <!-- 登录按钮 -->
          <el-form-item class="submit-wrapper">
            <el-button
              type="primary"
              @click="submitForm('loginForm')"
              class="submit-btn"
              >登录 / ログイン</el-button
            >
          </el-form-item>

          <!-- 注册链接 -->
          <el-form-item class="register-link">
            <span>没有账号？</span>
            <router-link to="/register">注册 / 登録</router-link>
          </el-form-item>
        </el-form>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名 / ユーザー名を入力してください",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              const regex = /^[a-zA-Z0-9]{3,10}$/;
              if (!regex.test(value)) {
                callback(
                  new Error(
                    "用户名应为3-10位字母或数字 / ユーザー名は3〜10文字の英数字である必要があります"
                  )
                );
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码 / パスワードを入力してください",
            trigger: "blur",
          },
          {
            min: 6,
            message:
              "密码长度不能少于6位 / パスワードは6文字以上で入力してください",
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
          this.login();
        } else {
          console.log("表单验证失败 / フォーム検証に失敗しました");
          return false;
        }
      });
    },
    login() {
      const { username, password } = this.loginForm;
      axios
        .post("http://127.0.0.1:80/api/login", {
          username,
          password,
        })
        .then((response) => {
          if (response.data.status === 0) {
            this.$message.success("登录成功 / ログイン成功");
            localStorage.setItem("token", response.data.token); // 存储 Token
            this.$router.push("/");
          } else {
            this.$message.error(response.data.msg || "登录失败 / ログイン失敗");
          }
        })
        .catch((error) => {
          console.error("登录请求出错 / ログインリクエストエラー:", error);
          this.$message.error(
            "登录请求出错，请稍后重试 / ログインリクエストエラー、後で再試行してください"
          );
        });
    },
  },
};
</script>

<style scoped>
/* 容器样式 */
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f6f9;
}

/* 卡片样式 */
.login-card {
  width: 420px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 标题 */
.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
  color: #303133;
}

/* 标签与输入框排列 */
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

/* 输入框样式 */
.form-input {
  flex: 1;
  width: 100%;
  min-width: 240px;
}

/* 登录按钮 */
.submit-btn {
  width: 100%;
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  border-radius: 4px;
  font-size: 16px;
  padding: 10px 0;
  margin-top: 10px;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #66b1ff;
}

/* 注册链接 */
.register-link {
  text-align: center;
  margin-top: 10px;
}

.register-link span {
  font-size: 14px;
  color: #606266;
}

.register-link a {
  color: #409eff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
