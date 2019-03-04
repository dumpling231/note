### flow
vue采用flow做类型系统，所以要看懂flow才能看懂vue源码。
flow是用来检查类型的，因为js是一门弱类型语言，在引入的时候如果类型自动转变会有一些查不到的错误，这时使用类型检查工具就可以避免这个错误
flow的好处是他可以自己添加，可以用babel卸载添加，很灵活。


demo:
1.全局安装
// 将 flow 命令安装到全局环境中
npm install -g flow-bin

2.初始化 flow,会在当前目录生成一个 .flowconfig 文件，这是 Flow 的配置文件
flow init


3.开始写代码
index.js
// @flow
var str: number = 'hello world!';
console.log(str);
```
注意第一行，我们添加了 // @flow，用来告诉 Flow 你得检查我这个文件。如果不加这个注释， Flow 就认为这个文件还没准备好，先不检查它

4.运行 Flow
`flow`
使用 flow后，会创建一个 Flow 的服务,可以使用 flow stop 来停止这个后台进程.
如果你只是想检查一下，而不要一个后台进程， （你不介意每次都多等几秒的话）那么你可以使用 flow check命令。 这样的话，Flow 在检查完你的项目后就立即停止了。
![image](https://user-images.githubusercontent.com/18493352/53717906-9527b480-3e94-11e9-9731-cead5ed4c67b.png)
