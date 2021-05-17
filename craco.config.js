const CracoLessPlugin = require('craco-less');

module.exports = {
    babel:{  
        plugins: [
            [ 
                "import", 
            {
                "libraryName": "antd",
                "libraryDirectory": "es",
                "style": true //设置为true即是less
                }
            ]
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#096dd9' },//修改的主题颜色
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};