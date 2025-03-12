<template>
  <div id="register">
    <!-- 背景容器 -->
    <div class="background">
      <div class="sakura" v-for="n in 30" :key="n"></div>
    </div>
    <el-container class="register-container">
      <el-card class="register-card">
        <h2 class="register-title">🌸 注册 / 登録 🌸</h2>
        <el-form
          :model="registerForm"
          :rules="rules"
          ref="registerForm"
          class="register-form"
        >
          <!-- 用户名输入 -->
          <el-form-item prop="username">
            <el-input
              v-model="registerForm.username"
              placeholder="请输入用户名 / ユーザー名を入力してください"
              class="form-input"
            ></el-input>
          </el-form-item>

          <!-- 密码输入 -->
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="registerForm.password"
              placeholder="请输入密码 / パスワードを入力してください"
              class="form-input"
            ></el-input>
          </el-form-item>

          <!-- 确认密码输入 -->
          <el-form-item prop="confirmPassword">
            <el-input
              type="password"
              v-model="registerForm.confirmPassword"
              placeholder="请再次输入密码 / パスワードを再度入力してください"
              class="form-input"
            ></el-input>
          </el-form-item>

          <!-- 邮箱输入 (可选) -->
          <el-form-item prop="email">
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

          <!-- 登录链接 -->
          <el-form-item class="login-link">
            <span>已有账号？</span>
            <router-link to="/login">登录 / ログイン</router-link>
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

/* 注册容器 */
.register-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 卡片样式 */
.register-card {
  width: 400px;
  padding: 20px;
  background-color: #fffaf0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 标题 */
.register-title {
  text-align: center;
  color: #d81b60;
  font-size: 24px;
  margin-bottom: 20px;
}

/* 输入框样式 */
.form-input {
  width: 100%;
}

/* 注册按钮 */
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

/* 登录链接 */
.login-link {
  text-align: center;
  margin-top: 10px;
}

.login-link a {
  color: #d81b60;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>