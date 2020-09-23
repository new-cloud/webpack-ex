
//ES6modelu的规范
import {bibi} from './es6';

//common.js规范  Node 环境下的规范
let {dedounce} = require('./common');

dedounce();
bibi();
console.log('public')
