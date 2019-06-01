<template>
    <div>
        <table>
            <tr>
                <td colspan="3">
                    <label> title:</label>
                    <label>
                        <input type="text" v-model="blog.title" style="width: 90%">
                    </label>
                </td>
            </tr>
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
        <button class="btn btn-primary" v-if="!blog.id" @click="create()"><span>Create Blog</span></button>
    </div>
</template>

<script>
    import {Converter} from 'showdown';
    import {ApiService} from "../js/apiService";

    let converter = new Converter({tables: true});
    let apiService = new ApiService();

    // converter.setFlavor('github');

    export default {
        name: "blog-add",
        data: function () {
            return {
                blog: {
                    title: "blog-title",
                    context: "hello,world",
                    id: null
                },
                contextInHtml: () => {
                    return converter.makeHtml(this.blog.context);
                },
            }
        },
        methods: {
            create() {
                this.blog.author = "asa.x";
                apiService.createBlog(this.blog).then(res => {
                    if (!res.id) {
                        window.alert("res:" + res.message);
                    } else {
                        console.log(res)
                    }
                })
            }
        }
    }
</script>

<style type="text/css" scoped>

</style>