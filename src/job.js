export default class Job {
  jobs = new Map();
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
    var index = jobIds.indexOf(jobId);
    if (index > -1) {
      jobIds.splice(index, 1);
    }
    localStorage.setItem(this.locStoreId, JSON.stringify(jobIds.filter(v => v)));
    this.jobs.delete(jobId);
  }

  refreshJob(jobId) {
    this.hbpHttp.fetch('task/v0/api/job/' + jobId)
    .then(response => response.json()).then(job => {
      this.jobs.set(jobId, job);
    });
  }
}
