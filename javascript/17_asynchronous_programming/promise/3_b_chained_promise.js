a = 1, b = 2, c = 3;

new Promise(function (resolve, reject) {
    setTimeout(() => resolve(a), 1000)
}).then(function (data) {
    return data + b;
}).then(function (data) {
    return data + c;
}).then(function (data) {
    console.log(data)
}).catch(function (data) {

})


