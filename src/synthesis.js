import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';
import {HbpHttpClient, OidcHttpClient} from './httpClients.js';
import Job from './job';


@inject(HttpClient, HbpHttpClient, OidcHttpClient, Router)
export class Synthesis extends Job {
  synthesisTaskName = 'morphology_synthesis';
  synthesisTask;
  synthesisTaskVersion;
  synthesisTaskVersions = [];

  dsPath = '/Genrich Sandbox 2/m30';
  gpfsPath = '/gpfs/bbp.cscs.ch/project/proj30/genrich';
  randomSeed = 1234;
  configUuid;
  brainRegion = 'hippocampal formation';
  brainRegionValues = ['hippocampal formation', 'Cerebral cortex'];
  cells = 10;
  jobIds = [];

  launchingJob = false;

  constructor(http, hbpHttp, oidcHttp, router) {
    super('morph-syn-job-ids', hbpHttp);
    this.http     = http;
    this.hbpHttp  = hbpHttp;
    this.oidcHttp = oidcHttp;
    this.router   = router;

    this.refreshSynthesisTaskVersions();
  }

  refreshSynthesisTaskVersions() {
    this.synthesisTaskVersions = [];
    return this.hbpHttp.fetch('task/v0/api/task?task_name=' + this.synthesisTaskName)
    .then(response => response.json())
    .then(data => {
      this.synthesisTaskVersion = 0;
      // 8 version is the last compatible
      data.tasks.filter(task => task.properties.version > 8).forEach(task => {
        this.synthesisTaskVersions.push(task.properties.version);
        let currentVersion = task.properties.version;
        if (currentVersion > this.synthesisTaskVersion) {
          this.synthesisTask = task;
          this.synthesisTaskVersion = currentVersion;
        }
      })
    });
  }

  submit() {
    this.launchingJob = true;
    this.makeNipRequest()
    .then(() => {
      return this.hbpHttp.fetch('task/v0/api/job/', {
        method: 'post',
        body: json({
          task_id: this.synthesisTask.task_id,
          total_physical_memory: 2048,
          cpu_cores: 1,
          output_location: this.dsPath,
          requested_queue: 'cscs_viz',
          job_name: 'morph_synth_' + new Date().toISOString(),
          'arguments': [{
            object: 'URI',
            contents: {
              category: 'application/zip',
              'document': this.configUuid
            }
          },
          this.gpfsPath,
          parseInt(this.cells),
          this.randomSeed]
        })
      });
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

  makeNipRequest() {
    let url = new URL('https://nip.humanbrainproject.eu/api/ksearch/search');
    url.searchParams.append('q', '*');
    url.searchParams.append('filters', '{"data_modalities.term.raw_term": ["Digital neuron synthesis"],'
                                      + '"brain_regions.term.raw_term":   ["' + this.brainRegion + '"]}'
                                      + '"protocols.title.raw_term": ["Generation of input parameters to synthesize morphologies"]');
    return this.http.fetch(url)
      .then(response => response.json())
      .then(data => {
        let uuid = data.hits[0].source.representations[0].access;
        this.configUuid = uuid;
      });
  }
}
