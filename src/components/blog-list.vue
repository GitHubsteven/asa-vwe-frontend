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
  import {ApiService} from '../js/apiSerivce.js'

  const apiService = new ApiService();

  export default {
    name: "blog-list",
    data() {
      return {
        blogs: [],
        numberOfBlogs: 0
      }
    },
    methods: {
      getBlogs() {
        apiService.getBlogs().then((resp) => {
          this.blogs = resp;
          this.numberOfBlogs = resp.length;
        });
      }
    },
    mounted() {
      this.getBlogs();
    }
  }
</script>

<style scoped>

</style>