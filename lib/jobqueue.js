var events = require('events');

function Queue(jobs, cuncurrency) {
    if(jobs){
        this.jobs   = jobs;
    }
    else {
         this.jobs   = [];
    }
    this.cuncurrency    = cuncurrency;
    this.activeCount    = 0;
};

Queue.prototype.__proto__ = events.EventEmitter.prototype;

Queue.prototype.push    = function (entry) {
    this.jobs.push(entry);
};

Queue.prototype.startJobs    = function () {
    
}





Queue.on('completed', function () {
    var self    = this;
    if(self.activeCount<5){
        self.startJobs();
    }
});
