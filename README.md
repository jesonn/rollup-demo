#下一代打包工具rollup
[toc]

##roolup是什么：
Rollup是一个 JavaScript 模块打包器,它采用一个据称为`tree shaking`的技术，Tree shaking，即是指消除JavaScript上下文中无用代码，或更精确地说，只保留有用的代码。利用es6模块能静态分析语法树的特性，只将需要的代码提取出来打包，能大大减小代码体积。


##为什么要用rollup：

- Rollup 可以打出更快更小的包,尽可能的压缩，减少文件大小
- 只导出有用的代码,去掉没用到的代码
- Rollup的语法比Webpack更加简单，文档教程比Webpack更加循序渐进

##同类型工具（预编译模块方案）：
webpack、browserify 


##怎么用：
### 1.创建package.json文件
 package.json配置-[项目模板](https://github.com/rollup/rollup-starter-project/blob/master/package.json)
每个项目的根目录下面，一般都有一个package.json文件，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。npm install命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境。

如果不使用模板可以使用npm init用来初始化生成一个新的package.json文件。它会向用户提问一系列问题，如果你觉得不用修改默认配置，一路回车就可以了。
```
npm init
```
有了package.json文件，直接使用npm install命令，就会在当前目录中安装所需要的模块
```
npm install
```

### 2.简单创建第一个文件束(bundle)
rollup是从entry文件出发，将依赖的文件进行提取、编译、把所有文件最终都打包成一个bundle.js

安装rollup
```
npm install rollup --global # 或简写 `npm i rollup -g`

```

创建一个简单的项目rollup-demo；

```
mkdir -p rollup-demo/src
cd rollup-demo
```

创建入口文件名为src/main.js,并写入：
```
// src/main.js
import foo from './foo.js';
export default function () {
  console.log(foo);
}
```

然后，让我们创建 foo.js 文件模块，我们的入口文件会引入:
```
// src/foo.js
export default 'hello world!';
```

最后创建文件束并输出bundle.js,这样就可以完成简单的打包工作

format 设置打包模块所使用的规范，rollup 支持导出 AMD、CommonJS、ES2015、Global 及 UMD 五种规范的打包文件，可以通过rollup -f amd/cjs/es/iife/umd来切换导出模块所使用的规范。
rollup走的是ES2015模块语法，现在的浏览器对ES2015新特性支持不够完善，不过项目可以通过 babel ,Traceur将尚未得到支持的ES2015特性转换为ES5标准的代码，使其得到浏览器的支持,所有现在rollup最终编译出来的模块希望它能走commonjs语法。
```
rollup src/main.js --format cjs --output bundle.js
```

### 3.使用配置文件创建bundle.js
在项目根目录创建一个名为 rollup.config.js 的文件, 同时添加下面的代码：
```
// rollup.config.js
export default {
  entry: 'src/main.js',
  format: 'cjs',
  dest: 'dist/bundle.js' // 相当于 --output
};
```
为了使用配置文件，我们使用 --config or -c 标记：
```
rollup -c
```

### 4.使用package.json文件创建bundle.js
一个 package.json 包含关于你项目的重要信息，包括它的名称、版本、许可证和依赖。(实际上，你不可以发布一个不包括 package.json 的程序包 - 但你仍然应该有一个这样的文件如果你构建的是一个应用而非一个库)。
打开 package.json 并找到(创建) scripts 部份, 添加 build 键值:
```
{
  ...,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rollup -c"
  },
  ...
}
```

执行以下命令即可完成构建：
```
npm run build
```

