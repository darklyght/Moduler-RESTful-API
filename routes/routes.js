global.WebSocket = require('ws');
const Horizon = require("@horizon/client/");
const horizon = Horizon({host: 'localhost:8181'});
const app_users = horizon('app_users');
horizon.onReady(function() {
    console.log('Connected to Horizon...');
});
horizon.connect();

var username = '';
const basic_auth = require('basic-auth');
const auth = function(req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };
  var user = basic_auth(req);
  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }
  app_users.find(user.name).fetch().subscribe(result => {
    if (result && user.pass === result.login_data.password) {
      username = user.name;
      return next();
    } else {
      return unauthorized(res);
    }
  })
}

var appRouter = function(app) {
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });
  app.get('/users/modules', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.json(result.modules);
    }, err => {
      console.log(err);
      res.send(err);
    });
  });
  app.get('/users/shared_with_others', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.json(result.shared_with_others);
    }, err => {
      console.log(err);
      res.send(err);
    });
  });
  app.get('/users/shared_with_you', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.json(result.shared_with_you);
    }, err => {
      console.log(err);
      res.send(err);
    });
  });
}
 
module.exports = appRouter;