# preview3d （3d 预览组件） 文档
-------------

请在引入preview3d之前引入main.js     
> ``<script src="//static.3dker.cn/global/js/main.js"></script>``

在使用preview3d之前,首先你需要引入对应的html,css以及js文件

#### html的引入:
> ``{% include "components/preview3d.html" %}``

#### css引入方式分为两种：

> @import的引入方式 ( 推荐 ):    
`` @import "/preview3d.css" 按照less文件的规则引入当前页面对应的css中``

> &nbsp;
> &nbsp;

> link标签的引入方式:    
``<link rel="stylesheet" type="text/css" href="//static.3dker.cn/global/components/preview/preview3d.css" /> ``

#### js引入方式：

 
>``<script type="text/javascript" src="//static.3dker.cn/gallery/three/3d.js"></script>
   <script type="text/javascript" src="//static.3dker.cn/global/components/preview/preview.js"></script>``

#### preview : 
> &nbsp;
`` Shining.preview3d( url, options, callback );``    
    
#### url参数说明：
    url 为 需要预览的模型地址 目前 仅支持 stl 和  obj 
    
#### options参数说明：
    
    refer : "/list/list.html",              //后退的地址
    retreat : true                          //如果 retreat  是 布尔值，则决定后退按钮的显示与否, 如果是一个函数，则为后退按钮的回调函数
        
    enterFullCallback : function (){},      //进入全屏后的回调
    existFulCallback : function (){},       //退出全屏后的回调

    logo : true,                            //默认带有logo
    controls_gui : true,                    //默认带有3d模型控制器

    cameraFar : 1000,                       //相机视角巨大距离
    width : 1180,                           //窗口宽度
    height : 600,                           //窗口高度
    clearColor : 0x31343d,                  //画布色彩
    antialias : true,                       //抗锯齿
    cameraPositionZ : 200,                  //相机距离屏幕的距离
    lightColor : 0xffffff,                  //光线颜色
    lightIntensity : 1,                     //光线强度
    meshColor : 0xeeeeee,                   //模型颜色

    speed : 0.01,                           //gui控制模型的速度(上下 / 左右)
    distanceSpeed : 5,                      //gui控制模型的速度(远 / 近)
    minDistance : 10,                       //摄像机最小距离
    maxDistance : 900,                      //摄像机最大距离
    rotateSpeed : 1.0,                      //旋转速度
      
#### callback 参数说明：

    当模型加载失败的时候, 会返回一个error
    
#### example：   [demo](http://127.0.0.1/doc/preview/preview.html)
    
    Shining.preview3d("http://static.3dker.cn/model/treefrog.stl", {
        width : window.innerWidth,
        height: window.innerHeight
    }, function (e){
        if( e.target.status == 404 ){
            alert("资源不存在!);
        }
    });

