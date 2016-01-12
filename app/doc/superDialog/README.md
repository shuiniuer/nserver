superDialog使用方法
=========

### 文件依赖
确保页面引入了main.js

    <script src="//static.3dker.cn/global/js/main.js"></script>


### 自己定义 做成 dialog dom节点以及其样式：宽度必须要定义，高度推荐定义
例如：

    <div id="dialog" style="height:100px;width:240px;background:#c00;">
        <div class="close">点我关闭</div>
    </div>

### js 代码

    (function($){
        $(function(){
            var dialog = $.dialog({
                selector:'#dialog',//定义要被show的元素的选择器
                minWidth:1180,//定义遮罩层的最小宽度
                zindex:99,//定义dialog的z-index
                timers:[//初始化时注册的时间回调
                    {
                        callback: function(paramObj){
                            alert(paramObj.timer);
                        },
                        time: 2000,
                        paramObj:{
                            timer: '过了2秒了'
                        }
                    }
                ],
                buttons:[//初始化的时候注册的事件回调
                    {
                        selector: '.close',
                        event:'click',
                        callback: function(paramObj,event){
                            alert(paramObj.nimei);
                            this.hide();
                        },
                        paramObj:{
                            nimei: 'nimei'
                        }
                    }
                ]
            });

            //调用show的方法显示dialog
            dialog.show();

            //调用hide()方法隐藏dialog
            //dialog.hide();
        });
    });


# demo

[demo地址](demo.html)