<%--
  Created by IntelliJ IDEA.
  User: zjbman
  Date: 2018/3/22
  Time: 20:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>

<%-- 以下两个都可用--%>
<%--<script src="https://unpkg.com/vue"></script>--%>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>

<%-- div的内容放在之间，
放在头script，则会缓慢加载message；
放在尾script后面，则无法加载message--%>
<div id="app">
    <p>{{message}}</p>
</div>

<div id="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>

<div id="app-3">
    <p v-if="seen">现在你看到我了</p>
</div>

<div id="app-4">
    <ol>
        <li v-for="todo in todos">
            {{todo.text}}
        </li>
    </ol>
</div>

<div id="app-5">
    <p>{{message}}</p>
    <button v-on:click='reverseMessage'>逆转消息</button>
</div>

<div id="app-6">
    <p>{{message}}</p>
    <input v-model="message">
</div>




<script>

    var app = new Vue({
        el:'#app',
        data:{
            message:'Hello Vue.js!'
        }
    });

    var app2 = new Vue({
        el: '#app-2',
        data: {
            message: '页面加载于 ' + new Date().toLocaleString()
        }
    });

    var app3 = new Vue({
       el:'#app-3',
       data:{
           seen:true
       }
    })

    var app4 = new Vue({
        el:'#app-4',
        data:{
            todos:[
                {text:'学习 JavaScript'},
                {text:'学习Vue'},
                {text:'整个好项目'}
            ]
        }
    });

    var app5 = new Vue({
        el:'#app-5',
        data:{
            message:'Hello Vue.js'
        },
        methods:{
            reverseMessage:function () {
                this.message = this.message.split('').reverse().join('')
            }
        }
    });

    var app6 = new Vue({
       el:'#app-6',
       data:{
           message:'hello vue'
       }
    })

</script>







