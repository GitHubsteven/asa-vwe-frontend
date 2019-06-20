<template>
    <div>
        <el-row>
            <el-col :span="23" :offset="1">
                <div>
                    <el-input placeholder="名称" v-model="blog.title">
                        <template slot="prepend">名称</template>
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-col :span="10" :offset="1" id="editor">
                <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="blog.context"
                        maxlength="3000"
                        show-word-limit
                        :autosize="{ minRows: 50, maxRows: 300 }"
                >
                </el-input>
            </el-col>
            <el-col :span="10" :offset="1" id="shower">
                <el-input
                        type="textarea"
                        v-html="convertMarkdown(blog.context)"
                        maxlength="3000"
                        show-word-limit
                        :autosize="{ minRows: 50, maxRows: 300 }"
                >
                </el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-col :span="23" :offset="1">
                <el-button type="primary" v-if="!blog._id" @click="create()">Create</el-button>
                <el-button type="primary" v-if="blog._id" @click="update()">Update</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import {Converter} from 'showdown';
  import {ApiService} from "../js/apiService";
  import * as _ from "lodash";

  let converter = new Converter({tables: true});
  let apiService = new ApiService();

  let blogTmp = {};
  export default {
    name: "blog-add",
    data: function () {
      return {
        blog: {
          title: null,
          context: null,
          author: null,
          createTime: null,
          id: null
        },
      }
    },
    methods: {
      create() {
        apiService.createBlog(this.blog).then(res => {
          if (!res._id) {
            window.alert("res:" + res.message);
          } else {
            //页面跳转
            this.$router.push({
              path: '/blog-list',
              name: 'BlogList'
            })
          }
        })
      },
      convertMarkdown(context) {
        return converter.makeHtml(context);
      },

      init() {
        blogTmp = JSON.parse(this.$route.query.blog);
        if (blogTmp) {
          Object.assign(this.blog, blogTmp);
        }
      },
      update() {
        let oldBlog = blogTmp;
        if (oldBlog.title === this.blog.title
          && oldBlog.context === this.blog.context
          && oldBlog.author === this.blog.author) {
          window.alert("there is no change!");
          return;
        }
        apiService.update(this.blog).then((resp) => {
          if (!resp) {
            window.alert("update failed!");
          }
          this.$router.push({
            path: '/blog-view',
            name: 'BlogView',
            params: {
              blogId: oldBlog._id
            }
          })
        }, (error) => {
          console.log(error);
          window.alert("update failed!");
        });
      },
    },
    mounted() {
      this.init()
    }
  }
</script>

<style type="text/css" scoped>

</style>