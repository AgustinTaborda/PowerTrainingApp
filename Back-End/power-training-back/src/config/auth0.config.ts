const { auth } = require('express-openid-connect');

export const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'Jne4w1KnHcfzQ3sGjNpWFWQp0IwcZIWP',
  issuerBaseURL: 'https://dev-hz5gflb5dps3fu2t.us.auth0.com',
  /*routes: {
    callback: '/users/auth0'       // Aquí defines tu URL de callback, no "redirectUri"
  },
  
  authorizationParams: {
    scope: 'openid profile email' // Asegúrate de tener este scope
  }*/
};

