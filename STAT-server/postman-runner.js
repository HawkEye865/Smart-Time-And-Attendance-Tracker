newman.run({
    collection: 'AutomatedDemo3.postman_collection.json',
    reporters: 'cli'
},
function (err) {
    if (err) {
        throw err;
    }
}