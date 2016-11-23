nserver
=========

nserver是一个使用node js开发的服务器


## 使用方法


在使用之前需要你的电脑安装node环境，然后进行以下步骤

    1. git clone git@git.coding.net:usho/nserver.git

    2. cd nserver

    3. npm install --registry http://registry.cnpmjs.org # 安装依赖库

    4. cp project_config.json.sample project_config.json

    5. 参考配置说明修改 project_config.json [或者联系：水牛儿，QQ：2511615588]

    6. 启动

      windows系统
        node bin/nserver

      linux/mac系统
        sudo node bin/nserver


## project_config.json 说明 [或者联系：水牛儿，QQ：2511615588]

    [
        {
            "name": "front_html",
            "root": "C:\\Users\\cc\\www\\front.m.sosho.cn\\html", // 应用所在的本地目录
            "domain": "dev.m.sosho.cn", // 应用本地开发域名
            "staticPrefix": "static-m.sosho.cn" // 应用静态资源的引用域名[注：若该应用不需要引入静态资源，则可以省略]
        },
        {
            "name": "front_static",
            "root": "C:\\Users\\cc\\www\\front.m.sosho.cn\\static",
            "domain": "static-m.sosho.cn"
        }
    ]

## host绑定

启动nserver后打开[http://127.0.0.1/host](http://127.0.0.1/host)

      127.0.0.1 dev.m.sosho.cn
      127.0.0.1 static-m.sosho.cn

[注]

  1. windows系统下面需要给hosts文件添加写入权限 [有疑问请联系：水牛儿，QQ：2511615588]
