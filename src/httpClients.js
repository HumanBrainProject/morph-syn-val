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
      .withInterceptor(auth.tokenInterceptor)
      .withInterceptor({
        response(response) {
          // handle expired/revoked token when auth plugin still thinks it is authenticated
          if (!response.ok && response.status === 401 && auth.isAuthenticated()) {
            auth.logout().then(() => { window.location.reload(); });
            throw 'Unauthorized';
          }
          return response;
        }
      });
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
