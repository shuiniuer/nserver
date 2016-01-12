# paging 文档
-------------
在使用paging之前,首先你需要引入对应的html,css以及js文件

#### html的引入:
> ``{% include "components/paging.html" %}``

#### css引入方式分为两种：

> @import的引入方式 ( 推荐 ):    
`` @import "/paging.css" 按照less文件的规则引入当前页面对应的css中``

> &nbsp;
> &nbsp;

> link标签的引入方式:    
``<link rel="stylesheet" type="text/css" href="//static.3dker.cn/global/components/paging/paging.css" /> ``

#### js引入方式同样分为两种：

> ImportJavscript的引入方式 ( 推荐 )   
``ImportJavscript.url("global/components/paging/paging.js") `` 

> &nbsp;
> &nbsp;

> script标签引入的方式：   
``<script type="text/javascript" src="//static.3dker.cn/global/components/paging/paging.js"></script> ``


#### 使用paging : 

1) 通过url 切换paging

    Shining.paging( pageTotal );    

2) 通过ajax 切换paging

    var paging = Shining.paging({             
        current : 1,                //当前页              
        total : 10,                 //总页数                  
        noJump : false,             //没有跳转按钮                
        callback : function (page){ //每次点击翻页，都会返回当前页数    
            //ajax ...                
        }            
    });    
    paging.change(2, 10);   //跳转至第2页，总页数10页    
    
#### 参数说明：
    pageTotal : 总页数
    
#### example：   [demo](http://127.0.0.1/doc/paging/paging.html)

    Shining.paging( 10 );













