# webpack 4.x

### 如何创建基本的webpack4.x项目?
1. 运行 `npm init -y` 快速初始化项目（ps：-y的语义是快速跳过问答界面）
2. 在项目根目录下创建 `src` 源代码目录和 `dist` 产品目录
3. 在src目录下创建 `index.html`
4. 使用npm安装webpack，运行 `npm install webpack -d`（ps：-d的语义是仅在开发环境下使用）
5. webpack 4.x 提供了约定大于配置的概念，目的是为了尽量减少配置文件的体积，打包默认人口是 src-> index.js，打包默认输入目录是 dist -> main.js
6. webpack 4.x 新增了mode选项，为必填值，可选值为 `development` 和 `production`

### npm i 和 install 的区别？
1. 用 `npm i` 安装的模块无法用 `npm uninstall` 删除，用 `npm uninstall i` 才卸载掉
2.  `npm i` 会帮助检测与当前node版本最匹配的npm包版本号，并匹配出来相互依赖的npm包应该提升的版本号
3. 部分npm包在当前node版本下无法使用，必须使用建议版本
4. 安装报错时intall肯定会出现 npm-debug.log 文件，npm i不一定

### webpack.config.js，向外暴露一个打包的配置文件
```
	modult exports = { 
		mode: 'development', // develoption production 开发模式不会压缩，生产模式文件会被压缩
		plugins: { 
			htmlPlugin // plugins参考下方介绍
		}
	}
```
  
`webpack4.x中，有一个很大的特性就是约定大于配置，约定默认的打包入口路径是src -> index.js`

`export default {} 是ES6中向外导出模块的API`  
`import * from '标识符' 是ES6的引入模块的API`  
`Nodejs是基于ChormeV8引擎的，只有该引擎中有的API node才可以使用，上述两个ES6语法ChormeV8引擎中没有，所以node也不可使用`

### webpack-dev-server 的基本使用
1. 会自动在内存中实时托管出一个打包好的main.js，但是在项目目录中是看不到的
2. --open 每次重新编译打开浏览器
3. --port 重新定义端口
4. --hot 热加载，也就是说，当我们改动文件后保存，浏览器已经自动刷新了我们的修改  （ps：修改index.html文件，并不会热加载。热加载相关的是入口文件，本例中的是js/app.js文件，修改这个文件，会热加载。）
5. --quiet 控制台中不输出打包信息
6. --compress 开启gzip压缩
7. --progress 显示打包进度
8. --host 任意改变host值0.0.0.0
9. 还可以通过定义浏览器名称来更改打开的默认浏览器，具体一些其他配置自行查询webpack文档

### html-webpack-plugin 插件
```
	// 导入在内存中自动生成index页面的插件	
	const HtmlWebPackPlugin = require('html-webpack-plugin')
	// 创建一个插件的实例对象	  
	const htmlPlugin = new HtmlWebPackPlugin({	  
		template: path.join(_dirname, './src/index.html'),	  
		filename: 'index.html'	  
	})	 
```