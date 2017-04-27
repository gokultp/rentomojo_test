var events = require('events');

function Queue(executor, cuncurrency) {
    
    this.exec           = executor;
    this.cuncurrency    = cuncurrency;
    this.activeCount    = 0;
    this.jobs           = [];
};

Queue.prototype.__proto__ = events.EventEmitter.prototype;

Queue.prototype.push    = function (entry, cb) {
    self.execute(data, cb)
};

Queue.execute = function(data, cb) {
    var self = this;
    if(self.activeCount< self.cuncurrency){
        self.exec(data, cb)
    } 
    else {
        process.nextTick(self.execute(data, cb))
    }
}

module.exports  =   Queue;

