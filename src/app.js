import {AuthorizeStep} from 'aurelia-auth';

export class App {
  configureRouter(config, router) {
    config.addPipelineStep('authorize', AuthorizeStep);
    config.title = 'Morphology';
    config.map([
      {route: 'login',           name: 'login',      moduleId: 'login',      nav: false, title: 'Login'},
      {route: ['', 'synthesis'], name: 'synthesis',  moduleId: 'synthesis',  nav: true,  title: 'Synthesis',  auth: true},
      {route: 'validation',      redirect: 'validation/undefined'},
      {route: 'validation/:id',  name: 'validation', moduleId: 'validation', nav: true,  title: 'Validation', auth: true, href: 'validation/undefined'},
    ]);

    this.router = router;
  }
}
