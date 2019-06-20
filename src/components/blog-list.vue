<template>
    <div style="margin-top: 1%">
        <el-row>
            <el-col :span="3">
                <div class="grid-content bg-purple">
                    <p>Asa.x</p>
                </div>
            </el-col>
            <el-col :span="21">
                <el-row>
                    <el-col :span="3">
                        <div>
                            <router-link to="/blog-add">
                                <el-button type="primary">增加博客</el-button>
                            </router-link>
                        </div>
                    </el-col>

                    <el-col :span="5" :offset="11">
                        <div>
                            <el-input placeholder="请输入内容" v-model="searchTitle">
                                <template slot="prepend">博客名称</template>
                                <el-button slot="append" icon="el-icon-search" @click="searchBlogs()"></el-button>
                            </el-input>
                        </div>
                    </el-col>

                </el-row>

                <div class="grid-content bg-purple-light">
                    <div v-for="blog in blogs" v-bind:key="blog.id">
                        <el-card class="box-card" body-style="{ padding: '10px',margin-top:10px }">
                            <div slot="header" class="clearfix">
                                <el-link type="primary" @click="detail(blog)">{{blog.title}}</el-link>
                                <el-button style="float: right; padding: 3px 2px;color: red" type="text"
                                           @click="del(blog)">
                                    <i class="el-icon-delete"></i>
                                </el-button>
                                <el-button style="float: right; padding: 3px 2px;" type="text" @click="update(blog)">
                                    <i class="el-icon-edit"></i>
                                </el-button>
                            </div>
                            <div class="text item">
                                {{createSyllabus(blog.context)}}
                            </div>
                            <div class="text item">
                                <el-tag type="info">测试</el-tag>
                                <el-tag type="info">{{blog.author}}</el-tag>
                                <el-tag type="info">{{blog.createTime}}</el-tag>
                            </div>
                        </el-card>
                    </div>
                </div>
                <el-row style="margin-top: 0.5%">
                    <el-col :span="5" :offset="13">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage4"
                                :page-sizes="[10, 20, 50]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="blogNumber">
                        </el-pagination>
                    </el-col>
                </el-row>
            </el-col>
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
        blogNumber: 0,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        searchTitle: null
      }
    },
    //定义方法
    methods: {
      getBlogs() {
        //调用接口获取数据，并且更新vue页面数据
        apiService.getBlogs().then((resp) => {
          this.blogs = resp;
          this.blogNumber = resp.length;
        });
      },
      convertMarkdown(context) {
        return converter.makeHtml(context);
      },
      //生成摘要
      createSyllabus(markdown) {
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
          query: {
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
          query: {
            blog: JSON.stringify(blog)
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      searchBlogs() {
        window.alert("search and update blogs!");
      }
    },
    //在vue被渲染的时候调用方法
    mounted() {
      this.getBlogs();
    }
  }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 79%;
        margin-top: 10px;
    }
</style>