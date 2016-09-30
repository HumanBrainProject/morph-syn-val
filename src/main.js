import authConfig from './authConfig';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-auth', baseConfig => {
      baseConfig.configure(authConfig);
    });

  // check token is valid this.hbpHttp.fetch('oidc/userinfo').then(response => { if (!response.ok) { this.auth.logout(null, this.auth.config.providers.hbp.clientId); }});

  aurelia.start().then(() => aurelia.setRoot());
}
