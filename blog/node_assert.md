参考地址：http://javascript.ruanyifeng.com/nodejs/assert.html
assert 模块提供了一组简单的断言测试，可用于测试不变量。
如果表达式不符合预期，就抛出一个错误。

1.assert(value,message);
第一个参数为false的时候就输出第二个参数，第一格参数为true的时候就不输出
```
var assert = require('assert');
assert(false,'报错')；
```
![image](https://user-images.githubusercontent.com/18493352/54178925-3edcf600-44d2-11e9-87af-d55409509479.png)
```
var assert = require('assert');
assert(true,'123');
```
![image](https://user-images.githubusercontent.com/18493352/54179187-07227e00-44d3-11e9-9313-cb960a32021e.png)


2.assert.ok()是assert()的别称


3.assert.equal()
equal方法接受三个参数，第一个参数是实际值，第二个是预期值，第三个是错误的提示信息。

4.assert.notEqual()
notEqual方法的用法与equal方法类似，但只有在实际值等于预期值时，才会抛出错误。

5.assert.deepEqual()
deepEqual方法用来比较两个对象。只要它们的属性一一对应，且值都相等，就认为两个对象相等，否则抛出一个错误。

6.assert.notDeepEqual()
notDeepEqual方法与deepEqual方法正好相反，用来断言两个对象是否不相等。

7.assert.strictEqual()
strictEqual方法使用严格相等运算符（===），比较两个表达式。

8.assert.notStrictEqual()
assert.notStrictEqual方法使用严格不相等运算符（!==），比较两个表达式。

9.assert.throws()
throws方法预期某个代码块会抛出一个错误，且抛出的错误符合指定的条件。
```
// 例二、抛出错误的提示信息符合正则表达式
assert.throws(
  function() {
    throw new Error("Wrong value");
  },
  /value/,
  '不符合预期的错误类型'
);
```
10.assert.doesNotThrow()
doesNotThrow方法与throws方法正好相反，预期某个代码块不抛出错误。
11.assert.ifError()
ifError方法断言某个表达式是否false，如果该表达式对应的布尔值等于true，就抛出一个错误。它对于验证回调函数的第一个参数十分有用，如果该参数为true，就表示有错误。

12.assert.fail()
fail方法用于抛出一个错误。
```
// 格式
assert.fail(actual, expected, message, operator)

// 例子
var assert = require('assert');

assert.fail(21, 42, 'Test Failed', '###')
// AssertionError: Test Failed
assert.fail(21, 21, 'Test Failed', '###')
// AssertionError: Test Failed
assert.fail(21, 42, undefined, '###')
// AssertionError: 21 ### 42 
```
该方法共有四个参数，但是不管参数是什么值，它总是抛出一个错误。如果message参数对应的布尔值不为false，抛出的错误信息就是message，否则错误信息就是“实际值 + 分隔符 + 预期值”。