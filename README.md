# wx-stat-native
wx-stat-native用于微信小程序跳转到其它小程序时给指定用户发送统计代码。

本组件仅供使用小程序原生语法开发的小程序使用。

## 使用
**准备工作**
- 在app.json中增加跳转小程序白名单`"navigateToMiniProgramAppIdList": ["wxe5f52902cf4de896"]`，[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html)
- 小程序后台，服务器域名添加以下域名为request白名单（后续adx有变动需同步修改）
  - https://a.adx.newoer.com
  - https://rtb.adx.newoer.com
  - https://s.adx.newoer.com


### 小程序原生语法

1.第一步

安装组件
```bash
npm install wx-stat-native --save
```

2.第二步

微信开发者工具，按照教程进行小程序构建npm
[小程序使用npm包](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

3.第三步

打开pages/xxx/xxx.json，引入组件
```json
{
  "usingComponents": {
    "wxstat": "wx-stat-native"
  }
}
```

4.第四步

打开pages/xxx/xxx.js
```js
Page({
  data:{ // 组件需要的参数，不一定非得写这里，根据具体业务调整
    name: '你画我拆',
    tagId: '300350'
  }
})
```

打开pages/xxx/xxx.wxml

```html
<wxstat type="{{type}}" name="{{name}}" tag-id="{{tagId}}" uid="{{uid}}" aid="{{aid}}" rid="{{rid}}" imptrace="{{imptrace}}" clktrace="{{clktrace}}"></wxstat>
```


### mpvue
请移步[wx-stat-vue](https://github.com/natee/wx-stat-vue)


### wepy
请移步[wx-stat-wepy](https://github.com/natee/wx-stat-wepy)


## 参数

| 选项 | 类型 | 描述 | 可选 |
| ----- | ---- | ----- | ---- |
| type | String | 广告主或小程序用户 | 可选，默认'user' |
| tag-id | String | 广告主提供的tagid | 必填 |
| name | String | 小程序名称 | 必填 |
| uid | String | 用户微信id | 可选 |
| aid | String | 预留参数aid | 可选 |
| rid | String | 预留参数rid | 可选 |
| imptrace | String | 小程序用户提供，展示时发送统计 | 可选 |
| clktrace | String | 小程序用户提供，小程序跳转成功时发送统计 | 可选 |

## 开发

1. 安装依赖：

```
npm install
```

2. 执行命令：

```
npm run dev
```

默认会在包根目录下生成 miniprogram\_dev 目录，src 中的源代码会被构建并生成到 miniprogram\_dev/components 目录下。如果需要监听文件变化动态构建，则可以执行命令：

```
npm run watch
```

> ps: 如果 minirpogram\_dev 目录下已存在小程序 demo，执行`npm run dev`则不会再将 tools 下的 demo 拷贝到此目录下。而执行`npm run watch`则会监听 tools 目录下的 demo 变动并进行拷贝。

## 发布

> ps: 发布前得确保已经执行构建，小程序 npm 包只有构建出来的目录是真正被使用到的。


## 目录结构

以下为推荐使用的目录结构，如果有必要开发者也可以自行做一些调整:

```
|--miniprogram_dev // 开发环境构建目录
|--miniprogram_dist // 生产环境构建目录
|--src // 源码
|   |--components // 通用自定义组件
|   |--images // 图片资源
|   |
|   |--xxx.js/xxx.wxml/xxx.json/xxx.wxss // 暴露的 js 模块/自定义组件入口文件
|
|--test // 测试用例
|--tools // 构建相关代码
|   |--demo // demo 小程序目录，开发环境下会被拷贝生成到 miniprogram_dev 目录中
|   |--config.js // 构建相关配置文件
|
|--gulpfile.js
```

> PS：对外暴露的 js 模块/自定义组件请放在 src 目录下，不宜放置在过深的目录。另外新增的暴露模块需要在 tools/config.js 的 entry 字段中补充，不然不会进行构建。

