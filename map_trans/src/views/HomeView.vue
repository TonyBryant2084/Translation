<template>
  <div class="dashboard-container">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <!-- 头部 -->
      <el-header class="header" style="background-color: rgb(238, 241, 246)">
        <span style="font-size: 24px; font-weight: bold; color: #409eff"
          >旅译通后台管理系统</span
        >
      </el-header>

      <el-container>
        <!-- 侧边栏 -->
        <el-aside
          width="230px"
          style="border-right: 1px solid #eee; background-color: #fff"
        >
          <el-menu
            :default-openeds="['1']"
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#333"
            active-text-color="#409EFF"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>系统信息管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <router-link to="/" class="menu-link">首页</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/about" class="menu-link"
                    >信息管理</router-link
                  >
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- 主内容区 -->
        <el-main style="background-color: #f5f7fa; padding: 20px">
          <el-empty
            image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            description="欢迎来到后台管理系统"
          >
            <el-button type="primary" @click="onSubmit">开始使用</el-button>
          </el-empty>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      formInline: {
        user: "",
        region: "",
        address: "",
        data: [],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$router.push("/about");
    },
  },
  mounted() {
    // 发送异步请求,获取请求数据
    // axios.get('/api/data').then(response => {
    //   this.tableData = response.data;
    // });
  },
};
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-link {
  text-decoration: none;
  color: inherit;
}

.el-menu-vertical-demo {
  border-right: none;
}

.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-empty {
  text-align: center;
}

.el-button {
  margin-top: 20px;
}
</style>