import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {HbpHttpClient, OidcHttpClient} from './httpClients.js';
import Job from './job';
import Config from './config';

@inject(HttpClient, HbpHttpClient, OidcHttpClient, Config)
export class Validation extends Job {
  bioRefUuid;

  synJobUuid;

  synthesisOutputUuid;

  validationTaskName = 'morphology_validation';
  validationTask;
  validationTaskVersion;
  validationTaskVersions = [];

  dsPath;

  launchingJob = false;
  loadingSynUuid = false;

  constructor(http, hbpHttp, oidcHttp, config) {
    super('morph-val-job-ids', hbpHttp);
    this.http = http;
    this.hbpHttp = hbpHttp;
    this.oidcHttp = oidcHttp;
    this.config   = config;

    this.refreshValidationTaskVersions();

    this.dsPath = config.valDsPath;
    this.bioRefUuid = config.bioRefUuid;
  }

  activate(params) {
    if (params && params.id && params.id !== 'undefined') {
      this.synJobUuid = params.id;
      this.loadingSynUuid = true;
    }

    this.hbpHttp.fetch('provenance/v1/api/activity/expand?predicate="bbp:jobId"="' + this.synJobUuid + '"')
    .then(response => response.json())
    .then(data => {
      let entities = data.entity;
      for (let entity in entities) {
        this.hbpHttp.fetch('document/v0/api/file/' + entities[entity]['prov:value'] + '/')
        .then(response => response.json()).then(data => {
          if (data._name === 'morphology_synthesis.json') {
            this.synthesisOutputUuid = data._uuid;
            this.loadingSynUuid = false;
          }
        });
      }
    });
  }

  deactivate() {
    this.config.valDsPath = this.dsPath;
    this.config.bioRefUuid = this.bioRefUuid;
  }

  refreshValidationTaskVersions() {
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
    this.launchingJob = true;
    return this.hbpHttp.fetch('task/v0/api/job/', {
      method: 'post',
      body: json({
        task_id: this.validationTask.task_id,
        total_physical_memory: 2048,
        cpu_cores: 1,
        output_location: this.dsPath,
        requested_queue: 'cscs_viz_webruns',
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
      this.addJob(data.job_id);
      this.launchingJob = false;
    })
    .catch(() => {
      this.launchingJob = false;
    });
  }
}
