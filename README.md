# eg-validation
## eg表单数据校验

## 简单入门

```html
<!DOCTYPE html>
<html>
<head>
    <title>Validation Form Template</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="jquery-1.11.3.min.js"></script>
    <script src="eg-validation.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>

<div class='well'>
    <form class="form-horizontal" id="form" action="###">
        <div >QQ:<input type="text" id="email" eg-valid="true" name="email"  eg-tips="请输入QQ号" eg-qq  eg-success="校验通过"  > </div>
        <div >邮箱<input type="text"  eg-valid eg-email="正确的邮箱" eg-tips="请输入邮箱"  eg-required   eg-position="bottom"></div>
        <button type="submit" class="btn">登录</button>
    </form>
</div>

<script type="text/javascript" charset="utf-8">
    $(function () {
        $('#form').validation();
    })
</script>
</body>
</html>
```


#### 以下为字段基本属性的解释

```
    1. eg-valid                     是否开启校验 默认值：true
    
    2. eg-tips                      空文本域获取焦点后的提示消息
    
    3. eg-position                  校验结果展示位置 top、right、bottom、left  默认值：right
    
    4. eg-inline                    文本域所有的校验结果指定节点展示
    
    5. eg-{校验规则名}               开启对应的校验规则， 值为校验提示文本
    
    6. eg-{校验规则名}-param         校验规则对应的附加参数，非必须，根据校验规则参数而定，多个用","(逗号)隔开
    
    7. eg-{校验规则名}-inline        文本域指定的校验规则校验结果指定节点展示
    
    8. eg-success                    文本域校验通过后的提示信息  默认值： 校验通过
    
```


    
#### 以下几种默认的校验规则

```

    1. required                     必须输入的字段
    
    2. number                       必须输入合法的数字（负数，小数）
    
    3. digits                       必须输入整数
    
    4. decimal                      必须输入货币
    
    5. date                         必须输入正确格式的日期。日期校验 ie6 出错，慎用
    
    6. url                          必须输入正确格式的网址
    
    7. email                        必须输入正确格式的电子邮件
    
    8. char                         必须输入英文字符
    
    9. qq                           必须输入正确QQ
    
    10. phone                        必须输入正确手机号码
    
    11. equalto                      必须输入两次一至的字符，匹配文本域的唯一标识 ： eg-equalto-param=#password 
    
    12. chinese                      必须输入输入汉字
    
    13. minlength                    必须输入至少3位，eg-minlength-param=3
    
    14. maxlength                    必须输入至多6位，eg-minlength-param=6
    
    15. length                       必须输入长度必须介于 {3} 和 {6} 之间的字符串（汉字算一个字符）， eg-length-param=3,6
    
    16. min                          输入值不能小于3， eg-min-param=3
    
    17. max                          输入值不能大于6， eg-min-param=6
    
    18. pattern                      输入匹配对应的正则表达式， eg-pattern-param=/^\d+$/
  
      
```





#### 以下讲解该校验组件可使用的几个选项的属性(构造时传入的参数)

```text

    1. rules                        对象，校验规则集 
    
    2. isSubmit                     布尔型，校验通过后是否进行表单提交， 默认：true 进行表单提交
    
    2. valiAfter                    方法，所有表单域校验完成后回调方法

```

#### 下面对rules规则集的属性讲解

**简单案例**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Validation add rules  Template</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="jquery-1.11.3.min.js"></script>
    <script src="eg-validation.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>

<div id="form">
    <div >zip:<input type="text" eg-valid="true" eg-zip  eg-success="校验通过"> </div>
 </div>

<script type="text/javascript" charset="utf-8">
    $(function () {
        //这里增加邮编进行校验
        $('#form').validation({
               rules :{'zip':{validate: function(value) {return (/^[1-9][0-9]{5}$/.test(value) || /^.{4,15}$/.test(value));}, defaultMsg: '请输入正确邮编'}}
        });
    })
</script>
</body>
</html>
   
```

#### 以下对eg-inline的使用案例  

```html

<!DOCTYPE html>
<html>
<head>
    <title>Validation inline Form Template</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="jquery-1.11.3.min.js"></script>
    <script src="eg-validation.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
<div id="form">
    <div >email1:<input type="text" eg-valid="true" eg-email=""  eg-required  eg-success="校验通过" eg-inline="#eg-inline"> </div>
    <div >email2:<input type="text" eg-valid="true" eg-email  eg-required  eg-email-inline="#eg-email-inline"> </div>
</div>
<br/>
email1 所有校验提示在此展示：<div id="eg-inline"></div>
<br/>
email2 邮箱校验提示在此展示：<div id="eg-email-inline"></div>
<br/>

<script type="text/javascript" charset="utf-8">
    $(function () {
        //这里增加邮编进行校验
        $('#form').validation({
            isSubmit: false
        });
    })
</script>
</body>
</html>

```


