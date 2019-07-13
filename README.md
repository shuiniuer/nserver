nserver
=========

基于express开发的静态文件转发服务器

## 使用方法

1. `git clone https://github.com/shuiniuer/nserver.git`

2. `cd nserver`

3. `npm install --registry http://registry.cnpmjs.org`

4. `cp config.sample.json config.json`

5. 修改配置文件`config.json`（参考：配置说明）

6. 启动`npm start`
	

## 配置说明

一台计算机可以配置多个静态服务

```
module.exports = {
    servers:[
        // a.com
        {
            domain: 'a.com', // 服务域名 a.com
            rootPath: '/Users/niuer/www/nserver/demo/a.com' // a.com 的根目录
        },
		// b.com
		{
		    domain: 'b.com', // 服务器域名  b.com
		    rootPath: '/Users/niuer/www/nserver/demo/b.com' // b.com 的根目录
		}
    ]
};
```

## host绑定

更改机器host绑定，直接使用域名访问

```
127.0.0.1 a.com
127.0.0.1 b.com
```