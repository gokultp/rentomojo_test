# rentomojo_test
A scraper for scraping https://medium.com.


Here I have implemented a job queue and each of the requests are executing as a job.

We can set a maximum cuncurrency value for the job, and only that much jobs will be running in parallel at a time.


Have used an npm module called html-to-json for parsing links from htmlString.

for running the code 
    run npm install  
    npm start
