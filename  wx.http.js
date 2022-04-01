// wx.request
const getData = (options) => {
    const { callback } = options;
    wx.request({
        url,
        data,
        method,
        header,
        onSuccess: (res) => {
            callback(res.data);
        },
        onError: (error) => {
            callback(error);
        }
    })
}
// 处理异步的3种方式
// callback, promise, async await (基于promise); await 前提是函数返回值要返回结果 主要是加在 promise 前面;
// wx.request 没有返回值 只支持callback形式拿到结果

// 通过代理模式改写
const promisic = function(func) {
    return function(params = {}) {
        return new Promise((resolve, reject) => {
            const postData = Object.assign(params, {
                onSuccess: (data) => {
                    resolve(data)
                },
                onError: (err) => {
                    reject(err)
                },
            })

            func(postData);
        })
    }
}

const a = promisic(wx.request)({url, data})