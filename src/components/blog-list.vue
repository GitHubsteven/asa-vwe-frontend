<template>
    <div>
        <el-row>
            <el-col :span="12"><div class="grid-content bg-purple">
                <p>A placeholder</p>
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <table>
                    <thead>
                    <tr>
                        <th>title</th>
                        <th>context</th>
                        <th>author</th>
                        <th>createTime</th>
                        <th>operate</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="blog in blogs" v-bind:key="blog.id">
                        <td>{{blog.title}}</td>
                        <td>{{convert2PlainText(blog.context)}}</td>
                        <td>{{blog.author}}</td>
                        <td>{{blog.createTime}}</td>
                        <td>
                            <button @click="detail(blog)">Detail</button>
                            <button @click="del(blog)">Delete</button>
                            <button @click="update(blog)">Update</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div></el-col>
        </el-row>

    </div>
</template>

<script>
  //引入接口辅助类
  import {ApiService} from '../js/apiService.js'
  //定义一个对象
  const apiService = new ApiService();
  import {Converter} from 'showdown';

  let converter = new Converter({tables: true});
  // import {ApiService as apiService} from "../js/apiSerivce";

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
          console.log(resp);
          this.blogs = resp;
          this.numberOfBlogs = resp.length;
        });
      },
      convertMarkdown(context) {
        return converter.makeHtml(context);
      },
      //增加预览功能
      convert2PlainText(markdown) {
        let wrapper = document.createElement("div");
        wrapper.innerHTML = converter.makeHtml(markdown);
        let text = wrapper.innerText;
        let limit = text.length < 100 ? text.length : 100;
        return text.substr(0, limit) + "...";
      },
      detail(blog) {
        this.$router.push({
          path: '/blog-view',
          name: 'BlogView',
          params: {
            blogId: blog._id
          }
        })
      },
      del(blog) {
        apiService.delBlog(blog._id).then(resp => {
          if (resp) {
            this.getBlogs();
          } else {
            window.alert("blank resp");
          }
        })
      },
      update(blog) {
        this.$router.push({
          path: "/blog-add",
          name: "BlogAdd",
          params: {
            blog: blog
          }
        })
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