# wx-stat-native
wx-stat-native用于微信小程序跳转到其它小程序或h5广告页时给指定用户发送统计代码。

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

打开pages/xxx/xxx.wxml

```html
<wxstat 
  type="{{type}}" 
  name="{{name}}" 
  sid="{{sid}}" 
  tag-id="{{tagId}}" 
  uid="{{uid}}" 
  aid="{{aid}}" 
  rid="{{rid}}" 
  imptrace="{{imptrace}}" 
  clktrace="{{clktrace}}"
  bind:goto="showInMySite"
>
</wxstat>
```

**注意** `bind:goto="showInMySite"`这一行，如果是跳转到h5，具体跳转逻辑由`bind:goto`绑定的事件控制。

打开pages/xxx/xxx.js
```js
Page({
  data:{ // 组件需要的参数，不一定非得写这里，根据具体业务调整
    name: '你画我拆',
    tagId: '300350',
    sid: '100000',
  },
  showInMySite(e){ // h5跳转，务必增加这个跳转函数
    const url = e.detail.url;
    console.log('待跳转url', url);
  },
})
```


### mpvue
请移步[wx-stat-vue](https://github.com/natee/wx-stat-vue)


### wepy
请移步[wx-stat-wepy](https://github.com/natee/wx-stat-wepy)


## 参数

| 选项 | 类型 | 描述 | 可选 |
| ----- | ---- | ----- | ---- |
| type | String | 广告主或小程序用户 | 可选，默认'user'，['adx','user'] |
| tag-id | String | 广告主提供的tagid | 必填 |
| sid | String | 媒体的账户id | 必填 |
| name | String | 小程序名称 | 必填 |
| uid | String | 用户微信id | 可选 |
| aid | String | 预留参数aid | 可选 |
| rid | String | 预留参数rid | 可选 |
| imptrace | String | 小程序用户提供，展示时发送统计 | 可选 |
| clktrace | String | 小程序用户提供，小程序跳转成功时发送统计 | 可选 |
| bind:goto | Function | 控制h5具体跳转的函数 | 可选，h5广告则必填 |
