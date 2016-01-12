nserver
=========

nserver是一个使用node js开发的服务器


## 使用方法


在使用之前需要你的机子安装node环境，然后进行以下步骤

    1. git clone ssh://git@git.3dker.com:10022/front/nserver.git
    
    2. cd nserver
    
    3. npm install --registry http://registry.cnpmjs.org # 安装依赖库
    
    4. cp config.js.sample config.js
    
    5. 参考配置说明修改config.js
    
    6. 启动
        sudo node bin/nserver cn //启动中文站
        sudo node bin/nserver en //启动英文站
        sudo node bin/nserver cn_admin //启动后台管理系统

[注] 

1. 默认是运行在80端口上，所以需要管理员权限
2. win下启动有少许差异，请自行调整
3. config.js.sample是配置示例文件，需要重命名为 config.js修改成适合您的情况才能运行


## config.js 说明

    var projectArr = [
        {
            name: 'cn',
            root: '/Users/niuer/www/cn_front/',//中文站项目目录
            domain: 'frontdev.3dker.cn'
        },
        {
            name: 'cn_admin',
            root: '/Users/niuer/www/cn_admin_front/',//后台管理系统项目目录
            domain: 'frontdev.admin.3dker.cn'
        },
        {
            name: 'en',
            root: '/Users/niuer/www/en_front/',//英文站项目目录
            domain: 'frontdev.3dker.com'
        }
    ];
    
    var noProductFlag = true;
    
    var options = process.argv;
    
    var hostConf = {};
    var domainConf = {};
    
    var temp = {};
    for (var i = 0; i < projectArr.length; i++) {
        temp = projectArr[i];
    
        domainConf[temp.domain] = temp.root;
    
        if( options.indexOf(temp.name) > -1 ){
            hostConf['static.3dker.cn'] = {
                root: temp.root + 'static',
                rewrite: [
                    {
                        from: '^(.*)$',
                        to: '$1'
                    }
                ]
            };
    
            hostConf['img.3dker.cn'] = {
                root: temp.root + 'img',
                rewrite: [
                    {
                        from: '^(.*)$',
                        to: '$1'
                    }
                ]
            };
    
            hostConf[temp.domain] = {
                root: temp.root + 'html',
                rewrite: [
                    {
                        from: '^(.*)$',
                        to: '$1'
                    }
                ]
            };
    
            // 单独设置后台管理系统
            if(temp.name === 'cn_admin'){
                hostConf['admin-static.3dker.cn'] = {
                    root: temp.root + 'static',
                    rewrite: [
                        {
                            from: '^(.*)$',
                            to: '$1'
                        }
                    ]
                };
    
                hostConf['admin-img.3dker.cn'] = {
                    root: temp.root + 'img',
                    rewrite: [
                        {
                            from: '^(.*)$',
                            to: '$1'
                        }
                    ]
                };
            };
    
            noProductFlag = false;
        }
    
        temp = {};
    };
    
    if(noProductFlag){
        throw new Error('你的nserver配置中没有对相应的项目进行相应的配置！');
    }
    
    exports = module.exports = {
        port: 80,//端口号
        filters:[
            'app',
            'less',
            'markdown',
            'html',
            'jade',
            'stylus',
            'delay',
            'host',
            'rewrite'
        ],
        hosts: hostConf,
        htmlParseRoot: domainConf
    };
    

## host绑定
    
启动nserver后打开[http://127.0.0.1/host](http://127.0.0.1/host)
    
    #cn_front
        127.0.0.1 frontdev.3dker.cn
    
    #cn_admin_front
        127.0.0.1 frontdev.admin.3dker.cn
        127.0.0.1 admin-static.3dker.cn
        127.0.0.1 admin-img.3dker.cn
    
    #en_front
        127.0.0.1 frontdev.3dker.com
    
    #static
        127.0.0.1 static.3dker.cn
        127.0.0.1 img.3dker.cn
    
    