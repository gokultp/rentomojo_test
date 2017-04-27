var events = require('events');

function Queue(executor, cuncurrency) {
    
    this.exec           = executor;
    this.cuncurrency    = cuncurrency;
    this.activeCount    = 0;
    this.jobs           = [];
};


Queue.prototype.push    = function (entry, cb) {
    var self = this;
    self.execute(entry, cb)
};

Queue.prototype.execute = function(data, cb) {
    var self = this;
    if(self.activeCount< self.cuncurrency){
        self.activeCount++;
        self.exec(data, function (params) {
            self.activeCount--;
            cb(params);
        });
    } 
    else {
        process.nextTick(function (params) {
                        
            self.execute(data, cb)
        })
    }
}

module.exports  =   Queue;

