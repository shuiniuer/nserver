# confirm 文档
-------------
在使用confirm之前,首先你需要引入对应的html,css以及js文件

#### html的引入:
> ``{% include "components/confirm.html" %}``

#### css引入方式分为两种：

> @import的引入方式 ( 推荐 ):    
`` @import "/confirm.css" 按照less文件的规则引入当前页面对应的css中``

> &nbsp;
> &nbsp;

> link标签的引入方式:    
``<link rel="stylesheet" type="text/css" href="//static.3dker.cn/global/components/confirm/confirm.css" /> ``

#### js引入方式同样分为两种：

> ImportJavscript的引入方式 ( 推荐 )   
``ImportJavscript.url("global/components/confirm/confirm.js") ``

> &nbsp;
> &nbsp;

> script标签引入的方式：   
``<script type="text/javascript" src="//static.3dker.cn/global/components/confirm/confirm.js"></script> ``


#### 使用confirm : 
> &nbsp;
``Shining.showConfirm( options );``
    
    
#### options参数说明：
    title : "确定提交吗?",                       //默认提示语
    showEffect : "fadeIn",                      //显示时的动画, 默认为 `fadeIn`
    hideEffect : "fadeOut",                     //隐藏时的动画, 默认为 `fadeOut`
    bgColor : "white",                          //遮罩层颜色,可选 `black` / `white`
    btns : [{                                   //btns可以为一个 `object` 或者 数组中只有一个object,这样只会显示一个按钮
        title : "取消",                         //左侧默认按钮，显示为｀取消｀  
        callback : function (close){}          //点击按钮所触发的事件， 回调函数会返回一个`close`函数用于关闭组建
    }, {
        title : "确认",                         //右侧默认按钮，显示为｀确认｀  
        callback : function (close){}
    }]
    
#### example：   [demo](http://127.0.0.1/doc/confirm/confirm.html)
    
    Shining.showConfirm({
        title : "当前模型不存在！",
        btns : [{
            title : "我知道了",
            callback : function (close){
                close();
            }
        }]  
    });
    
    也可以这样
     Shining.showConfirm({
        title : "当前模型不存在！",
        btns : {
            title : "我知道了",
            callback : function (close){
                close();
            }
        }
     });
        
    
    














