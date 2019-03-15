接到这样的一个需求
期望在所有项目的数据请求，给http header加上 X-Request-ID，期望是根据用户在页面上弹出的错误ID，能够定位到具体的请求，也包括页面位置。
函数名

一开始走了个错误的方向，只考虑到vue axios可以实现全局拦截，然后去找了代码实现了vue项目的实现方法
代码如下
```
import axios from 'axios'
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  let myHref = location.href;
  let random = Math.round(Math.random()*1000);
  let url = config.url;
  let str = `"${myHref}"_"${url}"_"${random}"`;
  config.headers['X-Request-ID'] = str;
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
```

然后又查了jquery的全局拦截方法
代码如下
```
$.ajaxSetup({

    beforeSend:function(xhr,settings) {
        let myHref = location.href;
        let random = Math.round(Math.random()*1000);
        let url = settings.url;
        let str = `"${myHref}"_"${url}"_"${random}"`;
        xhr.setRequestHeader('X-Request-ID',str)

    }

});
```


后面不知怎么，想到应该有封装ajax原生的全局拦截，这样不管项目是用的axios,$ajax,都可以用一个方法实现拦截啦，查到一个fly.js的组件
采用开源fly.js拦截全局ajax请求
官网api地址：https://wendux.github.io/dist/#/doc/flyio/readme
实现方法： 
1:没有使用自动化构建工具搭建的项目：
html引入flyio文件夹下的fly.min.js、engine-wrapper.min.js、ajax_setup.js

2.使用webpack搭建的项目：
npm install flyio
main.js引入文件webpack-flyio文件夹下的ajax_setup.js
import './config/ajax_setup';

核心代码如下：
```
import fly from 'flyio'
import EngineWrapper from 'flyio/dist/npm/engine-wrapper'
var log = console.log;
//切换fly engine为真正的XMLHttpRequest
fly.engine = XMLHttpRequest;
var engine = EngineWrapper(function (request, responseCallback) {
    //console.log(request.url, request.method)
    //发起真正的ajax请求
    if(request.url.indexOf('shtml') === -1){
        var myHref = location.href;
        var random = Math.round(Math.random()*1000);
        var url = request.url;
        var str = `"${myHref}"_"${url}"_"${random}"`;
        request.headers['X-Request-ID'] = str;
    }
    fly.request(request.url, request.data, request)
        .then(function (d) {
            responseCallback({
                statusCode: d.engine.status,
                responseText: d.engine.responseText,
                statusMessage: d.engine.statusText
            })
        })
        .catch(function (err) {
            responseCallback({
                statusCode:err.status,
                statusMessage:err.message
            })
        })
})
//覆盖默认
XMLHttpRequest = engine;


```
