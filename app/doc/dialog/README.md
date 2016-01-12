# dialog 文档
-------------
在使用dialog之前,首先你需要引入对应的html,css以及js文件

#### html的引入:
> ``{% include "components/dialog.html" %}``

#### css引入方式分为两种：

> @import的引入方式 ( 推荐 ):    
`` @import "/dialog.css" 按照less文件的规则引入当前页面对应的css中``

> &nbsp;
> &nbsp;

> link标签的引入方式:    
``<link rel="stylesheet" type="text/css" href="//static.3dker.cn/global/components/dialog/dialog.css" /> ``

#### js引入方式同样分为两种：

> ImportJavscript的引入方式 ( 推荐 )   
``ImportJavscript.url("global/components/dialog/dialog.js") ``

> &nbsp;
> &nbsp;

> script标签引入的方式：   
``<script type="text/javascript" src="//static.3dker.cn/global/components/dialog/dialog.js"></script> ``


#### dialog : 
> &nbsp;
`` Shining.showDialog( options );``    
`` Shining.hideDialog();``    
    
    
#### options参数说明：
    title : "网络错误，请稍后重试!",       //显示出的内容,默认为`网络错误，请稍后重试!`
    autoHide : true,                    //是否自动隐藏,默认为`true`
    tapHide : true,                     //是否点击隐藏,默认为`true`
    autoHideTimeOut : 1400,             //自动隐藏时间,默认为`1400`毫秒
    showEffect : "fadeIn",              //显示时的动画,默认为`fadeIn`
    hideEffect : "fadeOut"              //隐藏时的动画,默认为`fadeOut`
    
#### example：   [demo](http://127.0.0.1/doc/dialog/dialog.html)
    
    //如果参数为String则参数为title
    Shining.showDialog("当前模型不存在!"); 
    
    //如果参数为 object 则启用options
    Shining.showDialog({
        title : "当前模型不存在！"
    });
    
    //如果需要手动关闭，提供一个hdieDialog用来关闭它 
    
    //showDialog运行后会返回一个id
    //可以指定关闭某一个dialog
    
    //如果不填写就关闭所有dialog
    Shining.hideDialog( id );                 














