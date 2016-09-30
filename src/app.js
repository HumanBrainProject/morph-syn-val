import {AuthorizeStep} from 'aurelia-auth';

export class App {
  configureRouter(config, router) {
    config.addPipelineStep('authorize', AuthorizeStep);
    config.title = 'Morphology';
    config.map([
      { route: 'login',           name: 'login',      moduleId: 'login',      nav: false, title: 'Login'},
      { route: ['', 'synthesis'], name: 'synthesis',  moduleId: 'synthesis',  nav: true,  title: 'Synthesis',  auth: true},
      { route: 'validation',      name: 'validation', moduleId: 'validation', nav: true,  title: 'Validation', auth: true}
    ]);

    this.router = router;
  }
}
