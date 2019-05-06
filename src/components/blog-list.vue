<template>
    <div>
        <table>
            <thead>
            <tr>
                <th>title</th>
                <th>context</th>
                <th>author</th>
                <th>createTime</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="blog in blogs" v-bind:key="blog.id">
                <td>{{blog.title}}</td>
                <td>{{blog.context}}</td>
                <td>{{blog.author}}</td>
                <td>{{blog.createTime}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    //引入接口辅助类
  import {ApiService} from '../js/apiSerivce.js'
    //定义一个对象
  const apiService = new ApiService();

  export default {
    name: "blog-list",
    data() {
      return {
        blogs: [],
        numberOfBlogs: 0
      }
    },
      //定义方法
    methods: {
      getBlogs() {
          //调用接口获取数据，并且更新vue页面数据
        apiService.getBlogs().then((resp) => {
          this.blogs = resp;
          this.numberOfBlogs = resp.length;
        });
      }
    },
      //在vue被渲染的时候调用方法
    mounted() {
      this.getBlogs();
    }
  }
</script>

<style scoped>

</style>