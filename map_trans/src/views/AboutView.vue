<template>
  <div class="dashboard-container">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <!-- 头部 -->
      <el-header class="header">
        <span class="header-title">旅译通后台管理系统</span>
      </el-header>

      <el-container>
        <!-- 侧边栏 -->
        <el-aside class="sidebar">
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
                  <router-link to="/about" class="menu-link">信息管理</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- 主内容区 -->
        <el-main class="main-content">
          <!-- 表单 -->
          <el-form :inline="true" :model="formInline" class="search-form">
            <el-form-item label="姓名">
              <el-input
                v-model="formInline.user"
                placeholder="请输入姓名"
                clearable
              />
            </el-form-item>
            <el-form-item label="性别">
              <el-select
                v-model="formInline.gender"
                placeholder="请选择性别"
                clearable
              >
                <el-option label="男" value="male" />
                <el-option label="女" value="female" />
              </el-select>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                v-model="formInline.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>

          <!-- 表格 -->
          <el-table :data="pagedData" border stripe class="data-table">
            <el-table-column prop="username" label="用户名" width="120" />
            <el-table-column prop="user_pic" label="图片" width="120">
              <template slot-scope="scope">
                <img
                  v-if="scope.row.user_pic"
                  :src="scope.row.user_pic"
                  alt="用户图片"
                  style="width: 50px; height: 50px; border-radius: 50%"
                />
                <span v-else>无图片</span>
              </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="120">
              <template slot-scope="scope">
                {{ scope.row.nickname || "无昵称" }}
              </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="120">
              <template slot-scope="scope">
                {{ scope.row.gender || "未知" }}
              </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
              <template slot-scope="scope">
                {{ scope.row.email || "无邮箱" }}
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-pagination
            class="pagination"
            background
            layout="sizes, prev, pager, next, jumper"
            :total="total"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "@/api/axios";

export default {
  data() {
    return {
      allData: [], // 所有的数据
      tableData: [], // 表格显示的数据
      formInline: {
        user: "", // 姓名
        gender: "", // 性别
        date: [], // 日期范围
      },
      total: 0, // 总条数
      pageSize: 5, // 每页条数
      currentPage: 1, // 当前页数
    };
  },
  computed: {
    // 计算分页数据
    pagedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.allData.slice(start, end); // 获取当前页的数据
    },
  },
  methods: {
    // 查询方法
    onSubmit() {
      // 这里可以添加查询逻辑
      console.log("查询条件:", this.formInline);
    },
    // 分页大小改变
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    },
    // 当前页改变
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData(page);
    },
    // 获取数据
    async fetchData() {
      try {
        const response = await axios.get("http://127.0.0.1:80/my/show", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.status === 0) {
          this.allData = response.data.data; // 存储所有数据
          this.total = this.allData.length; // 总条数
          this.tableData = this.pagedData; // 获取当前页的数据
        } else {
          console.error("获取数据失败:", response.data.msg);
        }
      } catch (error) {
        console.error("请求失败:", error);
      }
    },
  },
  async mounted() {
    this.fetchData();
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
  background-color: rgb(238, 241, 246);
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-title {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
}

.sidebar {
  border-right: 1px solid #eee;
  background-color: #fff;
}

.main-content {
  background-color: #f5f7fa;
  padding: 20px;
}

.search-form {
  margin-bottom: 20px;
}

.data-table {
  width: 100%;
  margin-bottom: 20px;
}

.pagination {
  text-align: right;
  margin-top: 20px;
}

.menu-link {
  text-decoration: none;
  color: inherit;
}
</style>
