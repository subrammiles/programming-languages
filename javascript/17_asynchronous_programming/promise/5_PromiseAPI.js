

Promise.all([
    new Promise((resolve,reject)=>setTimeout((resolve(1),1000))),
    new Promise((resolve,reject)=>setTimeout((resolve(1),1000))),
]
).then(
    console.log("All promises resolved")
);

