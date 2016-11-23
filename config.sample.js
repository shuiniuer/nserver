var projectArr = [

    // h5.sosho.cn
    {
        name: 'front_mw_front_html',
        domain: 'front.h5.sosho.cn',
        rootpaths:[
            {
                from: '/page',
                to:'/Users/niuer/www/mw/front.page.sosho.cn/src/html/',
                staticPrefix: 'http://front.res.sosho.cn/pageres'
            },
            {
                from: '',
                to: '/Users/niuer/www/mw/front.h5.sosho.cn/html/',
                staticPrefix: 'http://front.res.sosho.cn'
            }
        ],
        rewrite: [
            {
                from: '^/page/(.*)$',
                to:'/Users/niuer/www/mw/front.page.sosho.cn/src/html/$1'
            },
            {
                from: '^(.*)$',
                to: '/Users/niuer/www/mw/front.h5.sosho.cn/html/$1'
            }
        ]
    },
    {
        name: 'front_mw_front_static',
        domain: 'front.res.sosho.cn',
        rootpaths: [
            {
                from: '/pageres',
                to:'/Users/niuer/www/mw/front.page.sosho.cn/src/static/'
            },
            {
                from: '',
                to: '/Users/niuer/www/mw/front.h5.sosho.cn/static/'
            }
        ],
        rewrite: [
            {
                from: '^/pageres/(.*)$',
                to:'/Users/niuer/www/mw/front.page.sosho.cn/src/static/$1'
            },
            {
                from: '^(.*)$',
                to: '/Users/niuer/www/mw/front.h5.sosho.cn/static/$1'
            }
        ]
    }
];



var noProductFlag = true;

var options = process.argv;
var imgConf = {};

var hostConf = {};
var domainConf = {};
var staticPrefix = {};

var temp = {};
for (var i = 0; i < projectArr.length; i++) {
    temp = projectArr[i];

    domainConf[temp.domain] = temp.rootpaths;

    hostConf[temp.domain] = {
        rewrite: temp.rewrite
    };

    noProductFlag = false;

    temp = {};
}


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
    roots: domainConf
};
