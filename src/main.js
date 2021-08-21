import './assets/index.css'
import './assets/index.less'
import './assets/index2.less'
console.log('call me 老yuan')

setTimeout(function () {
    console.log('0');
}, 0)
let promise = new Promise(function (resolve, reject) {
    console.log('1');
    resolve(3);
    console.log('2');
});

promise.then(function (value) {
    console.log(value);
});
console.log('Hi!');