import authConfig from './authConfig';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-auth', baseConfig => {
      baseConfig.configure(authConfig);
    });

  aurelia.start().then(() => aurelia.setRoot());
}
