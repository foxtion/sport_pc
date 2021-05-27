const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
    runtimeCompiler: true,
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "assets",
    lintOnSave: false,
    devServer: {
        port: 82,
        proxy: {
            "/appapi": {
                //target: "http://www.qiuhu.tv/appapi/", 
                // target: "http://172.17.10.51:81/appapi/", //一度
                 target: "http://107.148.224.65:84/appapi/",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/appapi": "/"
                }
            }
        }
    },

    chainWebpack: (config) => {
        config.resolve.alias.set('@', resolve('src')).set('api', resolve('src/api')).set('_s', resolve('src/server'))
    }
};