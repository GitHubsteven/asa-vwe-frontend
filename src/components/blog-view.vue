<template>
    <div>
        <el-row>
            <el-col :span="10" :offset="8">
                <div class="grid-content bg-purple-dark">
                    <h3>{{this.blog.title}}</h3>
                    <el-tag type="info">{{this.blog.author}}</el-tag>
                    <el-tag type="info">{{this.blog.createTime}}</el-tag>
                    <hr/>
                    <el-input
                            type="textarea"
                            v-html="convertMarkdown(blog.context)"
                            maxlength="3000"
                            show-word-limit
                            :autosize="{ minRows: 50, maxRows: 300 }"
                    >
                    </el-input>
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

  const converter = new Converter({tables: true});

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
        })
      },
      convertMarkdown(context) {
        return converter.makeHtml(context);
      },

    },
    mounted() {
      this.init();
    }
  }
</script>
