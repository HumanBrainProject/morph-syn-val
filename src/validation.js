import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {HbpHttpClient, OidcHttpClient} from './httpClients.js';
import {Synthesis} from './synthesis.js';

@inject(HttpClient, HbpHttpClient, OidcHttpClient, Synthesis)
export class Validation {

  locStoreId = 'morph-syn-job-ids';
  valLocStoreId = 'morph-val-job-ids';

  bioRefUuid = '50f86ce7-613b-40b8-83ae-6697185d5593';

  synthesisJobs = {};
  synthesisOutputUuid;

  validationTaskName = 'morphology_validation';
  validationTask;
  validationTaskVersion;
  validationTaskVersions = [];

  dsPath = '/Genrich Sandbox 2/m30';

  constructor(http, hbpHttp, oidcHttp, synthesisSvc) {
    this.http = http;
    this.hbpHttp = hbpHttp;
    this.oidcHttp = oidcHttp;
    this.http = http;
    this.synthesisSvc = synthesisSvc;
  }

  activate() {
    this.fetchValidationTaskVersions();

    this.jobIds = JSON.parse(localStorage.getItem(this.locStoreId));
    let retrieveJobs = [];
    for (let jobId of this.jobIds) {
      retrieveJobs.push(this.hbpHttp.fetch('task/v0/api/job/' + jobId)
      .then(response => response.json())
      .then(data => {
        this.synthesisJobs[jobId] = data;
      }));
    }

    Promise.all(retrieveJobs)
    .then(() => {
      for (let jobId in this.synthesisJobs) {
        this.hbpHttp.fetch('provenance/v1/api/activity/expand?predicate="bbp:jobId"="' + this.synthesisJobs[jobId].job_id + '"')
        .then(response => response.json())
        .then(data => {
          let entities = data.entity;
          for (let entity in entities) {
            this.hbpHttp.fetch('document/v0/api/file/' + entities[entity]['prov:value'] + '/')
            .then(response => response.json()).then(data => {
              if (data._name === 'morphology_synthesis.json') {
                this.synthesisJobs[jobId].output = {name: data._name, uuid: data._uuid};
                this.synthesisOutputUuid = data._uuid;
              }
            });
          }
        });
      }
    });
  }

  fetchValidationTaskVersions() {
    this.validationTaskVersions = [];
    return this.hbpHttp.fetch('task/v0/api/task?task_name=' + this.validationTaskName)
    .then(response => response.json())
    .then(data => {
      this.validationTaskVersion = 0;
      data.tasks.forEach(task => {
        this.validationTaskVersions.push(task.properties.version);
        let currentVersion = task.properties.version;
        if (currentVersion > this.validationTaskVersion) {
          this.validationTask = task;
          this.validationTaskVersion = currentVersion;
        }
      })
    });
  }

  submit() {
    return this.hbpHttp.fetch('task/v0/api/job/', {
      method: 'post',
      body: json({
        task_id: this.validationTask.task_id,
        total_physical_memory: 2048,
        cpu_cores: 1,
        output_location: this.dsPath,
        requested_queue: 'cscs_viz_webruns',
        // requested_queue: 'cscs_viz',
        job_name: 'morph_val_' + new Date().toISOString(),
        arguments: [{
          object: 'URI',
          contents: {
            category: 'application/vnd.bbp.bundle.Morphology.Morphology',
            document: this.synthesisOutputUuid
          }
        }, {
          object: 'URI',
          contents: {
            category: 'application/vnd.bbp.bundle.Morphology.Morphology',
            document: this.bioRefUuid
          }
        }]
      })
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem(this.valLocStoreId, JSON.stringify(data.job_id));
    });
  }
}
