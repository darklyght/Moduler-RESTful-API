global.WebSocket = require('ws');
const modules = require('./modules.json')
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
    if (result && user.pass === result.api_key) {
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


  // Full modules with GET request
  app.get('/modules/full', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send(modules[i]);
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Full modules with POST request
  app.post('/modules/full', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send(modules[i]);
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Short modules with GET request
  app.get('/modules/short', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send({
          'ModuleCode': modules[i].ModuleCode,
          'ModuleTitle': modules[i].ModuleTitle,
          'Department': modules[i].Department,
          'ModuleDescription': modules[i].ModuleDescription,
          'ModuleCredit': modules[i].ModuleCredit,
          'Workload': modules[i].Workload,
          'Prerequisite': modules[i].Prerequisite,
          'Preclusion': modules[i].Preclusion
        });
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Short modules with POST request
  app.post('/modules/short', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send({
          'ModuleCode': modules[i].ModuleCode,
          'ModuleTitle': modules[i].ModuleTitle,
          'Department': modules[i].Department,
          'ModuleDescription': modules[i].ModuleDescription,
          'ModuleCredit': modules[i].ModuleCredit,
          'Workload': modules[i].Workload,
          'Prerequisite': modules[i].Prerequisite,
          'Preclusion': modules[i].Preclusion
        });
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Module title with GET request
  app.get('/modules/title', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send({
          'ModuleCode': modules[i].ModuleCode,
          'ModuleTitle': modules[i].ModuleTitle
        });
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Module title with POST request
  app.post('/modules/title', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send({
          'ModuleCode': modules[i].ModuleCode,
          'ModuleTitle': modules[i].ModuleTitle
        });
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Module description with GET request
  app.get('/modules/description', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send({
          'ModuleCode': modules[i].ModuleCode,
          'ModuleDescription': modules[i].ModuleDescription
        });
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Module description with POST request
  app.post('/modules/description', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send({
          'ModuleCode': modules[i].ModuleCode,
          'ModuleDescription': modules[i].ModuleDescription
        });
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Module credits with GET request
  app.get('/modules/credit', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send({
          'ModuleCode': modules[i].ModuleCode,
          'ModuleCredit': modules[i].ModuleCredit
        });
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Module credits with POST request
  app.post('/modules/credit', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send({
          'ModuleCode': modules[i].ModuleCode,
          'ModuleCredit': modules[i].ModuleCredit
        });
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Module prerequisites with GET request
  app.get('/modules/prerequisite', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send({
          'ModuleCode': modules[i].ModuleCode,
          'Prerequisite': modules[i].Prerequisite
        });
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Module prerequisites with POST request
  app.post('/modules/prerequisite', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send({
          'ModuleCode': modules[i].ModuleCode,
          'Prerequisite': modules[i].Prerequisite
        });
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Module preclusions with GET request
  app.get('/modules/preclusion', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send({
          'ModuleCode': modules[i].ModuleCode,
          'Preclusion': modules[i].Preclusion
        });
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Module preclusions with POST request
  app.post('/modules/preclusion', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.send({
          'ModuleCode': modules[i].ModuleCode,
          'Preclusion': modules[i].Preclusion
        });
      }
    }
    res.send({
      'status': 'error',
      'message': 'Module not found'
    })
  });


  // Read modules with GET request
  app.get('/users/modules', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.json(result.modules);
    }, err => {
      console.log(err);
      res.send(err);
    });
  });


  // Read modules with POST request
  app.post('/users/modules', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.json(result.modules);
    }, err => {
      console.log(err);
      res.send(err);
    });
  });


  // Add module with GET request
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
        } else if (new_module.grade !== 'Planned') {
          new_module.final_grade = 'S';
        } else {
          new_module.final_grade = 'Planned';
        }
      } else {
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


  // Add module with POST request
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
        } else if (new_module.grade !== 'Planned') {
          new_module.final_grade = 'S';
        } else {
          new_module.final_grade = 'Planned';
        }
      } else {
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


  // Update module with GET request
  app.get('/users/modules/update', auth, function(req, res) {
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
      var found = false;
      for (var i = 0; i < modules.length && !found; i++) {
        for (var j = 0; j < modules[i].length && !found; j++) {
          if (req.query.code === modules[i][j].code) {
            found = true;
            if (req.query.credits) {
              modules[i][j].credits = req.query.credits;
            }
            if (req.query.type) {
              modules[i][j].type = req.query.type;
            }
            if (req.query.grade) {
              modules[i][j].grade = decode_grade[req.query.grade];
            }
            if (req.query.su_option) {
              modules[i][j].su_option = (req.query.su_option === 'true');
            }
            if (modules[i][j].su_option === true) {
              if (modules[i][j].grade === 'D' || modules[i][j].grade === 'D+' || modules[i][j].grade === 'F') {
                modules[i][j].final_grade = 'U';
              } else if (modules[i][j].grade !== 'Planned') {
                modules[i][j].final_grade = 'S';
              } else {
                modules[i][j].final_grade = 'Planned'
              }
            } else {
              modules[i][j].final_grade = modules[i][j].grade;
            }
          }
        }
      }
      if (!found) {
        return res.send({
          'status': 'error',
          'message': 'Module code not found'
        })
      }
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


  // Update module with POST request
  app.post('/users/modules/update', auth, function(req, res) {
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
      var found = false;
      for (var i = 0; i < modules.length && !found; i++) {
        for (var j = 0; j < modules[i].length && !found; j++) {
          if (req.query.code === modules[i][j].code) {
            found = true;
            if (req.query.credits) {
              modules[i][j].credits = req.query.credits;
            }
            if (req.query.type) {
              modules[i][j].type = req.query.type;
            }
            if (req.query.grade) {
              modules[i][j].grade = decode_grade[req.query.grade];
            }
            if (req.query.su_option) {
              modules[i][j].su_option = (req.query.su_option === 'true');
            }
            if (modules[i][j].su_option === true) {
              if (modules[i][j].grade === 'D' || modules[i][j].grade === 'D+' || modules[i][j].grade === 'F') {
                modules[i][j].final_grade = 'U';
              } else if (modules[i][j].grade !== 'Planned') {
                modules[i][j].final_grade = 'S';
              } else {
                modules[i][j].final_grade = 'Planned'
              }
            } else {
              modules[i][j].final_grade = modules[i][j].grade;
            }
          }
        }
      }
      if (!found) {
        return res.send({
          'status': 'error',
          'message': 'Module code not found'
        })
      }
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


  // Delete module with GET request
  app.get('/users/modules/delete', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing module code'
      });
    }
    app_users.find(username).fetch().subscribe(result => {
      var modules = result.modules;
      var found = false;
      for (var i = 0; i < modules.length && !found; i++) {
        for (var j = 0; j < modules[i].length && !found; j++) {
          if (req.query.code === modules[i][j].code) {
            found = true;
            modules[i].splice(j, 1);
          }
        }
      }
      if (!found) {
        return res.send({
          'status': 'error',
          'message': 'Module code not found'
        })
      }
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


  // Delete module with POST request
  app.post('/users/modules/delete', auth, function(req, res) {
    if (!req.query.code) {
      return res.send({
        'status': 'error',
        'message': 'Missing module code'
      });
    }
    app_users.find(username).fetch().subscribe(result => {
      var modules = result.modules;
      var found = false;
      for (var i = 0; i < modules.length && !found; i++) {
        for (var j = 0; j < modules[i].length && !found; j++) {
          if (req.query.code === modules[i][j].code) {
            found = true;
            modules[i].splice(j, 1);
          }
        }
      }
      if (!found) {
        return res.send({
          'status': 'error',
          'message': 'Module code not found'
        })
      }
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