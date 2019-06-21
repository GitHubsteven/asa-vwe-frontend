关于如何使用tiny 兼容markdown语法，增加如下代码，支持部分markdown语法，不过因为tiny编辑文本有点
不懂，所以暂时就不写了。

```
<editor api-key="pv2xyp0kguup5ty64g3njspus29ll7pnipbex75ukahea5dc"
                        v-model="blog.context"
                        :init="{
                        plugins: 'textpattern',
                        textpattern_patterns: [
                             {start: '*', end: '*', format: 'italic'},
                             {start: '**', end: '**', format: 'bold'},
                             {start: '#', format: 'h1'},
                             {start: '##', format: 'h2'},
                             {start: '###', format: 'h3'},
                             {start: '####', format: 'h4'},
                             {start: '#####', format: 'h5'},
                             {start: '######', format: 'h6'},
                             {start: '1. ', cmd: 'InsertOrderedList'},
                             {start: '* ', cmd: 'InsertUnorderedList'},
                             {start: '- ', cmd: 'InsertUnorderedList'}
                          ]
                        }"
                ></editor>
```