# upload （上传组件） 文档
-------------

请在引入upload之前引入main.js     
> ``<script src="//static.3dker.cn/global/js/main.js"></script>``

在使用preview3d之前,首先你需要引入对应的html,css以及js文件

#### html的引入:
> ``{% include "components/upload.html" %}``

#### css引入方式分为两种：

> @import的引入方式 ( 推荐 ):    
`` @import "/upload.css" 按照less文件的规则引入当前页面对应的css中``

> &nbsp;
> &nbsp;

> link标签的引入方式:    
``<link rel="stylesheet" type="text/css" href="//static.3dker.cn/global/components/upload/upload.css" /> ``

#### js引入方式：

>``<script type="text/javascript" src="//static.3dker.cn/global/components/upload/upload.js"></script>``
    
#### options参数说明：
        
#### example：   [demo](http://127.0.0.1/doc/upload/upload.html)
    
    var upload = Shining.upload();
    
    upload.show();  //显示上传面板
    upload.hide();  //隐藏.......
    