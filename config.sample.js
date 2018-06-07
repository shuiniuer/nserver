module.exports = {
    servers:[

        // SW
        {
            domain: 'v3.sosho.cn',
            rootPath: '/Users/niuer/www/www.v3.sosho.cn/src/html',
            staticPrefix: '//res.v3.sosho.cn'
        },
        {
            domain: 'res.v3.sosho.cn',
            rootPath: '/Users/niuer/www/www.v3.sosho.cn/src/static'
        },

        // H5
        {
            domain: 'front.h5.sosho.cn',
            rootPath: '/Users/niuer/www/mw/front.h5.sosho.cn/html',
            staticPrefix: '//front.res.sosho.cn',
            rewrite: [
                {
                    from: '^/page/(.*)$',
                    rootPath:'/Users/niuer/www/mw/front.page.sosho.cn/src/html',
                    staticPrefix: "//front.res.sosho.cn/pageres"
                }
            ]
        },
        {
            domain: 'front.res.sosho.cn',
            rootPath: '/Users/niuer/www/mw/front.h5.sosho.cn/static',
            rewrite: [
                {
                    from: '^/pageres/(.*)$',
                    rootPath:'/Users/niuer/www/mw/front.page.sosho.cn/src/static'
                }
            ]
        }
    ]
};