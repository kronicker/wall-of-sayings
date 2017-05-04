'use strict';

const auth = require('./auth');
const users = require('./users');
const quotes = require('./quotes');
const quoteCollections = require('./collections');
const { isLoggedIn } = require('../auth/permissions');
const contains = require('lodash/some');

const publicRoutes = [{
  path: '/api',
  method: 'GET'
}, {
  path: '/api/auth/login',
  method: 'POST'
}, {
  path: '/api/auth/logout',
  method: 'GET'
}, {
  path: '/api/users',
  method: 'POST'
}, {
  path: '/api/quotes',
  method: 'GET'
}];

const isPublicRoute = route => contains(publicRoutes, route);

function checkAccessRights(req, res, next) {
  let routeDesc = { path: req.originalUrl, method: req.method };
  if (isPublicRoute(routeDesc)) {
    next();
    return;
  }
  isLoggedIn(req, res, next);
}

module.exports = app => {
  app.use('/api', checkAccessRights);
  app.use('/api', auth);
  app.use('/api', users);
  app.use('/api', quotes);
  app.use('/api', quoteCollections);
};

