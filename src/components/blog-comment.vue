<template>
    <div>
        <el-card class="box-card" body-style="{ padding: '5px',margin-top:10px }"
                 style="margin-top: 10px;">
            <div class="text item">
                <div>
                    <strong>{{commentObj.author}}:</strong> {{commentObj.context}}
                    <el-tag type="info">{{commentObj.createTime == null ? "null"
                        :commentObj.createTime.substring(0,19)}}
                    </el-tag>
                </div>
                <el-button style="float: right; padding: 3px 2px;color: red" type="text"
                           @click="reportComment()">
                    举报
                </el-button>
                <el-button style="float: right; padding: 3px 2px;color: red" type="text"
                           @click="delComment()">
                    删除
                </el-button>
                <el-button style="float: right; padding: 3px 2px;" type="text"
                           @click="refComment()">
                    引用
                </el-button>
                <el-button
                        v-show="commentObj.subComments !=null && commentObj.subComments.length>0"
                        style="float: right; padding: 3px 2px;"
                        type="text"
                        @click="isShowAttachComments = !isShowAttachComments">
                    已引用评论
                </el-button>
                <div v-show="isShowAttachComments">
                    <blog-comment v-for="ele in commentObj.subComments" v-bind:key="ele.author"
                                  v-bind:commentObj="ele"></blog-comment>
                </div>
                <el-dialog title="评论区" :visible.sync="commentFormVisible">
                    <el-form :model="comment" ref="dynamicValidateForm" label-width="60px"
                             label-position="left" class="demo-dynamic" id="comment">
                        <div>
                            <el-tag type="info">回复<span class="el-icon-caret-right"></span>
                                {{commentObj.author}}
                            </el-tag>
                            <p>{{commentObj.context}}</p>
                        </div>
                        <el-form-item
                                prop="email"
                                label="邮箱"
                                :rules="[
                          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ]"
                        >
                            <el-input v-model="comment.email"></el-input>
                        </el-form-item>
                        <el-form-item
                                label="评论"
                                prop="context"
                                :rules="{
                          required: true, message: '评论不能为空', trigger: 'blur'
                        }"
                        >
                            <el-input v-model="comment.context"
                                      type="textarea"
                                      rows="5"
                                      max-length="300"
                                      show-word-limit
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitComment(comment)">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script>
  import {AxiosService} from "../js/axiosService";

  let axiosService = new AxiosService();

  export default {
    name: "blog-comment",
    props: {
      commentObj: {
        author: "asa.x",
        createTime: "2019-06-24 13:14:15",
        context: null,
        subComments: []
      }
    },
    data() {
      return {
        isShowAttachComments: false,
        commentFormVisible: false,
        comment: {
          email: null,
          context: null
        }
      }
    },
    methods: {
      getRefComments() {
      },
      reportComment() {
      },
      delComment() {
      },
      refComment() {
        this.commentFormVisible = true;
      },
      submitComment() {
        window.alert("提交代码");
      }
    }
  }
</script>

<style scoped>

</style>