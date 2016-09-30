import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';

@inject(AuthService)
export class HbpHttpClient extends HttpClient {
  constructor(auth) {
    super();
    this.configure(config => {
      config
      .withBaseUrl('https://services.humanbrainproject.eu/')
      .withDefaults({
        headers: {
          'Accept': 'application/json'
        }
      })
      .withInterceptor(auth.tokenInterceptor);
    });
  }
}

export class OidcHttpClient extends HttpClient {
  constructor() {
    super();
    this.configure(config => {
      config
      .withBaseUrl('https://services.humanbrainproject.eu/oidc/')
      .withDefaults({credentials: 'include'});
    });
  }
}

