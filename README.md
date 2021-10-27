# fx67llReact
learn React

## 0.2.0.20211027
* 学习线路修正，重新剥离出演示项目[JFPBR]()，确定演示目标  

### 任务目标
1. 用于演示曾经做过的React项目中一些亮点功能  
2. 完成个人React项目的Basic基线版本  

### 任务规划
1. React + SpringBoot +  MySQL 为基本技术栈  
2. 亮点Demo展示，包括复杂功能的关键代码展示，注意博客文章同步更新  
3. 考虑完成类似Gallery的Echarts配置分享，不同用户注册上传，并分享给所有人查看与获取代码  
4. 考虑添加一些关于高德和百度地图的功能分享，主要是官方没有示例的，同样可以查看和获取代码  

### 任务安排
1. 具体安排记录Teamabtion，不在git中记录  
2. 暂定工作日的晚上和周末推进  

## 0.1.3.20210713
* 发现一个小问题：`react-test -> ant-design-master-test`不可以直接在文件夹目录执行操作，会导致项目自动检查当前git地址，并从git发布从而导致问题  
* 解决的方案就是把所有文件提取出来，然后在非github项目目录下执行命令，这样就不会影响发布  
* 也可以直接从官网下载4.16.6版本的文件，直接把当前`package.json`拷贝覆盖过去即可  
* `npm install` -> `npm run build` -> `npm login` -> `npm publish`  
* 私服发布需要修改`package.json`下的`publishConfig`参数，这个是发布的地址  

## 0.1.3.20210707
* 新建项目`react-test -> react-simple-jsx && react-simple-tsx`尝试验证公司某项目的可行性  

## 0.1.2.20210423（AntDesignPro-SEM-test）
* 添加边学习边开发的项目目录，可以随意删减代码，基于`AntDesignPro-SEM`copy

## 0.1.1.20210421（AntDesignPro-SEM-simple）
* 考虑了一下除了完整版，简易版后期也有一定作用，先下载保留目录，待后期决定

## 0.1.0.20210414（AntDesignPro-SEM）
* 项目重新启动，重新规划一下学习路线