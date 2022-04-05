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

export {
    promisic
}