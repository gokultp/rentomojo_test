/**
 * inits queue
 * @param {[Function]} executor the worker function
 * @param {Number} cuncurrency max allowed parallel executions
 */
function Queue(executor, cuncurrency) {
    
    // executor fn
    this.exec           = executor;
    // concurrency
    this.cuncurrency    = cuncurrency;
    // no of jobs running
    this.activeCount    = 0;
    // job remaining to run
    this.jobs           = [];
    // keeping an id for each jobs, this is the last used id
    this.lastId         = 0;
    // keeping a hash of callbacks for all jobs
    this.callbackHash   = new Object();
};

/**
 * add entry to the queue
 * @param {Object} entry the job object
 * @param {[Function]} cb callback function
 */
Queue.prototype.push    = function (entry, cb) {
    var self    = this;
    // init job
    var job     = new Object();
    // setting latest jobid to job
    job.id      = self.lastId++;
    job.data    = entry;
    // adding to queue
    self.jobs.push(job);

    // saving the callback fns reference
    self.callbackHash[job.id] = cb;

    // if not running start runner
    if(!self.activeCount){
        self.start();
    }
};

Queue.prototype.start = function() {
    var self = this;
    
    // while activeCount is les than max cuncurrency and there is jobs in queue
    while(self.activeCount< self.cuncurrency && self.jobs.length){

        // take first job out and execute
        var entry   = self.jobs.shift();
        self.exec(entry.data, function (err, res) {
            // decrement active count since it is completed
            self.activeCount --;
            // if jobs in queue start
            if(self.jobs.length > 0){
                self.start();
            }
            // if callback entry found call callback
            if(self.callbackHash[entry.id]){
                self.callbackHash[entry.id](err, res);
               delete self.callbackHash[entry.id]
            }
          
        });
        // increment activeCount after starting to exec
        self.activeCount++;

    } 
}

module.exports  =   Queue;

