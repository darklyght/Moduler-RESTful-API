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

var decode_grade = {
  'Aplus': 'A+',
  'A': 'A',
  'Aminus': 'A-',
  'Bplus': 'B+',
  'B': 'B',
  'Bminus': 'B-',
  'Cplus': 'C+',
  'C': 'C',
  'Dplus': 'D+',
  'F': 'F',
  'CS': 'CS',
  'CU': 'CU'
};

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
  app.post('/users/modules', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.json(result.modules);
    }, err => {
      console.log(err);
      res.send(err);
    });
  });
  app.get('/users/modules/add', auth, function(req, res) {
    if (!req.query.semester) {
      return res.send({
        'status': 'error',
        'message': 'Missing semester'
      });
    }
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing module code'
      });
    }
    if (req.query.credits && req.query.credits !== parseInt(credits)) {
      return res.send({
        'status': 'error',
        'message': 'Invalid module credits'
      });
    }
    if (req.query.type && req.query.type !== 'ULR' && req.query.type !== 'FLR' && req.query.type !== 'RCM' && req.query.type !== 'TE' && req.query.type !== 'IA' && req.query.type !== 'UE') {
      return res.send({
        'status': 'error',
        'message': 'Invalid module type'
      });
    }
    if (req.query.grade && req.query.grade !== 'Aplus' && req.query.grade !== 'A' && req.query.grade !== 'Aminus' && req.query.grade !== 'Bplus' && req.query.grade !== 'B' && req.query.grade !== 'Bminus' && req.query.grade !== 'Cplus' && req.query.grade !== 'C' && req.query.grade !== 'Dplus' && req.query.grade !== 'D' && req.query.grade !== 'F' && req.query.grade !== 'CS' && req.query.grade !== 'CU') {
      return res.send({
        'status': 'error',
        'message': 'Invalid module grade'
      });
    }
    if (req.query.su_option && req.query.su_option !== 'true' && req.query.su_option !== 'false') {
      return res.send({
        'status': 'error',
        'message': 'Invalid module S/U option'
      });
    }
    app_users.find(username).fetch().subscribe(result => {
      var modules = result.modules;
      while (modules.length < req.query.semester) {
        modules.push([])
      }
      for (var i = 0; i < modules.length; i++) {
        for (var j = 0; j < modules[i].length; j++) {
          if (req.query.code === modules[i][j].code) {
            return res.send({
              'status': 'error',
              'message': 'Module code already exists'
            })
          }
        }
      }
      var new_module = {
        'code': req.query.code,
        'credits': 4,
        'type': 'ULR',
        'grade': 'Planned',
        'su_option': false
      };
      if (req.query.credits) {
        new_module.credits = req.query.credits;
      }
      if (req.query.type) {
        new_module.type = req.query.type;
      }
      if (req.query.grade) {
        new_module.grade = decode_grade[req.query.grade];
      }
      if (req.query.su_option) {
        new_module.su_option = (req.query.su_option === 'true');
      }
      if (new_module.su_option === true) {
        if (new_module.grade === 'D' || new_module.grade === 'D+' || new_module.grade === 'F') {
          new_module.final_grade = 'U';
        }
        else {
          new_module.final_grade = 'S';
        }
      }
      else {
        new_module.final_grade = new_module.grade;
      }
      modules[req.query.semester-1].push(new_module)
      app_users.update({
        id: username,
        modules: modules
      });
      res.send({
        'status': 'success',
        'message': modules
      });
    }, err => {
      console.log(err);
      res.send(err);
    });
  });
  app.get('/users/modules', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.json(result.modules);
    }, err => {
      console.log(err);
      res.send(err);
    });
  });
  app.post('/users/modules', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.json(result.modules);
    }, err => {
      console.log(err);
      res.send(err);
    });
  });
  app.post('/users/modules/add', auth, function(req, res) {
    if (!req.query.semester) {
      return res.send({
        'status': 'error',
        'message': 'Missing semester'
      });
    }
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing module code'
      });
    }
    if (req.query.credits && req.query.credits !== parseInt(credits)) {
      return res.send({
        'status': 'error',
        'message': 'Invalid module credits'
      });
    }
    if (req.query.type && req.query.type !== 'ULR' && req.query.type !== 'FLR' && req.query.type !== 'RCM' && req.query.type !== 'TE' && req.query.type !== 'IA' && req.query.type !== 'UE') {
      return res.send({
        'status': 'error',
        'message': 'Invalid module type'
      });
    }
    if (req.query.grade && req.query.grade !== 'Aplus' && req.query.grade !== 'A' && req.query.grade !== 'Aminus' && req.query.grade !== 'Bplus' && req.query.grade !== 'B' && req.query.grade !== 'Bminus' && req.query.grade !== 'Cplus' && req.query.grade !== 'C' && req.query.grade !== 'Dplus' && req.query.grade !== 'D' && req.query.grade !== 'F' && req.query.grade !== 'CS' && req.query.grade !== 'CU') {
      return res.send({
        'status': 'error',
        'message': 'Invalid module grade'
      });
    }
    if (req.query.su_option && req.query.su_option !== 'true' && req.query.su_option !== 'false') {
      return res.send({
        'status': 'error',
        'message': 'Invalid module S/U option'
      });
    }
    app_users.find(username).fetch().subscribe(result => {
      var modules = result.modules;
      while (modules.length < req.query.semester) {
        modules.push([])
      }
      for (var i = 0; i < modules.length; i++) {
        for (var j = 0; j < modules[i].length; j++) {
          if (req.query.code === modules[i][j].code) {
            return res.send({
              'status': 'error',
              'message': 'Module code already exists'
            })
          }
        }
      }
      var new_module = {
        'code': req.query.code,
        'credits': 4,
        'type': 'ULR',
        'grade': 'Planned',
        'su_option': false
      };
      if (req.query.credits) {
        new_module.credits = req.query.credits;
      }
      if (req.query.type) {
        new_module.type = req.query.type;
      }
      if (req.query.grade) {
        new_module.grade = decode_grade[req.query.grade];
      }
      if (req.query.su_option) {
        new_module.su_option = (req.query.su_option === 'true');
      }
      if (new_module.su_option === true) {
        if (new_module.grade === 'D' || new_module.grade === 'D+' || new_module.grade === 'F') {
          new_module.final_grade = 'U';
        }
        else {
          new_module.final_grade = 'S';
        }
      }
      else {
        new_module.final_grade = new_module.grade;
      }
      modules[req.query.semester-1].push(new_module)
      app_users.update({
        id: username,
        modules: modules
      });
      res.send({
        'status': 'success',
        'message': modules
      });
    }, err => {
      console.log(err);
      res.send(err);
    });
  });
  app.get('/users/modules/update', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.json(result.modules);
    }, err => {
      console.log(err);
      res.send(err);
    });
  });
  app.post('/users/modules/update', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.json(result.modules);
    }, err => {
      console.log(err);
      res.send(err);
    });
  });
  app.get('/users/modules/delete', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.json(result.modules);
    }, err => {
      console.log(err);
      res.send(err);
    });
  });
  app.post('/users/modules/delete', auth, function(req, res) {
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