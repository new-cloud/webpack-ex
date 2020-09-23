
//ES6modelu的规范
import {bibi} from './es6';

//common.js规范  Node 环境下的规范
let {dedounce} = require('./common');
//引入CSS
require('./assets/index.css');

dedounce();
bibi();
console.log('public')
