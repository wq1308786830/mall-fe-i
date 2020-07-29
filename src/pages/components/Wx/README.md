React中使用微信jssdk步骤：

1. 通过微信官方下载最新的jssdk文件：https://res.wx.qq.com/open/js/jweixin-1.6.0.js

2. 下载得到最新的文件之后，修改顶部的this为window即可通过import引用，否则得到的是空对象；
