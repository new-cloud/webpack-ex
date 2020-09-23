const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    //配置环境  production生产环境    development开发环境
    mode: 'development', //不指定 默认为生产环境 
    entry: __dirname + "/src/main",//已多次提及的唯一入口文件
    output: {  //输出配置
      //打包后的文件存放的地方
      //__dirname指在当前webpack.config.js文件路径下 生成一个dist文件夹
      path: path.resolve(__dirname, 'dist'),
      //打包后输出文件的文件名   文件名后加.min打包后为压缩文件   在默认的生产环境中不加.min也是生成压缩后的文件
      //.[hash] 每一次生成的文件名都带着哈希值 也是为了清除缓存
      filename: "bundle.[hash].js"
    },
    //开发环境才需要的配置
    devServer: {
      port: 3000, //端口号
      progress: true, //显示打包编译的进度
      contentBase: __dirname + "/public",//本地服务器所加载的页面所在的目录
      // open: true, //编译自动打开浏览器
      // historyApiFallback: true,//不跳转
      // inline: true//实时刷新
    },
    //使用插件
    plugins: [
      new HtmlWebpackPlugin({
        //指定要编译的模板文件 不指定模板会按照默认模板生成一个html页面
        template: __dirname + '/public/index.html',
        //输出的文件名
        filename: 'index.html',
        //让我们引入的JS后面加上HASH戳,清除浏览器对JS的缓存
        // hash: true,
        //控制压缩  生产环境自动压缩
        // minify: {
        //   collapseBooleanAttributes: true,
        //   ....
        // }
      })
    ]
  }