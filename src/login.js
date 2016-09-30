import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {OidcHttpClient} from './httpClients.js';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(AuthService, OidcHttpClient, EventAggregator)
export class Login {

  constructor(auth, oidcHttp, eventAggredator) {
    this.auth = auth;
    this.oidcHttp = oidcHttp;

    eventAggredator.subscribe('auth:logout', payload => {
      if (window !== window.top) { // if app is in the Iframe send logout to the main window
        window.top.postMessage({eventName: 'oidc.logout', data: { clientId: auth.config.providers.hbp.clientId }}, '*');
      }
    });
  }

  attached() {
    this.oidcHttp.fetch('session')
    .then(response => {
      // oidc session present or app is not in the iframe => iframe will grab the token or present the login screen
      if (response.ok || window === window.top) {
        return this.auth.authenticate('hbp', false, null, this.iframeRef);
      } else {
        return this.auth.logout();
      }
    });
  }
}
