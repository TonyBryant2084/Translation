<template>
  <div id="login">
    <!-- 背景容器 -->
    <div class="background">
      <div class="sakura" v-for="n in 30" :key="n"></div>
    </div>
    <el-container class="login-container">
      <el-card class="login-card">
        <h2 class="login-title">🌸 登录 / ログイン 🌸</h2>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          class="login-form"
        >
          <!-- 用户名输入 -->
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名 / ユーザー名を入力してください"
              class="form-input"
            ></el-input>
          </el-form-item>

          <!-- 密码输入 -->
          <el-form-item prop="password">
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
/* 背景动画容器 */
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fce4ec;
  overflow: hidden;
  z-index: -1;
}

/* 樱花飘落动画 */
.sakura {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/sakura.jpeg"); /* 使用高分辨率图片 */
  background-size: cover;
  background-position: center;
  image-rendering: crisp-edges;
  filter: brightness(1.1) contrast(1.1) saturate(1.2);
  opacity: 0.8;
  will-change: transform, opacity;
  animation: fall 10s linear infinite;
}

@keyframes fall {
  0% {
    transform: translateY(-100%) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
}

/* 随机设置位置和动画延迟 */
.sakura:nth-child(odd) {
  left: calc(100% * var(--pos));
  animation-duration: calc(5s + var(--delay) * 3s);
}

.sakura:nth-child(even) {
  left: calc(100% * var(--pos));
  animation-duration: calc(6s + var(--delay) * 3s);
}

/* 登录容器 */
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 卡片样式 */
.login-card {
  width: 400px;
  padding: 20px;
  background-color: #fffaf0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 标题 */
.login-title {
  text-align: center;
  color: #d81b60;
  font-size: 24px;
  margin-bottom: 20px;
}

/* 输入框样式 */
.form-input {
  width: 100%;
}

/* 登录按钮 */
.submit-btn {
  background-color: #d81b60;
  color: white;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #ad1457;
}

/* 注册链接 */
.register-link {
  text-align: center;
  margin-top: 10px;
}

.register-link a {
  color: #d81b60;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>