#validate-form.js
##validate-form.js是什么?
一个基于jQuery/zepto.js的表单验证插件，可以完成基本表单验证以及异步请求验证功能，并且功能可支持扩展。

##validate-form.js有哪些功能？

* 方便使用的`基本验证`功能
    *  非空验证、邮箱格式验证、手机号码格式验证、数字验证、数字和字母的组合、中文验证
    *  密码验证、中国护照格式验证
* 支持`异步请求验证`功能
* 支持可扩展的`特殊功能验证`功能
* 支持form表单`整体`验证以及input`单个`验证

##HTML模板配置
```html
<form class="form" method="post" action="/">
    <div class="form-control">
        <input id="phone" type="text" placeholder="请输入手机号" check="required mobile"/>
        <div class="message">请输入手机号</div>
        <span class="btn send-code">获取验证码</span>
    </div>
    <div class="form-control">
    <input id="email" type="text" placeholder="请输入邮箱" check="required email" />
        <div class="message">请输入邮箱</div>
    </div>
    <div class="form-control">
        <input id="num" type="text" placeholder="请输入数量" check="required num" />
        <div class="message">请输入数量</div>
    </div>
    <div class="form-control">
        <input id="password1" type="password" placeholder="请输入密码" check="required pwd1 length" min="6" max="12" />
        <div class="message">请输入密码</div>
    </div>
    <div class="form-control">
        <input id="password2" type="password" placeholder="请输入确认密码" check="required pwd2" />
        <div class="message">请输入确认密码</div>
    </div>
    <input type="submit" class="btn btn-primary btn-block" value="注册" />
</form>
```
##Form表单整体验证

```javascript
//定义验证参数对象
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
//对form表单进行验证
var validFalg = $("form").ValidateForm(validateParams);
/*
validFalg:false,验证未通过，无需处理，return false；拦表单提交即可
validFalg:true,form验证通过，可进行表单提交了
*/
```

##input单个验证

```javascript
//发送验证码控件绑定事件
$('.send-code').sms({
    mobile: $('#phone'),//待验证的input元素
    /*
    sms的回调函数
    $ele:待验证的元素，jQuery对象；
    此回调必须return 一个bool类型的值，true：验证通过，false：验证不通过
    */
    validate: function ($ele) {
        return $ele.ValidateForm(validateParams);
    }
});
```

##ajax异步请求验证

ajaxvalid：必填参数，check属性值，必须且只能为ajaxvalid；

ajaxurl:必填参数，异步请求的后台验证接口，可带url参数；

ajaxtype:可选参数，值为post/get,默认值为post

```html
<div class="form-control">
    <input id="phone2" type="text" placeholder="请输入邮箱/手机号"check="required mobile ajaxvalid" ajaxurl="http://www.cakeland.com/json.ashx?C=User&m=checkPhone" ajaxtype="post"/>
    <div class="message">请输入邮箱/手机号</div>
</div>
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

* 邮件(972401854@qq.com)
* QQ: 972401854