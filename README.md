#validate-form.js
##validate-form.js是什么?
一个基于jQuery/zepto.js的强大的表单验证插件，可以完成所有的基本表单验证功能，并且功能可扩展。

##validate-form.js有哪些功能？

* 方便使用的`基本验证`功能
    *  非空验证、邮箱格式验证、手机号码格式验证、数字验证、数字和字母的组合、中文验证
    *  密码验证、中国护照格式验证
* 支持`异步请求验证`功能
* 支持可扩展的`特殊功能验证`功能

##验证代码

```javascript
var validateParams = {
    //回调函数，当前表单验证通过以及不通过都会调用
    onChange: function (isValid, $elem, msg) {
        /*
        isValid:当前验证是否通过，true：通过；false：不通过；
        $elem:当前被验证的表单元素，jQuery对象；
        msg：验证未通过时的错误提示
        */
        //如下是验证通过以及未通过时的dom操作
        if (isValid) {
            $elem.next().removeClass("error");
        } else {
            $elem.focus().next().text(msg).addClass("error");
        }
    }
};
```
##关于作者

```javascript
  var ihubo = {
    nickName  : "felixpan",
    github : "https://github.com/pmg1989"
  }
```

##问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 邮件(972401854@qq.com, （把#换成@）)
* QQ: 972401854