<template>
    <div>
        <div>
            <el-container style="height: 100%; min-height: 700px">
                <el-header>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                             @select="handleSelect">
                        <el-menu-item index="1">
                            <router-link to="/blog-list">我的博客</router-link>
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
        activeIndex: '1',
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