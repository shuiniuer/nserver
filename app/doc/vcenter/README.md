垂直居中使用方法
=========

### css引入
css引入方式有两种
1、@import的引入方式 ( 推荐 ):

    @import "/global/css/center.css" //按照less文件的规则引入当前页面对应的css中

2、link标签的方式引入

    <link rel="stylesheet" href="http://static.3dker.cn/global/css/center.css"/>


### dom结构
1、图片垂直居中

    <div class="fn-layout-center" style="height: 300px;background: #ccc;">
        <b class="fn-center-hack"></b>
        <div class="fn-center-body">
            <div class="fn-center-img">
                <img src="http://img.3dker.cn/index/leimu/leimu1.png" width="200"/>
            </div>
        </div>
    </div>



2、单行文字与多行文字垂直居中

    <div class="fn-layout-center" style="height: 300px;background: #ccc;">
        <b class="fn-center-hack"></b>
        <div class="fn-center-body">
            单行文字与多行文字垂直居中 <br/>
            单行文字与多行文字垂直居中
        </div>
    </div>


# demo

[demo地址](demo.html)