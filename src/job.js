export default class Job {
  jobs = new Array();
  locStoreId;

  constructor(locStoreId, hbpHttp) {
    this.locStoreId = locStoreId;
    this.hbpHttp = hbpHttp;

    if (!localStorage.getItem(this.locStoreId)) {
      localStorage.setItem(this.locStoreId, JSON.stringify([]));
    }

    this.getJobIds().filter(v => v).map(jobId => {
      this.refreshJob(jobId);
    });
  }

  getJobIds() {
    return JSON.parse(localStorage.getItem(this.locStoreId));
  }

  addJob(jobId) {
    let jobIds = this.getJobIds();
    jobIds.push(jobId);
    localStorage.setItem(this.locStoreId, JSON.stringify(jobIds.filter(v => v)));

    this.refreshJob(jobId);
  }

  removeJob(jobId) {
    let jobIds = this.getJobIds();
    let index = jobIds.indexOf(jobId);
    if (index > -1) {
      jobIds.splice(index, 1);
    }
    localStorage.setItem(this.locStoreId, JSON.stringify(jobIds.filter(v => v)));

    index = this.jobs.findIndex(element => element.job_id === jobId);
    if (index > -1) {
      this.jobs.splice(index, 1);
    }
  }

  refreshJob(jobId) {
    let index = this.jobs.findIndex(element => element.job_id === jobId);
    this.hbpHttp.fetch('task/v0/api/job/' + jobId)
    .then(response => response.json()).then(job => {
      if (index !== -1) {
        this.jobs[index] = job;
      } else {
        this.jobs.push(job);
      }
    });
  }

  printDate(value) {
    return new Date(value).toLocaleString();
  }
}
