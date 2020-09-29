
//ES6modelu的规范
import {bibi} from './es6';

//common.js规范  Node 环境下的规范
let {dedounce} = require('./common');
//引入CSS
require('./assets/css/index.scss');
//在webpack下的JS中使用图片,需要把图片导入进来再使用
// let imgSrc = require('./assets/img/jianxian.jpg');

// let imgObj = new Image();
// imgObj.src = imgSrc;
// document.body.appendChild(imgObj);

function add(){
    return new Promise((rl)=>{
        setTimeout(()=>{
            console.log(0);
            rl()
        },2000);
    });
}
// async function ass(){     //要使用 async 和flat等 需要生产环境安装安装 @babel/runtime @babel/polyfill  开发环境安装@babel/plugin-transform-runtime
//     let res = await add();
//     console.log(3);
// }
// ass()
@log
class Ass{
    constructor(fn){
        this.a=10
    }
    static c = 33;
    sum(){
        console.log('class sum')
    }
    b=10; //并不支持这种特殊语法
}
function log(target){
    target.aa = 20;
}
new Ass().sum();
console.log(Ass.c)
console.log(Ass.aa)

dedounce();
bibi();
