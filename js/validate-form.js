if (typeof Zepto === 'undefined') {
    throw new Error('Zepto.Validate\'s JavaScript requires Zepto')
}

+(function ($) {
    $.fn.ValidateForm = function (options) {
        return new validateForm(this, options).isValid;
    };
    var validateForm = function (elem, options) {
        this.elem = elem;
        this.opt = {
            //提示信息
            tips_required: '不能为空',
            tips_email: '邮箱地址格式有误',
            tips_mobile: '手机号码格式有误',
            tips_num: '请填写数字',
            tips_chinese: '请填写中文',
            tips_idcard: '身份证号码格式有误',
            tips_numletter: '请输入数字和字母的组合字符',
            tips_passport: '护照格式有误',
            tips_xishiqu_account: '请输入西十区邮箱/手机号',
            tips_pwd2: '两次密码不一致',
            tips_length: '',
            tips_ajaxvalid: '信息已经存在',

            //正则
            reg_email: /^\w+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i,  //验证邮箱
            reg_mobile: /^1[34578]{1}[0-9]{9}$/,                //验证手机
            reg_num: /^\d+$/,                                  //验证数字
            reg_chinese: /^[\u4E00-\u9FA5]+$/,                 //验证中文
            reg_idcard: /^\d{14}\d{3}?\w$/,                    //验证身份证
            reg_numletter: /[^\d|chun]/,                       //验证数字和字母
            reg_passport: /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/,  //验证护照

            onChange: function () { throw new Error('ValidateForm requires onChange options'); },
            submit: function () { }
        };
        this.options = $.extend(this.opt, options);
        var pwd1;
        return this.validate();
    };
    validateForm.prototype = {
        validate: function () {
            this.isValid = true;
            var $element = this.getElement(this.elem);
            _this = this;
            $element.each(function () {
                var $this = $(this);
                var _validate = $this.attr("check");
                if (_validate) {
                    var arr = _validate.split(' ');
                    for (var i = 0; i < arr.length; i++) {
                        if (!_this.check($this, arr[i])) {
                            _this.isValid = false;
                            break;
                        }
                    }
                    return _this.isValid;
                }
            });
            if (this.isValid) {
                this.options.submit();
            }
        },
        getElement: function (el) {
            var tagName = $(el).prop("tagName");
            if ($.inArray(tagName, ["INPUT", "TEXTAREA"]) > -1) {
                return el;
            }
            return $(el).find("input,textarea");
        },
        check: function ($elem, _match) {
            var _val = $.trim($elem.val());
            var _flag = true;

            //根据验证情况，显示相应提示信息，返回相应的值
            switch (_match) {
                case 'required':
                    _flag = !!_val.length;
                    break;
                case 'email':
                case 'num':
                case 'chinese':
                case 'mobile':
                case 'idcard':
                case 'numletter':
                case 'passport':
                    _flag = this.regMatch(_val, _match);
                    break;
                case 'pwd1':
                    pwd1 = _val;
                    _flag = true;
                    return _flag;//实时获取存储pwd1值,直接return true即可
                case 'pwd2':
                    _flag = this.pwdEqual(_val, pwd1);
                    break;
                case 'length':
                    _flag = this.chekLength(_val, $elem);
                    break;
                case 'ajaxvalid':
                    _flag = this.ajaxValidate(_val, $elem);
                    break;
                case 'xishiqu_account':
                    _flag = this.chekXishiquAccount(_val, this.opt.reg_mobile, this.opt.reg_email);
                    break;
                default:
                    return true;
            };
            var _msg = this.getErrorMsg(_match, $elem);
            this.options.onChange(_flag, $elem, _msg);
            return _flag;
        },
        regMatch: function (value, regExp) {
            if (value !== "") {
                return this.opt["reg_" + regExp].test(value);
            }
            return false;
        },
        getErrorMsg: function (match, $el) {
            if (match == "required") {
                return $el.attr("placeholder") || this.opt["tips_" + match];
            }
            return this.opt["tips_" + match];
        },
        pwdEqual: function (val1, val2) {
            return val1 === val2 ? true : false;
        },
        chekLength: function (value, elem) {
            var result = true;
            if ($(elem).attr("min") !== false) {
                if (value.length < +($(elem).attr("min"))) {
                    this.opt.tips_length = "至少需要输入" + $(elem).attr("min") + "位字符";
                    result = false;
                }
            }
            if ($(elem).attr("max") !== false) {
                if (value.length > +($(elem).attr("max"))) {
                    this.opt.tips_length = "最多只能输入" + $(elem).attr("max") + "位字符";
                    result = false;
                }
            }
            return result;
        },
        ajaxValidate: function (value, $elem) {
            function getPostParams(url) {
                var vars = {}, hash;
                var hashes = url.slice(url.indexOf('?') + 1).split('&');
                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split('=');
                    vars[hash[0]] = hash[1];
                }
                return vars;
            }

            var isValid = false;
            var type = ($elem.attr('ajaxtype') || 'POST').toUpperCase();
            var url = $elem.attr('ajaxurl');
            var _data = { value: value };
            if (type == "POST") {
                _data = $.extend(_data, getPostParams(url));
                url = url.substr(0, url.indexOf('?'));
            }
            $.ajax({
                type: type,
                url: url,
                data: _data,
                dataType: 'json',
                timeout: 300,
                async: false,
                success: function (result) {
                    if (result.msg) {
                        _this.opt.tips_ajaxvalid = result.msg;
                    }
                    isValid = result.Status && result.Tag;
                },
                error: function (xhr, type) {
                    console.log(arguments);
                }
            })
            return isValid;
        },
        chekXishiquAccount: function (value, regExp1, regExp2) {
            if (value !== "") {
                return regExp1.test(value) || regExp2.test(value);
            }
            return true;
        }
    };

})(Zepto);