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
                    <p v-html="convertMarkdown(blog.context)" class="part"></p>
                </td>
            </tr>
        </table>
        <button class="btn btn-primary" v-if="!blog._id" @click="create()"><span>Create Blog</span></button>
        <button class="btn btn-primary" v-if="blog._id" @click="update()"><span>Update Blog</span></button>
    </div>
</template>

<script>
    import {Converter} from 'showdown';
    import {ApiService} from "../js/apiService";
    import * as _ from "lodash";

    let converter = new Converter({tables: true});
    let apiService = new ApiService();

    // converter.setFlavor('github');
    let author = "asa.x";

    export default {
        name: "blog-add",
        data: function () {
            return {
                blog: {
                    title: "blog-title",
                    context: "hello,world",
                    author: author,
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
                let vblog = this.$route.params.blog;
                if (vblog) {
                    Object.assign(this.blog, vblog);
                }
            },
            update() {
                let oldBlog = this.$route.params.blog;
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