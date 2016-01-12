datalazyload使用方法
=========

### 图片懒加载
页面中img标签的书写方式:

        <img data-lazyload-src="http://3dker.cn/resource/thumb/6y6CvDnaYzx4ziPkR.476.354" src="//img.3dker.cn/blank.png" alt="游戏+动漫+玩具"/>
[图片懒加载demo](./demo/img.html)


### 方法懒加载
绑定懒夹杂的方法的dom节点书写方式:

        <!-- lazyFunc 是要懒执行的方法的名称-->
        <div class="lazyload-fn" data-lazyload-fn-body="lazyFunc">
        </div>
js的书写方式

        //定义一个全局方法，建议使用namespace的方式
        function lazyFunc(){
            alert(999);
        }
[方法懒加载demo](./demo/function.html)