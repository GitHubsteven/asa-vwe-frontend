<template>
    <div>
        <el-card class="box-card" body-style="{ padding: '5px',margin-top:10px }"
                 style="margin-top: 10px;">
            <div class="text item">
                <strong>{{commentObj.author}}:</strong> {{commentObj.context}}
                <el-tag type="info">{{commentObj.createTime == null ? "null" :commentObj.createTime.substring(0,19)}}
                </el-tag>
                <el-button v-show="commentObj.subComments !=null && commentObj.subComments.length>0"
                           style="float: right; padding: 3px 2px;"
                           type="text"
                           @click="getRefComments()">
                    已引用评论
                </el-button>
                <blog-comment v-for="ele in commentObj.subComments" v-bind:key="ele.author" v-bind:commentObj="ele"></blog-comment>
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
            </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "blog-comment",
    props: {
      commentObj: {
        author: "asa.x",
        createTime: "2019-06-24 13:14:15",
        subComments: []
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
      }
    }
  }
</script>

<style scoped>

</style>