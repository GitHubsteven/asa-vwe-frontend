<template>
    <div>
        <div>
            <el-container style="height: 100%; min-height: 700px">
                <el-header>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router
                             @select="handleSelect">
                        <el-menu-item index="/blog-list">
                            我的博客
                        </el-menu-item>
                        <el-menu-item index="/user-login" style="float: right">
                            登录
                        </el-menu-item>
                    </el-menu>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <div class="line"></div>
                <el-footer class="footer_context"><label>Asa.x, Just For Fun</label></el-footer>
            </el-container>
        </div>
    </div>
</template>

<script>
  import router from './router/index.js'

  export default {
    name: "App",
    components: {
      Navigator
    },
    data() {
      return {
        activeIndex: '/blog-list',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    router
  }
</script>

<style scoped>

</style>