#validate-form.js

##��ʾ��ַ��
https://pmg1989.github.io/validate-form

##validate-form.js��ʲô?
һ������jQuery/zepto.js�ı���֤�����������ɻ�������֤�Լ��첽������֤���ܣ����ҹ��ܿ�֧����չ��

##validate-form.js����Щ���ܣ�

* ����ʹ�õ�`������֤`����
    *  �ǿ���֤�������ʽ��֤���ֻ������ʽ��֤��������֤�����ֺ���ĸ����ϡ�������֤
    *  ������֤���й����ո�ʽ��֤
* ֧��`�첽������֤`����
* ֧�ֿ���չ��`���⹦����֤`����
* ֧��form��`����`��֤�Լ�input`����`��֤

##HTMLģ������
```html
<form class="form" method="post" action="/">
    <div class="form-control">
        <input id="phone" type="text" placeholder="�������ֻ���" check="required mobile"/>
        <div class="message">�������ֻ���</div>
        <span class="btn send-code">��ȡ��֤��</span>
    </div>
    <div class="form-control">
    <input id="email" type="text" placeholder="����������" check="required email" />
        <div class="message">����������</div>
    </div>
    <div class="form-control">
        <input id="num" type="text" placeholder="����������" check="required num" />
        <div class="message">����������</div>
    </div>
    <div class="form-control">
        <input id="password1" type="password" placeholder="����������" check="required pwd1 length" min="6" max="12" />
        <div class="message">����������</div>
    </div>
    <div class="form-control">
        <input id="password2" type="password" placeholder="������ȷ������" check="required pwd2" />
        <div class="message">������ȷ������</div>
    </div>
    <input type="submit" class="btn btn-primary btn-block" value="ע��" />
</form>
```
##Form��������֤

```javascript
//������֤��������
var validateParams = {
    //�ص���������ǰ����֤ͨ���Լ���ͨ���������
    onChange: function (isValid, $elem, msg) {
        /*
        isValid:��ǰ��֤�Ƿ�ͨ����true��ͨ����false����ͨ����
        $elem:��ǰ����֤�ı�Ԫ�أ�jQuery����
        msg����֤δͨ��ʱ�Ĵ�����ʾ
        */
        //��������֤ͨ���Լ�δͨ��ʱ��dom����
        if (isValid) {
            $elem.next().removeClass("error");
        } else {
            $elem.focus().next().text(msg).addClass("error");
        }
    }
};
//��form��������֤
var validFalg = $("form").ValidateForm(validateParams);
/*
validFalg:false,��֤δͨ�������账��return false�������ύ����
validFalg:true,form��֤ͨ�����ɽ��б��ύ��
*/
```

##input������֤

```javascript
//������֤��ؼ����¼�
$('.send-code').sms({
    mobile: $('#phone'),//����֤��inputԪ��
    /*
    sms�Ļص�����
    $ele:����֤��Ԫ�أ�jQuery����
    �˻ص�����return һ��bool���͵�ֵ��true����֤ͨ����false����֤��ͨ��
    */
    validate: function ($ele) {
        return $ele.ValidateForm(validateParams);
    }
});
```

##ajax�첽������֤

ajaxvalid�����������check����ֵ��������ֻ��Ϊajaxvalid��

ajaxurl:����������첽����ĺ�̨��֤�ӿڣ��ɴ�url������

ajaxtype:��ѡ������ֵΪpost/get,Ĭ��ֵΪpost

```html
<div class="form-control">
    <input id="phone2" type="text" placeholder="����������/�ֻ���"check="required mobile ajaxvalid" ajaxurl="http://www.cakeland.com/json.ashx?C=User&m=checkPhone" ajaxtype="post"/>
    <div class="message">����������/�ֻ���</div>
</div>
```

##��������

```javascript
  var ihubo = {
    nickName  : "felixpan",
    github : "https://github.com/pmg1989"
  }
```

##���ⷴ��
��ʹ�������κ����⣬��ӭ�������ң�������������ϵ��ʽ���ҽ���

* �ʼ�(972401854@qq.com)
* QQ: 972401854