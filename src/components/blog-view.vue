<template>
    <div>
        <el-row>
            <el-col :span="10" :offset="8">
                <div class="grid-content bg-purple-dark">
                    <h3>{{this.blog.title}}</h3>
                    <el-tag type="info">{{this.blog.author}}</el-tag>
                    <el-tag type="info">{{this.blog.createTime}}</el-tag>
                    <hr/>
                    <div v-html="this.blog.context"></div>
                </div>
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
  import * as _ from "lodash"

  const converter = new Converter();

  export default {
    name: "blog-view",
    data() {
      return {
        blog: {
          title: null,
          context: null,
          author: null,
          createTime: null
        }
      }
    },
    methods: {
      init() {
        let id = this.$route.query.blogId;
        if (!id) {
          this.$alert('没有id', '警告', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$message({
              //   type: 'info',
              //   message: `action: ${ action }`
              // });
              //do nothing!
            }
          });
        }
        apiService.viewBlog(id).then(resp => {
          console.log(resp);
          _.extend(this.blog, resp);
          this.blog.context = converter.makeHtml(resp.context);
        })
      },
    },
    mounted() {
      this.init();
    }
  }
</script>
