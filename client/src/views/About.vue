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
              <el-input v-model="formInline.user" placeholder="请输入姓名" clearable />
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="formInline.region" placeholder="请选择性别" clearable>
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
          <el-table :data="tableData" border stripe class="data-table">
            <el-table-column prop="name" label="姓名" width="120" />
            <el-table-column prop="gender" label="性别" width="120" />
            <el-table-column prop="date" label="日期" width="140" />
            <el-table-column prop="address" label="地址" />
          </el-table>

          <!-- 分页 -->
          <el-pagination
            class="pagination"
            background
            layout="sizes, prev, pager, next, jumper"
            :total="1000"
            :page-size="10"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [], // 表格数据
      formInline: {
        user: '', // 姓名
        region: '', // 性别
        date: [], // 日期范围
      },
    };
  },
  methods: {
  },
  async mounted() {
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