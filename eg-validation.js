
!function($) {
    $.fn.validation = function(options) {
        return this.each(function() {

            globalOptions = $.extend({}, $.fn.validation.defaults, options);
            validationForm(this)
        });
    };
    $.fn.validation.defaults = {
        //校验规则
        rules :{
            'required':{validate: function(value) {return ($.trim(value) != '');}, defaultMsg: '不能为空'},
            'number':{validate: function(value) {return (/^[0-9]\d*$/.test(value));}, defaultMsg: '请输入数字。'},
            'email':{validate: function(value) {return (/^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/.test(value));}, defaultMsg: '请输入邮箱地址'},
            'char':{ validate: function(value) {return (/^[a-zA-Z]*$/.test(value));}, defaultMsg: '请输入英文字符'},
            'qq':{ validate: function(value) {return (/^[^0]\d{4,9}$/.test(value));}, defaultMsg: '请输入正确QQ'},
            'phone':{ validate: function(value) {return (/^((\(\d{2,3}\))|(\d{3}\-))?1(3|4|5|6|8)\d{9}$/.test(value));}, defaultMsg: '请输入正确手机号码'},
            'password':{ validate: function(value) {return (safePassword(value));}, defaultMsg: '密码由字母和数字组成，至少6位'},
            'equalto':{ validate: function(value,param) { return ((value != $(param).val()));}, defaultMsg: '两次输入的字符不一至'},
            'idcard':{ validate: function(value) {return (idCard(value));}, defaultMsg: '身份证号码不正确'},
            'chinese':{ validate: function(value) {return (/^[\u4e00-\u9fff]$/.test(value));}, defaultMsg: '请输入汉字'},
            'minlength':{ validate: function(value,param) {return (value.length>=param);}, defaultMsg: '请输入至少{param}位'},
            'mlength':{ validate: function(value,param) {return (value.length<=param);}, defaultMsg: '请输入最多{param}位'},
            'pattern':{ validate: function(value,param) {return (new RegExp(param).test(value));}, defaultMsg: '请根据规则输入'},

        },
        //表单是否提交
        isSubmit:true

    }


    /*身份证验证*/
    var idCard = function (value) {
        if (value.length == 18 && 18 != value.length) return false;
        var number = value.toLowerCase();
        var d, sum = 0, v = '10x98765432', w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], a = '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91';
        var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/);
        if (re == null || a.indexOf(re[1]) < 0) return false;
        if (re[2].length == 9) {
            number = number.substr(0, 6) + '19' + number.substr(6);
            d = ['19' + re[4], re[5], re[6]].join('-');
        } else d = [re[9], re[10], re[11]].join('-');
        if (!isDateTime.call(d, 'yyyy-MM-dd')) return false;
        for (var i = 0; i < 17; i++) sum += number.charAt(i) * w[i];
        return (re[2].length == 9 || number.charAt(17) == v.charAt(sum % 11));
    }

    var isDateTime = function (format, reObj) {
        format = format || 'yyyy-MM-dd';
        var input = this, o = {}, d = new Date();
        var f1 = format.split(/[^a-z]+/gi), f2 = input.split(/\D+/g), f3 = format.split(/[a-z]+/gi), f4 = input.split(/\d+/g);
        var len = f1.length, len1 = f3.length;
        if (len != f2.length || len1 != f4.length) return false;
        for (var i = 0; i < len1; i++) if (f3[i] != f4[i]) return false;
        for (var i = 0; i < len; i++) o[f1[i]] = f2[i];
        o.yyyy = s(o.yyyy, o.yy, d.getFullYear(), 9999, 4);
        o.MM = s(o.MM, o.M, d.getMonth() + 1, 12);
        o.dd = s(o.dd, o.d, d.getDate(), 31);
        o.hh = s(o.hh, o.h, d.getHours(), 24);
        o.mm = s(o.mm, o.m, d.getMinutes());
        o.ss = s(o.ss, o.s, d.getSeconds());
        o.ms = s(o.ms, o.ms, d.getMilliseconds(), 999, 3);
        if (o.yyyy + o.MM + o.dd + o.hh + o.mm + o.ss + o.ms < 0) return false;
        if (o.yyyy < 100) o.yyyy += (o.yyyy > 30 ? 1900 : 2000);
        d = new Date(o.yyyy, o.MM - 1, o.dd, o.hh, o.mm, o.ss, o.ms);
        var reVal = d.getFullYear() == o.yyyy && d.getMonth() + 1 == o.MM && d.getDate() == o.dd && d.getHours() == o.hh && d.getMinutes() == o.mm && d.getSeconds() == o.ss && d.getMilliseconds() == o.ms;
        return reVal && reObj ? d : reVal;
        function s(s1, s2, s3, s4, s5) {
            s4 = s4 || 60, s5 = s5 || 2;
            var reVal = s3;
            if (s1 != undefined && s1 != '' || !isNaN(s1)) reVal = s1 * 1;
            if (s2 != undefined && s2 != '' && !isNaN(s2)) reVal = s2 * 1;
            return (reVal == s1 && s1.length != s5 || reVal > s4) ? -10000 : reVal;
        }
    };



    var getRules = function (field) {
        var rules = {};
        $.each(field.attributes,function (i, attr) {
            // rules[]
        });

    }


    var formState = false, fieldState = false, wFocus = false, globalOptions = {};


    /**
     * 位置
     * @type {{top: top, right: right, bottom: bottom, left: left}}
     */
    var pos = {
        top:function (el, dom, offset) {
            dom.css("margin-left", offset.left + "px");
            el.parent().prepend(dom);
        },
        right:function (el, dom, offset) {
            dom.css("left", (offset.left + el.outerWidth()) + "px");
            dom.css("top", (offset.top) + "px");
            dom.css("position", "absolute");
            el.after(dom);
        },
        bottom:function (el, dom, offset) {
            dom.css("margin-left", offset.left + "px");
            el.after(dom);
        },
        left:function (el, dom, offset) {
            dom.css("float", "left");
            el.before(dom);
        }

    };

    /**
     * 设置提示消息
     */
    var tips = function (el, type, msg, posName) {
        el.removeClass('error warn success tips');
		
        el.addClass(type);
		el.sib
        var offset = el.offset();
        var dom = $('<div/>');
        dom.text(msg);
        dom.addClass(type + "-inline");
        if (posName && pos[posName]){

            pos[posName](el, dom, offset);
        }else {
            pos["bottom"](el, dom, offset);
        }
    }






    /**
     *  校验表单字段
     * @param field
     * @returns {boolean}
     */
    var validateField = function(field) { // 验证字段
        var el = $(field), error = false, errorMsg = '';
		
	     el.siblings('[class$="-inline"]').remove();
        $.each(field.attributes,function (i, attr) {
            var name = attr.name;
            var param = null;
            if (!error && name　!= "eg-valid"  && name.indexOf("eg-") == 0 && name.indexOf("-inline") < 2 ){
                name = name.replace("eg-", "");
                errorMsg = attr.value;
                param = el.attr(attr.name + "-param")
                var rules = globalOptions.rules;
                var rule = rules[name];
				var  inline = el.attr(attr.name + "-inline") || el.attr("eg-inline");
				var  line = null;
				if (inline && (line=$(inline)).length != 0){
					line.removeClass('error error-inline warn warn-inline success success-inline tips tips-inline');
					line.text("");
				}
                if (null != rules[name] && !rule.validate.call(field, el.val(),param)){
                    errorMsg = (errorMsg == null)?rule.defaultMsg:errorMsg;
                    error = true;
                  
                 	if (inline && (line=$(inline)).length != 0){
                    
                        line.addClass( "error-inline");
                        line.text(errorMsg);
                    }else {
                        tips(el, "error", errorMsg, el.attr("eg-position"))
                    }
                }
            }


        });

        return error;


    };


    var validationForm = function(obj) { // 表单验证方法
        $(obj).submit(function() { // 提交时验证
            /**if (formState) { // 重复提交则返回
                return false;
            }**/
            formState = true;
            var validationError = false;
            $('input[eg-valid], textarea[eg-valid]', this).each(function () {
                var el = $(this);
                if("" == el.attr("eg-valid") || "true" ==  el.attr("eg-valid") ){
                    if (validateField(this)) {
                        if (wFocus == false) {
                            scrollTo(0, el[0].offsetTop - 50);
                            wFocus = true;
                        }

                        validationError = true;
                    }
                }

            });

            return globalOptions.isSubmit && !validationError;


        });


    };
}(window.jQuery);
