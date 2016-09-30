var config = {
  providers: {
    hbp: {
      name: 'hbp',
      url: '/auth/hbp',
      authorizationEndpoint: 'https://services.humanbrainproject.eu/oidc/authorize',
      redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/morph-syn-val/',
      defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
      display: 'iframe',
      type: '2.0',
      responseType: 'token',
      popupOptions: { width: 500, height: 700 },
      clientId: '365c2daa-7937-4f0b-9ee9-efca2283c6f6'
    }
  }
};

export default config;
