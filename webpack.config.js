// webpack打包配置文件
// webpack是基于node开发的一个文件打包的工具
// 导入path模块
const path = require('path')

// 配置热更新的第二步导入webpack包
const webpack = require('webpack')

// 导入html-webpack-plugin插件包 只要是插件就放到plugins插件配置数组中去
const htmlWebpackPlugin = require('html-webpack-plugin')

// vue-loader-plugin插件导入
const VueLoaderPlugin = require("vue-loader/lib/plugin")

// 定义一个配置对象
let config = {
    entry: path.resolve(__dirname, './src/main.js'), // 项目入口文件
    output: { // 项目输出选项
        path: path.resolve(__dirname, './dist'), // 项目输出路径
        filename: 'bundle.js' // 输出文件名
    },
    module: { // 配置第三方loader模块的
        rules: [ // 文件的配置规则
            // test是处理匹配对应loader的文件规则 
            // use 是使用对应的loader解析文件
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理对应的文件规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //匹配less文件配置loader处理
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 匹配和配置sass文件loader
            {
                test: /\.(png|jpg|gif|svg|jpeg|bmp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 32000,
                        name: '[hash:8]-[name].[ext]'
                    }
                }]
            }, //处理url 的loader
            // limit 是给定的值 是图片的大小 单位是字节 如果limit的值大于图片大小
            // 则图片的路径会转base64编码 如果小于或等于 则不是bas64编码
            // 如果要给某个loader传参可以使用问号传参的方式 还可以配置options对象
            { test: /\.(woff|woff2|eot|ttf|otf|svg)$/, use: ['url-loader'] }, //配置字体规则 处理字体loader
            { test: /\.js$/, use: 'babel-loader', exclude: /(node_modules|bower_components)/ },
            { test: /\.vue$/, use: ['vue-loader'] } //处理vue文件的loader
        ]
    },
    devServer: { // 配置dev-server参数的第二种方式
        open: true,
        port: 3000,
        contentBase: 'src', // 指定物理磁盘的启动页
        hot: true, // 配置热更新的第一步
        compress: true,
        inline: true
    },
    // 安装 html-webpack-plugins插件来配置项目目录的启动页
    plugins: [ // 添加plugins节点配置文件
        new htmlWebpackPlugin({ // 内存中的启动页
            template: path.resolve(__dirname, 'src/index.html'), // 模板路径指定生成的内存页面
            filename: 'index.html' // 自动生成的html文件名称
        }),
        // 启用热更新的第三步 创建一个HotModuleReplacementPlugin模块热更新插件
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin() // 创建vueloaderPlugin插件并配置
    ],
    resolve: {
        alias: {
            // 'vue$': 'vue/dist/vue.js' // 设置导入模块的文件
        }
    }
}

// 导出配置对象
module.exports = config