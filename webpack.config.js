const HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      path = require('path'),
      OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),//css压缩插件
      UglifyjsPlugin = require('uglifyjs-webpack-plugin'); //js压缩插件

module.exports = {
    // 配置优化规则
    // optimization: {
    //   minimizer: [ //为什么不生效!!!!!!!!!!!!!!!!!!!!CAO
    //     //压缩打包后的CSS
    //     new OptimizeCssAssetsPlugin(),
    //     //压缩JS
    //     new UglifyjsPlugin({
    //       cache: true,        //是否使用缓存
    //       parallel: true,     //是否并发编译
    //       // sourceMap: true,    //启动源码映射(方便调试)
    //     })
    //   ]
    // },
    //配置环境  production生产环境    development开发环境
    mode: 'development', //不指定 默认为生产环境 
    entry: __dirname + "/src/main",//已多次提及的唯一入口文件
    output: {  //输出配置
      //打包后的文件存放的地方 、、这里必须为绝对路径
      //__dirname指在当前webpack.config.js文件路径下 生成一个dist文件夹
      path: path.resolve(__dirname, 'dist'),
      //打包后输出文件的文件名   文件名后加.min打包后为压缩文件   在默认的生产环境中不加.min也是生成压缩后的文件
      //.[hash] 每一次生成的文件名都带着哈希值 也是为了清除缓存
      filename: "static/js/bundle.min.[hash].js"
    },
    devtool: "inline-source-map",  //这是消除一个警告，待研究？？
    //开发环境才需要的配置
    //启动一个本地服务， 会将编译好的文件放进虚拟内存当中，可以在控制台 Sources中查看
    devServer: {
      port: 3000, //端口号
      progress: true, //显示打包编译的进度
      contentBase: __dirname + "/public",//本地服务器所加载的页面所在的目录
      // open: true, //编译自动打开浏览器
      // historyApiFallback: true,//不跳转
      // inline: true//实时刷新
    },
    //使用插件 打包hmtl  并且会自动引入css js 到html当中
    plugins: [
      new HtmlWebpackPlugin({
        //指定要编译的模板文件 不指定模板会按照默认模板生成一个html页面
        template: __dirname + '/public/index.html',
        //输出的文件名
        filename: 'index.html',
        // hash: true,    //让我们引入的JS后面加上HASH戳,清除浏览器对JS的缓存  上面使用了.[hash] 这里就不用使用
        //控制压缩html页面  生产环境自动压缩
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          //等等....
        }
      }),
      new MiniCssExtractPlugin({
        // filename: 'static/css/[name].min.[hash].css',
        filename: '[name].min.[hash].css',
      }),
      //压缩打包后的CSS
      new OptimizeCssAssetsPlugin(),
      //压缩JS
      new UglifyjsPlugin({
        cache: true,        //是否使用缓存
        parallel: true,     //是否并发编译
        // sourceMap: true,    //启动源码映射(方便调试)
      })
    ],
    //使用加载器loader处理规则  
    module: {
      rules: [
        //打包CSS 打包之前需要在全局入口文件 main.js中引入css文件
        {
          test: /\.(css|scss)$/, //基于正则匹配处理那些文件
          //使用那些loader  (执行顺序：从右到左执行解析)
          use: [
            MiniCssExtractPlugin.loader, //抽离css
            // "style-loader", //把编译好的CSS插入到页面(index.html)的头部head标签中的style标签中去
            "css-loader",   //解析css文件中@import/url()
            "postcss-loader",  //使用autoprefixer为CSS样式添加前缀  这里需要安装autoprefixer和postcss-loader
            //注意: autoprefixer 安装的时候要是8.0.0版本  高版本可能会报错(版本不兼容) npm i autoprefixer@8.0.0 --save-dev 安装8.0版本
            // {
            //   loader: 'resolve-url-loader',  //辣鸡没生效
            //   // options: { sourceMap: true }
            // },
            {
              loader: 'sass-loader',  //解析sacc成css
              // options: { sourceMap: true }
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,//排除掉node_module目录
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'], //转码规则
                plugins: [ // 处理特殊语法
                  ["@babel/plugin-proposal-decorators", {"legacy": true}], // 这个是装饰器
                  ["@babel/plugin-proposal-class-properties", { "loose": true }],  
                ]
              }
            }
          ]
        },
        // {
        //   //处理图片
        //   test: /\.(png|jpg|jpeg|gif|ico|webp)$/i,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         esModule: false
        //       }
        //     }
        //   ],
        // },
        {   //图片处理使用 url-loader 代替 file-loader
          test: /\.(png|jpg|jpeg|gif|ico|webp)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 1024 * 50, // 50k以内的图片转Base64打包到js中
              name: '[name].[hash:7].[ext]', // 打包的文件名
              outputPath: 'static/img/',
              esModule: false
            }
          }]
        },
        {
          //处理html文件中导入的图片
          test: /\.(html|htm|xml)$/i,
          use: ['html-withimg-loader']
        }
      ]
    }
      
  }