
function Queue(executor, cuncurrency) {
    
    this.exec           = executor;
    this.cuncurrency    = cuncurrency;
    this.activeCount    = 0;
    this.jobs           = [];
    this.lastId         = 0;
    this.callbackHash   = new Object();
};


Queue.prototype.push    = function (entry, cb) {
    var self    = this;
    var job     = new Object();
    job.id      = self.lastId++;
    job.data    = entry;
    self.jobs.push(job);
    self.callbackHash[job.id] = cb;
    console.log(job.id)

    if(!self.activeCount){
        self.start();
    }
};

Queue.prototype.start = function() {
    var self = this;
    
    while(self.activeCount< self.cuncurrency && self.jobs.length){

        var entry   = self.jobs.shift();
        console.log(entry)
        self.exec(entry.data, function (err, res) {
            self.activeCount --;
            if(self.jobs.length > 0){
                self.start();
            }
            console.log( entry)
            if(self.callbackHash[entry.id]){
                self.callbackHash[entry.id](err, res);
               delete self.callbackHash[entry.id]
            }
          
        });
        self.activeCount++;





        
    } 
}

module.exports  =   Queue;

