!function($) {
    $.fn.validation = function(options) {
        $(document.head).append("<style>.error{border:1px solid #f00;padding:2px;}.error-inline{color:#ff5d5d;margin:05px;}.error-inline::before{content:'x';background-color:#ff5d5d;display:inline-block;width:14px;height:14px;line-height:10px;text-align:center;font-size:12px;border-radius:7px;overflow:hidden;color:#fff;margin-right:5px;}.warn{border:1px solid #ffdc2c;padding:2px;}.warn-inline{color:#ffdc2c;margin:05px;}.warn-inline::before{content:'!';background-color:#ffdc2c;display:inline-block;width:14px;height:14px;line-height:14px;text-align:center;font-size:12px;border-radius:7px;overflow:hidden;color:#fff;margin-right:5px;}.success{border:1px solid #11cd6d;padding:2px;}.success-inline{color:#11cd6d;margin:05px;}.success-inline::before{content:'√';background-color:#11cd6d;display:inline-block;width:14px;height:14px;line-height:14px;text-align:center;font-size:12px;border-radius:7px;overflow:hidden;color:#fff;margin-right:5px;}.tips{border: 1px solid #c6c6c6;padding:2px;}.tips-inline{color:#c6c6c6;margin:05px;}.tips-inline::before{content:'i';background-color:#c6c6c6;display:inline-block;width:14px;height:14px;text-align:center;font-size:12px;border-radius:7px;overflow:hidden;line-height:14px;color:#fff;margin-right:5px;}.inline-left{margin:05px;}.inline-right{margin:05px;position:absolute;}</style>");
        return this.each(function() {
            globalOptions = $.extend({}, $.fn.validation.defaults, options);
            validationForm(this)
        });
    };
    $.fn.validation.defaults = {
        //校验规则
        rules :{
            'required':{validate: function(value) {return ($.trim(value) != '');}, defaultMsg: '不能为空'},
            'number':{validate: function(value) {return ( /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value));}, defaultMsg: '请输入数字'},
            'digits':{validate: function(value) {return (/^\d+$/.test(value));}, defaultMsg: '必须输入整数'},
            'decimal':{validate: function(value) {return (/^\d{1,18}(.\d{1,2})?$/gi.test(value));}, defaultMsg: '请输入货币'},
            'date':{validate: function(value) {return (!/Invalid|NaN/.test(new Date(value).toString()));}, defaultMsg: '请输入货币'},
            'url':{validate: function(value) {return (/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value));}, defaultMsg: '请输入货币'},
            'email':{validate: function(value) {return (/^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/.test(value));}, defaultMsg: '请输入邮箱地址'},
            'char':{ validate: function(value) {return (/^[a-zA-Z]*$/.test(value));}, defaultMsg: '请输入英文字符'},
            'qq':{ validate: function(value) {return (/^[^0]\d{4,9}$/.test(value));}, defaultMsg: '请输入正确QQ'},
            'phone':{ validate: function(value) {return (/^((\(\d{2,3}\))|(\d{3}\-))?1(3|4|5|6|8)\d{9}$/.test(value));}, defaultMsg: '请输入正确手机号码'},
            'equalto':{ validate: function(value,param) { return ((value != $(param).val()));}, defaultMsg: '两次输入的字符不一至'},
            'chinese':{ validate: function(value) {return (/^[\u4e00-\u9fff]+$/.test(value));}, defaultMsg: '请输入汉字'},
            'minlength':{ validate: function(value,param) {return (value.length>=param);}, defaultMsg: '请输入至少{}位'},
            'maxlength':{ validate: function(value,param) {return (value.length<=param);}, defaultMsg: '请输入至多{}位'},
            'length':{ validate: function(value,param) {var p = param.split(",");return (value >= p[0] && value <= p[1]);}, defaultMsg: '输入长度必须介于 {} 和 {} 之间的字符串（汉字算一个字符）'},
            'min':{ validate: function(value,param) {return (value<=param);}, defaultMsg: '输入值不能小于{}'},
            'max':{ validate: function(value,param) {return (value>=param);}, defaultMsg: '输入值不能大于{}'},
            'pattern':{ validate: function(value,param) {return (new RegExp(param).test(value));}, defaultMsg: '请根据规则输入'},

        },
        //表单是否提交
        isSubmit:true,
        /**
         *  校验完成后回调事件
         */
        valiAfter:function ($this) {return true}
    }


    var formState = false,  wFocus = false, globalOptions = {};

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
        var offset = el.offset();
        var dom = $('<div/>');
        dom.text(msg);
        dom.addClass(type + "-inline");
        if (posName && pos[posName]){
            pos[posName](el, dom, offset);
        }else {
            pos["right"](el, dom, offset);
        }
    }

    /**
     * 规则匹配
     * @param el
     * @param attr
     * @param name
     */
    var matchRules = function (el, attr) {
        var name = attr.name.replace("eg-", "");

       var errorMsg = attr.value;
        var param = el.attr(attr.name + "-param")
        var rules = globalOptions.rules;
        var rule = rules[name];
        var  inline = el.attr(attr.name + "-inline") || el.attr("eg-inline");
        var  line = null;
        if (inline && (line=$(inline)).length != 0){
            line.removeClass('error error-inline warn warn-inline success success-inline tips tips-inline');
            line.text("");
        }
        if (null != rule && !rule.validate.call(el[0], el.val(),param)){
            errorMsg = (!errorMsg)?rule.defaultMsg:errorMsg;
            if (param){
                var p = param.split(",");
                for (var i in p){
                    errorMsg = errorMsg.replace("{}", p);
                }
            }
            if (inline && (line=$(inline)).length != 0){
                line.addClass( "error-inline");
                line.text(errorMsg);
            }else {
                tips(el, "error", errorMsg, el.attr("eg-position"))
            }
            return true;
        }
        return false;
    }

    /**
     *  校验表单字段
     * @param field
     * @returns {boolean}
     */
    var validateField = function(field) { // 验证字段
        var el = $(field), error = false;
		
	     el.siblings('[class$="-inline"]').remove();
        $.each(field.attributes,function (i, attr) {
            var name = attr.name;

            if (!error && name　!= "eg-valid"  &&  name.indexOf("eg-") == 0 && name.indexOf("-inline") < 2 ){
                if (name != "eg-required" ){
                    if (null != el.attr("eg-required") ){
                        if (matchRules(el, {name:"eg-required", value: el.attr("eg-required")})){
                            error =  true;
                        }
                    }else if (!field.value){
                        error =  true;
                    }
                }

                if (!error && matchRules(el, attr)){
                    error = true;
                }
            }
        });
        return  error;
    };
    var validation = function (el, that) {
        if("" == el.attr("eg-valid") || "true" ==  el.attr("eg-valid") ){
            if (validateField(that)) {
                if (wFocus == false) {
                    scrollTo(0, el[0].offsetTop - 50);
                    wFocus = true;
                }
                return true;
            }
            var successMsg = el.attr("eg-success");
            tips(el, "success", successMsg ? successMsg : "校验通过", el.attr("eg-position"))
            return false;
        }
    }

    var validationForm = function(obj) { // 表单验证方法
        $('input[eg-valid], textarea[eg-valid]', obj).each(function () {
            var el = $(this);
            el.focus(function () {
                if(el.attr("eg-tips")){
                    if(null == el.data("eg-inline")){
                        var inline = "";
                        $.each(this.attributes,function (i, attr) {
                            if (attr.name.indexOf("-inline") >= 3 && inline.indexOf(attr.value) == -1){
                                if ("" != inline){
                                    inline += ",";
                                }
                                inline += attr.value;
                            }
                        });
                        if("" == inline){
                            el.data("eg-inline", "!")
                        }else {
                            el.data("eg-inline", inline)
                        }
                    }
                    if ("!" != el.data("eg-inline")){
                       var  eg_inline = $(el.data("eg-inline"));
                        eg_inline.removeClass('error error-inline warn warn-inline success success-inline tips tips-inline');
                        eg_inline.html("");
                    }
                    el.removeClass('error error-inline warn warn-inline success success-inline tips tips-inline');
                    el.siblings('[class$="-inline"]').remove();
                    tips(el, "tips", el.attr("eg-tips"), el.attr("eg-position"))
                }
            });
            el.blur(function () {
                validation(el, this);
            });
            el.keyup(function () {
                validation(el, this);
                formState = false;
            });
        });

        $(obj).submit(function() { // 提交时验证
            if (formState) { // 重复提交则返回
                return false;
            }
            formState = true;
            var validationError = false;
            $('input[eg-valid], textarea[eg-valid]', this).each(function () {
                if (validation($(this), this)){
                    validationError = true;
                }
            });

            globalOptions.valiAfter(this);
            return globalOptions.isSubmit && !validationError;
        });
    };
}(window.jQuery);
