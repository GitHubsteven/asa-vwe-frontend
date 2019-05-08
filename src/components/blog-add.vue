<template>
    <div>
        <table>
            <tr>
                <td>
                    <label>
                        <textarea v-model="blog.context" class="part"></textarea>
                    </label>
                </td>
                <td><label><---简单的分割线----></label></td>
                <td>
                    <p v-html="this.contextInHtml()" class="part"></p>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
  import {Converter} from 'showdown';

  let converter = new Converter({table: true});

  converter.setFlavor('github');

  export default {
    name: "blog-add",
    data() {
      return {
        blog: {
          title: "blog-title",
          context: "hello,world"
        },
        contextInHtml: () => {
          let res = converter.makeHtml(this.blog.context);
          console.log(res);
          return res;
        }
      }
    }
  }
</script>

<style type="text/css" scoped>
    .part {
        display: inline-block;
        width: 500px;
        height: 1000px;
    }
</style>