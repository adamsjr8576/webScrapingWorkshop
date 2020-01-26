var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });

nightmare
  .goto('https://www.indeed.com/')
  .wait('.jobsearch-Layout')
  .type('input#text-input-what', 'software developer')
  .wait(500)
  .click('.icl-WhatWhere-button')
  .wait('.jobsearch-SerpJobCard')
  .evaluate(() => {
    const jobs = document.querySelectorAll('.jobtitle');
    const jobList = [].slice.call(jobs);
    const jobsInfo = jobList.map(job => ({title: job.innerText, link: job.href}));
    const entryLevelJobs = jobsInfo.filter(job => job.title.includes('Entry') || job.title.includes('Junior'))
    return entryLevelJobs;
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
