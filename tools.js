
/**
 * call 简单来说就是改变执行方法当前的 this，可以传入不定参数
 * call 做了以下事情：
 * 1、将函数设为对象的属性
 * 2、执行并删除这个函数
 * 3、指定this到函数并传入给定参数执行函数
 * 4、如果不传入参数，默认指向为 window
 * @param {*} context 
 */
Function.prototype.myCall = function(context) {
    context = context || window;

    // 将函数设为对象的属性，通过 this 获取调用 call 的函数
    // fn 是对象的属性名，起什么都无所谓
    context.fn = this;

    // 从 arguments 对象中获取从call方法传入的除第一个之外的其它参数
    let args = [];
    for (let i = 1, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }

    // 执行该函数
    context.fn(...args);
    // 缓存函数执行的结果
    let result = context.fn(...args);
    // 删除该函数
    delete context.fn;
    //返回函数执行的结果
    return result;
}


/**
 * apply 方法也是改变执行方法当前的 this，但传递参数的格式不同，需要数组
 * apply 做了以下事情：
 * 1、将函数设为对象的属性
 * 2、执行并删除这个函数
 * 3、指定this到函数并传入给定参数执行函数
 * 4、如果不传入参数，默认指向为 window
 * @param {*} context 
 * @param {*} arr 
 */
Function.prototype.myApply = function(context, arr) {
    // 如果 context 不是一个对象，则默认指向 window
    context = Object(context) || window;

    //将函数设为对象的属性，通过 this 获取调用 apply 时的函数
    context.fn = this;
    // 定义变量缓存该函数执行的结果
    let result;
    if (!arr) {
        // apply 方法没有传入第二个参数(数组)，直接执行函数
        result = context.fn();
    } else {
        // apply 方法传入了第二个参数，将参数重新放入 args 中
        const args = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            args.push(i);
        }
        // 传入参数执行该函数
        result = context.fn(...args)
    }
    // 删除该函数
    delete context.fn;
    // 返回函数执行的结果
    return result;
}



