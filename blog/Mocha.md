参考地址
git clone https://github.com/ruanyf/mocha-demos.git
npm install
npm install --global mocha

安装完后开始写测试脚本
测试脚本与所要测试的源码脚本同名，但是后缀名为.test.js（表示测试）或者.spec.js（表示规格）。比如，add.js的测试脚本名字就是add.test.js。
```java
// add.js
function add(x, y) {
  return x + y;
}

module.exports = add;
```
```java
// add.test.js
var add = require('./add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
```

describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"加法函数的测试"），第二个参数是一个实际执行的函数。

it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"1 加 1 应该等于 2"），第二个参数是一个实际执行的函数。

#### 断言库的用法
`expect(add(1, 1)).to.be.equal(2);`
"断言"，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。上面这句断言的意思是，调用add(1, 1)，结果应该等于2。
所有的测试用例（it块）都应该含有一句或多句的断言。它是编写测试用例的关键。
expect断言的优点是很接近自然语言，下面是一些例子。
```
// 相等或不相等
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({ bar: 'baz' });

// 布尔值为true
expect('everthing').to.be.ok;
expect(false).to.not.be.ok;

// typeof
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);

// include
expect([1,2,3]).to.include(2);
expect('foobar').to.contain('foo');
expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// empty
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;

// match
expect('foobar').to.match(/^foo/);
```

#### Mocha的基本用法
有了测试脚本以后，就可以用Mocha运行它。请进入demo01子目录，执行下面的命令。


$ mocha add.test.js
![image](https://user-images.githubusercontent.com/18493352/54184092-c3cf0c00-44e0-11e9-8f4d-ae9f915cbd8a.png)
Mocha默认运行test子目录里面的测试脚本。所以，一般都会把测试脚本放在test目录里面，然后执行mocha就不需要参数了。
Mocha默认只执行test子目录下面第一层的测试用例，不会执行更下层的用例。
为了改变这种行为，就必须加上--recursive参数
`mocha --recursive`

#### 通配符
命令行指定测试脚本时，可以使用通配符，同时指定多个文件。

`
$ mocha spec/{my,awesome}.js
$ mocha test/unit/*.js
`
上面的第一行命令，指定执行spec目录下面的my.js和awesome.js
第二行命令，指定执行test/unit目录下面的所有js文件。
除了使用Shell通配符，还可以使用Node通配符。


`$ mocha 'test/**/*.@(js|jsx)'`
上面代码指定运行test目录下面任何子目录中、文件后缀名为js或jsx的测试脚本。注意，Node的通配符要放在单引号之中，否则星号（*）会先被Shell解释。


#### ES6测试
ES6转码，需要安装Babel。
npm install babel-core babel-preset-es2015 --save-dev

#### 异步测试
Mocha默认每个测试用例最多执行2000毫秒，如果到时没有得到结果，就报错。对于涉及异步操作的测试用例，这个时间往往是不够的，需要用-t或--timeout参数指定超时门槛。


#### 测试用例的钩子
Mocha在describe块之中，提供测试用例的四个钩子：before()、after()、beforeEach()和afterEach()。它们会在指定时间执行。

describe('hooks', function() {

  before(function() {
    // 在本区块的所有测试用例之前执行
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function() {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function() {
    // 在本区块的每个测试用例之后执行
  });

  // test cases
});

#### 测试用例管理
大型项目有很多测试用例。有时，我们希望只运行其中的几个，这时可以用only方法。describe块和it块都允许调用only方法，表示只运行某个测试套件或测试用例。
还有skip方法，表示跳过指定的测试套件或测试用例。