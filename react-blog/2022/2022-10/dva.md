# Dva.js 快速上手指南

### 先说些废话
最近在开发React技术栈的项目产品，对于数据状态的管理使用了`Dva.js`，作为一个资深的[ow](https://ow.blizzard.cn/home)玩家，
我看到这个名字第一反应就是————这不是[ow](https://ow.blizzard.cn/home)里的一个女英雄吗?
仔细阅读了官方文档之后，发现开发者还真是因为这个角色获得灵感，来命名这个数据状态管理插件，果然开发大佬都是工作和休闲两不误~

学过React的同学都知道它的技术栈非常多且杂，所以每当你使用React的时候都需要引入很多的模块，那么Dva就是把这些用到的模块集成在一起，
比如一些需要引入的依赖`react-saga`/`react-loger`、必写的`ReactDOM.render`、`provider、connect`包裹等都省去不写，形成一定的架构规范，大大提高我们的开发效率  

今天，就来写一份文档，帮助后续使用Dva的开发者更好得在实际项目中*（PS:需要是以UMI为基础框架，纯Dva来构建项目可以直接看文章结尾的参考文档列表）*上手使用    


## 什么是Dva
`Dva`首先是一个基于`redux`和`redux-saga`的数据流方案，然后为了简化开发体验，`Dva`还额外内置了`react-router`和`fetch`，所以也可以理解为一个轻量级的应用框架。 
在我目前的项目中，更多是使用数据状态管理的功能，他在我司的fish框架中做了内嵌，在主流的React开发框架UMI中也做了内嵌适配，使用起来非常方便快速。 
`Dva`设计的目的就是简化元素，降低难度，让你不用管他怎么实现的，我们按照默认的这个规则去写就可以  

### 数据流向
数据的改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，当此类行为会改变数据的时候可以通过`dispatch`发起一个`action`，
如果是同步行为会直接通过`reducers`改变`states`，如果是异步行为（副作用）会先触发`effects`然后流向`reducers`最终改变`states`  

![Dva数据流向](img/Dva-数据流向.png)  

### 分层开发
无论是Vue还是React开发，实际的大型应用一定有严格的分层开发规范，确保后续开发的可维护性，主要的分层结构有以下几点：  
+ Page 负责与用户直接打交道：渲染页面，接受用户的操作输入，侧重于展示型交互性逻辑，这里需要[了解无状态组件](#jumpNoState)  
+ Model 负责处理业务逻辑，为 Page 做数据、状态的读写、变换、暂存等，`Dva`中`model`就是做了这一层的操作  
+ Service 负责与 HTTP 接口对接，进行纯粹的数据读写  

### 基础概念
1. namespace  
	- `model`的命名空间，同时也是他在全局`state`上的属性  
	- 只能用字符串，不支持通过`.`的方式创建多层命名空间，相当于这个`model`的`key`  
	- 在组件里面，通过`connect`这个`key`将想要引入的`model`加入  
	```
	import { connect } from 'dva';
	export default connect(({ namespaceValue }) => ({ ...namespaceValue }))(DvaCompoent);
	```
2. state  
	- 表示`model`的状态数据  
	- 操作的时候每次都要当作不可变数据`immutable data`来对待，保证每次都是全新对象，没有引用关系  
3. reducer  
	- 必须是纯函数，有固定输入输出，主要目的是修改自身`state`  
	- 接受两个参数：之前已经累积运算的结果和当前要被累积的值，返回的是一个新的累积结果，该函数把一个集合归并成一个单值  
	- 需要注意的是同样的输入必然得到同样的输出，它们不应该产生任何副作用`effect`。并且，每一次的计算都应该使用`immutable data`  
4. effect  
	- 主要用于异步请求，接口调用之类的  
	- `effect`被称为副作用，在我们的应用中，最常见的就是异步操作  
	- 它来自于函数编程的概念，之所以叫副作用是因为它使得我们的函数变得不纯，同样的输入不一定获得同样的输出  
5. subscription  
	- `subscription`语义是订阅，用于订阅一个数据源，然后根据条件`dispatch`需要的`action`  
	- 数据源可以是当前的时间、服务器的websocket连接、keyboard输入、geolocation变化、history路由变化等等  
	- 内部定义的函数都会被被执行，执行之后作为监听来处理事务  
6. dispatch  
	- `dispatch`是一个用于触发`action`的函数，`action`是改变`state`的唯一途径，但是它只描述了一个行为，而`dipatch`可以看作是触发这个行为的方式，`reducer`则是描述如何改变数据的  
	- 在`Dva`中，`connect model`的组件通过`props`可以访问到`dispatch`，可以调用`model`中的`reducer`或者`effects`  
	```
	import { connect } from 'dva';
	const testCom = props => {
	  const { dispatch } = props;
	  const changeValue = (id, val) => {
		  // 调用reducer，一般是同步修改state中的值
	      dispatch({
	        type: 'dva/save',
	        payload: {
	          param: val
	        },
	      });
		  // 调用effect，一般是发送后台请求
		  dispatch({
		    type: 'dva/queryValue',
		    payload: {
		      id: id
		    },
		  });
	    };
	  return(
	    <div>'hello world'</div>
	  )
	}
	export default connect(({ dva }) => ({ ...dva }))(testCom);
	```

#### Model中的Effects函数解析  
需要注意的是：`Effects`里面的函数都是[Generator函数](https://blog.csdn.net/weixin_46174785/article/details/108419048)  
1. yield
	- 固定关键词，`Generator`函数自带的关键词，和`*`搭配使用，有点像`async`和`await`，使用`*`则表明它是`Generator`函数 
	- 然后每使用一个`yield`就是告诉程序这里是异步，需要等待这个后面的代码执行完成，同步代码可不使用该关键词  
2. payload
	- 页面上通过`dispatch`传过来的`payload`同名参数  
3. select
	- `Dva`中`Effects`函数的固定传参  
	- 用于拿到`model`中`state`的数据，需要注意的是，`state`后面跟命名空间`namespace`的值  
	```
	const data = yield select((state) => state.namespaceName.valueName);
	```
4. call
	- `Dva`中`Effects`函数的固定传参  
	- 第一个参数是一个异步函数，`payload`是参数，可以通过`call`来执行一个完整的异步请求，又因为`yield`的存在，就实现了异步转同步的方案  
	```
	const { data } = yield call(queryInterface, payload);
	```
5. put
	- `Dva`中`Effects`函数的固定传参  
	- 可以使用同`model`中的`Reducers`或者`Effects`，通过`Reducers`来实现数据到页面的更新，也可以通过`put`实现`Effects`的嵌套使用  
	```
	yield put({
		type: 'save',
		payload: {
		  ...payload
		},
	});
	```

### 开发目录
由于公司的fish框架以及常见的umi框架都对Dva做了深度继承，会默认将`src/models`下的`model`定义自动挂载，
只需要在`model`文件夹中新建文件即可新增一个`model`用来管理组件状态，对于某个`page`文件夹下面的`model`也会默认挂载  
```
├─assets `静态资源`
├─components `公共组件`
├─config `路由和环境配置`
├─constants `全局静态常量`
├─locale `国际化`
│  ├─en_US `英文配置`
│  └─zh_CN `中文配置`
├─models `全局数据状态` *Dva涉及的目录*
├─pages `页面目录，用我参与开发的其中一个目录来作为示例` *Dva涉及的目录*
│  ├─NodeConfig  `NodeConfig示例目录`
│  │  ├─components
│  │  │  ├─Select `Select组件页面文件` *Dva涉及的目录*
│  │  │  │  └─components
│  │  │  │      ├─AudienceInfo
│  │  │  │		│	├─index.js
│  │  │  │		│	└─index.less
│  │  │  │      ├─BlackList
│  │  │  │		│	├─index.js
│  │  │  │		│	└─index.less
│  │  │  │      ├─ControlGroup
│  │  │  │		│	├─index.js
│  │  │  │		│	└─index.less
│  │  │  │      └─GroupSelect
│  │  │  │		│	├─index.js
│  │  │  │		│	└─index.less
│  │  │  │		├─index.js
│  │  │  │		└─index.less
│  │  ├─models
│  │  │  ├─select.js `Select组件数据状态管理` *Dva涉及的目录*
│  │  └─services
├─services `全局接口配置`
├─themes `全局样式主题`
└─utils `js通用工具`

PS: 该树形图通过 `windows shell` 自带的 `tree` 命令生成
```


## 如何使用Dva
### 首先定义一个简易的model示例
```
export default {
  namespace: 'dva',
  state: {
	id: '',
    value: {},
  },
  effects: {
	// 所有effect前必须要加 *
    *queryValue({ payload }, { select, call, put }) {
	  const params = {
		  id: payload.id ? payload.id : yield select(state => state.select.id)
	  }
      const { data } = yield call(queryInterface, params); // queryInterface是定义好的后台请求接口，一般用axios或fetch来完成
      yield put({ type: 'save', payload: data });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    keyboardWatcher({ dispatch }) {
	  key('⌘+up, ctrl+up', () => { dispatch( {type:'save'}) });
    },
  },
};
```

### 然后把model和组件绑定在一起
React的Connect函数是一种[柯里化写法](#jumpCurry)  
```
import { connect } from 'dva';

const testCom = props => {
  const { helloWorld = 'hello world'} = props;
  return(
    <div>{ helloWorld }</div>
  )
}

// 绑定之后就可以在testCom组件中使用命名为dva的model了
export default connect(({ dva }) => ({ ...dva }))(testCom);
```

<span id="jumpCurry"></span>
#### 柯里化
柯里化是把接受多个参数的函数转换成接受一个单一参数的函数（PS：Scala语言中也有类似的设计）  
```
// 柯里化
var foo = function(x) {
	return function(y) {
		return x + y
	}
}
foo(3)(4)


// 普通方法
var add = function(x, y) {
	return x + y;
}
add(3, 4) 
```

<span id="jumpNoState"></span>
#### 无状态组件
创建无状态组件是为了创建纯展示组件，这种组件只负责根据传入的props来展示，不涉及到要改变state状态的操作，
在实际项目中页面组件被写成无状态的组件，通过简单组合可以构建成页面或复杂组件，通过多个简单组件来合并成一个复杂的大应用
```
const NoStateComponent = props => {
  const { helloWorld = 'hello world'} = props;
  return(
    <div>{ helloWorld }</div>
  )
}
export default NoStateComponent;
```
*无状态组件的优点*
1. 由于是无状态组件，所以无状态组件就不会在有组件实例化的过程，无实例化过程也就不需要分配多余的内存，从而性能得到一定的提升  
2. 代码整洁、可读性高，对于大型项目的开发维护非常有好处  


[参考文档一 ———— Dva官方文档](https://dvajs.com/guide/#%E7%89%B9%E6%80%A7)  
[参考文档二 ———— UMI官方文档](https://umijs.org/docs/max/dva)  
[参考文档三 ———— REACT基础笔记 MODEL分层](https://dvajs.com/guide/#%E7%89%B9%E6%80%A7)  
[参考文档四 ———— 前端数据流方案Dva](https://blog.csdn.net/harry_yaya/article/details/111408248)  
[参考文档五 ———— 浅析dva (史上最全的dva用法及分析)](https://blog.csdn.net/weixin_38398698/article/details/93387757)  
[参考文档六 ———— 【dva】model中effects函数的解析 ](https://www.cnblogs.com/Shyno/p/15689336.html)  
[参考文档七 ———— Generator 函数的详解](https://blog.csdn.net/weixin_46174785/article/details/108419048)  
[参考文档八 ———— React connect()() 双括号 --柯里化写法](https://www.cnblogs.com/irobotzz/p/12292283.html)  
[参考文档九 ———— 高级函数技巧-函数柯里化](https://segmentfault.com/a/1190000018265172)  


我是 [fx67ll.com](https://fx67ll.com)，如果您发现本文有什么错误，欢迎在评论区讨论指正，感谢您的阅读！  
如果您喜欢这篇文章，欢迎访问我的 [本文github仓库地址]()，为我点一颗Star，Thanks~ :)  
***转发请注明参考文章地址，非常感谢！！！***