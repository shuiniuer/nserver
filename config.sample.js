var projectArr = [
    {
        name: 'cn',
        root: '/Users/niuer/www/cn_front/',
        domain: 'frontdev.3dker.cn'
    },
    {
        name: 'cn_admin',
        root: '/Users/niuer/www/cn_admin_front/',
        domain: 'frontdev.admin.3dker.cn'
    },
    {
        name: 'en',
        root: '/Users/niuer/www/en_front/',
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