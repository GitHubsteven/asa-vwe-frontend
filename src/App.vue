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
                        <el-menu-item v-if="!$store.state.username" index="/user-login" style="float: right">
                            登录
                        </el-menu-item>
                        <el-menu-item v-if="$store.state.username" style="float: right">
                            <span><strong style="color: black">{{$store.state.username}}</strong></span>
                            <el-link @click="loginOut()">退出</el-link>
                        </el-menu-item>
                    </el-menu>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <div class="line">
                    <br>
                </div>
                <el-footer class="footer_context"><label>~~~~~~~~~~~~~~~~~~~飘啊飘啊飘~~~~~~~~~~~~~~~~~~~~~~~</label>
                </el-footer>
            </el-container>
        </div>
    </div>
</template>

<script>
  import router from './router/index.js'
  import {UserService} from "./js/userService";

  let userService = new UserService();

  export default {
    name: "App",
    components: {
      Navigator
    },
    data() {
      return {
        activeIndex: '/blog-list',
        username: ""
      };
    },
    created() {
      let userStr = localStorage.getItem("user");
      let userBean = JSON.parse(userStr);
      if (userBean) {
        this.$store.commit("setUser", {"username": userBean.name, "email": userBean.email})
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      loginOut() {
        alert("确定要退出吗？");
        this.$store.commit("setUser", {"username": null, "email": null});
        localStorage.removeItem("user")
      },
    },
    router
  }
</script>

<style scoped>

</style>