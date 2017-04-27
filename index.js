var Queue       = require('./lib/jobqueue.js');


queue       = new Queue(function (data, cb) {
    console.log('data',data);

    test(data, function () {

                            cb(data)

    })
}, 2);


a = [1,2,3,4,5,6,7,8,9];

a.forEach(function(element) {
    queue.push(element, function (params) {
        console.log('done------', params);
        
    });
});


function test (data, done) {
    console.log('test', data);
    done(data)
}