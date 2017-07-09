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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });


/**
@api {get, post} /module/full Read full module information
@apiVersion 0.1.0
@apiName ReadModuleFull
@apiGroup Module

@apiParam {String} code <i>(Required)</i><br />Module code

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": {
        "ModuleCode": "CS1010E",
        "ModuleTitle": "Programming Methodology",
        "Department": "Computer Science",
        "ModuleDescription": "This module introduces the fundamental concepts of problem solving by computing and programming using an imperative programming language. It is the first and foremost introductory course to computing and the first part of a three-part series on programming and problem solving by computing, which includes CS1020 and CS2010. Topics include problem solving by computing, writing pseudo-codes, problem formulation and problem solving, program development, coding, testing and debugging, fundamental programming constructs (variables, types, expressions, assignments, functions, control structures, etc.), fundamental data structures: arrays, strings and structures, simple file processing, and basic recursion. This module is appropriate for FoE students.",
        "ModuleCredit": "4",
        "Workload": "2-1-1-3-3",
        "Preclusion": "CG1101, CS1010, CS1010FC, CS1010S, CS1101, CS1101C, CS1101S",
        "Types": [
            "Module",
            "UEM"
        ],
        "CorsBiddingStats": [
            {
                "AcadYear": "2016/2017",
                "Semester": "1",
                "Round": "1A",
                "Group": "Sectional Teaching 1",
                "Quota": "2",
                "Bidders": "0",
                "LowestBid": "0",
                "LowestSuccessfulBid": "0",
                "HighestBid": "0",
                "Faculty": "Arts & Social Sciences",
                "StudentAcctType": "Returning Students [P]"
            },
            ...
        ],
        "AcadYear": "2016/2017",
        "History": [
            {
                "Semester": 1,
                "ExamDate": "2016-11-25T09:00+0800",
                "Timetable": [
                    {
                        "ClassNo": "1",
                        "LessonType": "Laboratory",
                        "WeekText": "Every Week",
                        "DayText": "Wednesday",
                        "StartTime": "1000",
                        "EndTime": "1200",
                        "Venue": "COM1-0120"
                    },
                    ...
                ],
                "LecturePeriods": [
                    "Tuesday Afternoon"
                ],
                "TutorialPeriods": [
                    "Wednesday Morning",
                    "Wednesday Afternoon",
                    "Monday Afternoon",
                    "Tuesday Afternoon",
                    "Thursday Morning",
                    "Tuesday Morning",
                    "Friday Morning",
                    "Thursday Afternoon"
                ]
            }
        ]
    }
}
 
@apiError MissingCode No module code was specified.

@apiErrorExample MissingCode:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing code"
}

@apiError ModuleNotFound Module code specified was not found.
 
@apiErrorExample ModuleNotFound:
HTTP/1.1 404 Not Found
{
    "status": "error",
    "result": "Module not found"
}
*/

  // Full modules with GET request
  app.get('/module/full', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': modules[i]
        });
      }
    }
    res.status(404).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


  // Full modules with POST request
  app.post('/module/full', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': modules[i]
        });
      }
    }
    res.status(404).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


/**
@api {get, post} /module/short Read short module information
@apiVersion 0.1.0
@apiName ReadModuleShort
@apiGroup Module

@apiParam {String} code <i>(Required)</i><br />Module code

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": {
        "ModuleCode": "CS1010E",
        "ModuleTitle": "Programming Methodology",
        "Department": "Computer Science",
        "ModuleDescription": "This module introduces the fundamental concepts of problem solving by computing and programming using an imperative programming language. It is the first and foremost introductory course to computing and the first part of a three-part series on programming and problem solving by computing, which includes CS1020 and CS2010. Topics include problem solving by computing, writing pseudo-codes, problem formulation and problem solving, program development, coding, testing and debugging, fundamental programming constructs (variables, types, expressions, assignments, functions, control structures, etc.), fundamental data structures: arrays, strings and structures, simple file processing, and basic recursion. This module is appropriate for FoE students.",
        "ModuleCredit": "4",
        "Workload": "2-1-1-3-3",
        "Preclusion": "CG1101, CS1010, CS1010FC, CS1010S, CS1101, CS1101C, CS1101S"
    }
}
 
@apiError MissingCode No module code was specified.

@apiErrorExample MissingCode:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing code"
}

@apiError ModuleNotFound Module code specified was not found.
 
@apiErrorExample ModuleNotFound:
HTTP/1.1 404 Not Found
{
    "status": "error",
    "result": "Module not found"
}
*/

  // Short modules with GET request
  app.get('/module/short', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': {
            'ModuleCode': modules[i].ModuleCode,
            'ModuleTitle': modules[i].ModuleTitle,
            'Department': modules[i].Department,
            'ModuleDescription': modules[i].ModuleDescription,
            'ModuleCredit': modules[i].ModuleCredit,
            'Workload': modules[i].Workload,
            'Prerequisite': modules[i].Prerequisite,
            'Preclusion': modules[i].Preclusion
          }
        });
      }
    }
    res.status(404).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


  // Short modules with POST request
  app.post('/module/short', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': {
            'ModuleCode': modules[i].ModuleCode,
            'ModuleTitle': modules[i].ModuleTitle,
            'Department': modules[i].Department,
            'ModuleDescription': modules[i].ModuleDescription,
            'ModuleCredit': modules[i].ModuleCredit,
            'Workload': modules[i].Workload,
            'Prerequisite': modules[i].Prerequisite,
            'Preclusion': modules[i].Preclusion
          }
        });
      }
    }
    res.status(404).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


/**
@api {get, post} /module/title Read module title
@apiVersion 0.1.0
@apiName ReadModuleTitle
@apiGroup Module

@apiParam {String} code <i>(Required)</i><br />Module code

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": {
        "ModuleCode": "CS1010E",
        "ModuleTitle": "Programming Methodology"
    }
}
 
@apiError MissingCode No module code was specified.

@apiErrorExample MissingCode:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing code"
}

@apiError ModuleNotFound Module code specified was not found.
 
@apiErrorExample ModuleNotFound:
HTTP/1.1 404 Not Found
{
    "status": "error",
    "result": "Module not found"
}
*/

  // Module title with GET request
  app.get('/module/title', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': {
            'ModuleCode': modules[i].ModuleCode,
            'ModuleTitle': modules[i].ModuleTitle
          }
        });
      }
    }
    res.status(200).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


  // Module title with POST request
  app.post('/module/title', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': {
            'ModuleCode': modules[i].ModuleCode,
            'ModuleTitle': modules[i].ModuleTitle
          }
        });
      }
    }
    res.status(200).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


/**
@api {get, post} /module/description Read module description
@apiVersion 0.1.0
@apiName ReadModuleDescription
@apiGroup Module

@apiParam {String} code <i>(Required)</i><br />Module code

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": {
        "ModuleCode": "CS1010E",
        "ModuleDescription": "This module introduces the fundamental concepts of problem solving by computing and programming using an imperative programming language. It is the first and foremost introductory course to computing and the first part of a three-part series on programming and problem solving by computing, which includes CS1020 and CS2010. Topics include problem solving by computing, writing pseudo-codes, problem formulation and problem solving, program development, coding, testing and debugging, fundamental programming constructs (variables, types, expressions, assignments, functions, control structures, etc.), fundamental data structures: arrays, strings and structures, simple file processing, and basic recursion. This module is appropriate for FoE students."
    }
}
 
@apiError MissingCode No module code was specified.

@apiErrorExample MissingCode:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing code"
}

@apiError ModuleNotFound Module code specified was not found.
 
@apiErrorExample ModuleNotFound:
HTTP/1.1 404 Not Found
{
    "status": "error",
    "result": "Module not found"
}
*/

  // Module description with GET request
  app.get('/module/description', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': {
            'ModuleCode': modules[i].ModuleCode,
            'ModuleDescription': modules[i].ModuleDescription
          }
        });
      }
    }
    res.status(404).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


  // Module description with POST request
  app.post('/module/description', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': {
            'ModuleCode': modules[i].ModuleCode,
            'ModuleDescription': modules[i].ModuleDescription
          }
        });
      }
    }
    res.status(404).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


/**
@api {get, post} /module/credits Read module credits
@apiVersion 0.1.0
@apiName ReadModuleCredits
@apiGroup Module

@apiParam {String} code <i>(Required)</i><br />Module code

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": {
        "ModuleCode": "CS1010E",
        "ModuleCredit": "4"
    }
}
 
@apiError MissingCode No module code was specified.

@apiErrorExample MissingCode:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing code"
}

@apiError ModuleNotFound Module code specified was not found.
 
@apiErrorExample ModuleNotFound:
HTTP/1.1 404 Not Found
{
    "status": "error",
    "result": "Module not found"
}
*/

  // Module credits with GET request
  app.get('/module/credits', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': {
            'ModuleCode': modules[i].ModuleCode,
            'ModuleCredit': modules[i].ModuleCredit
          }
        });
      }
    }
    res.status(404).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


  // Module credits with POST request
  app.post('/module/credits', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': {
            'ModuleCode': modules[i].ModuleCode,
            'ModuleCredit': modules[i].ModuleCredit
          }
        });
      }
    }
    res.status(404).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


/**
@api {get, post} /module/prerequisite Read module prerequisite
@apiVersion 0.1.0
@apiName ReadModulePrerequisite
@apiGroup Module

@apiParam {String} code <i>(Required)</i><br />Module code

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": {
        "ModuleCode": "CS1020E",
        "Prerequisite": "CS1010E or its equivalent"
    }
}
 
@apiError MissingCode No module code was specified.

@apiErrorExample MissingCode:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing code"
}

@apiError ModuleNotFound Module code specified was not found.
 
@apiErrorExample ModuleNotFound:
HTTP/1.1 404 Not Found
{
    "status": "error",
    "result": "Module not found"
}
*/

  // Module prerequisites with GET request
  app.get('/module/prerequisite', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': {
            'ModuleCode': modules[i].ModuleCode,
            'Prerequisite': modules[i].Prerequisite
          }
        });
      }
    }
    res.status(404).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


  // Module prerequisites with POST request
  app.post('/module/prerequisite', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': {
            'ModuleCode': modules[i].ModuleCode,
            'Prerequisite': modules[i].Prerequisite
          }
        });
      }
    }
    res.status(404).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


/**
@api {get, post} /module/preclusion Read module preclusion
@apiVersion 0.1.0
@apiName ReadModulePreclusion
@apiGroup Module

@apiParam {String} code <i>(Required)</i><br />Module code

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": {
        "ModuleCode": "CS1020E",
        "Preclusion": "CG1102, CG1103, CS1020, CS1102, CS1102C, CS1102S, CS2020"
    }
}
 
@apiError MissingCode No module code was specified.

@apiErrorExample MissingCode:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing code"
}

@apiError ModuleNotFound Module code specified was not found.
 
@apiErrorExample ModuleNotFound:
HTTP/1.1 404 Not Found
{
    "status": "error",
    "result": "Module not found"
}
*/

  // Module preclusions with GET request
  app.get('/module/preclusion', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': {
            'ModuleCode': modules[i].ModuleCode,
            'Preclusion': modules[i].Preclusion
          }
        });
      }
    }
    res.status(404).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


  // Module preclusions with POST request
  app.post('/module/preclusion', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing code'
      });
    }
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].ModuleCode === req.query.code) {
        return res.status(200).send({
          'status': 'success',
          'result': {
            'ModuleCode': modules[i].ModuleCode,
            'Preclusion': modules[i].Preclusion
          }
        });
      }
    }
    res.status(404).send({
      'status': 'error',
      'result': 'Module not found'
    })
  });


/**
@api {get, post} /user/modules Read user modules
@apiVersion 0.1.0
@apiName ReadUserModules
@apiGroup User

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": [
        [
            {
                "code": "CS1010E",
                "credits": "4",
                "final_grade": "A+",
                "grade": "A+",
                "su_option": false,
                "type": "RCM"
            }
        ]
    ]
}
*/

  // Read modules with GET request
  app.get('/user/modules', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.status(200).send({
        'status': 'success',
        'result': result.modules
      });
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


  // Read modules with POST request
  app.post('/user/modules', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.status(200).send({
        'status': 'success',
        'result': result.modules
      });
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


/**
@api {get, post} /user/modules/add Add user modules
@apiVersion 0.1.0
@apiName AddUserModules
@apiGroup User

@apiParam {Integer} semester <i>(Required)</i><br />Semester
@apiParam {String} code <i>(Required)</i><br />Module code
@apiParam {Integer} credits <i>(Optional) Default: 4</i><br />Module credits
@apiParam {String} type <i>(Optional) Default: ULR</i><br />ULR - University Level Requirement<br />FLR - Faculty Level Requirement<br />RCM - Required/Core Module<br />TE - Technical Elective<br />IA - Industrial Attachment<br />UE - Unrestricted Elective
@apiParam {String} grade <i>(Optional) Default: Planned</i><br />Aplus - A+<br />A - A<br />Aminus - A-<br />Bplus - B+<br />B - B<br />Bminus - B-<br />Cplus - C+<br />C - C<br />Dplus - D+<br />D - D<br />F - F<br />CS - CS<br />CU - CU<br />Planned - Planned
@apiParam {Boolean} su_option <i>(Optional) Default: false</i>

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": [
        [
            {
                "code": "CS1010E",
                "credits": "4",
                "final_grade": "A+",
                "grade": "A+",
                "su_option": false,
                "type": "RCM"
            }
        ]
    ]
}
 
@apiError MissingSemester No semester was specified.

@apiErrorExample MissingSemester:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing semester"
}

@apiError MissingCode No module code was specified.

@apiErrorExample MissingCode:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing module code"
}

@apiError InvalidCredits Invalid module credits was specified.

@apiErrorExample InvalidCredits:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Invalid module credits"
}

@apiError InvalidType Invalid module type was specified.

@apiErrorExample InvalidType:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Invalid module type"
}

@apiError InvalidGrade Invalid module grade was specified.

@apiErrorExample InvalidGrade:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Invalid module grade"
}

@apiError InvalidSUOption Invalid module S/U option was specified.

@apiErrorExample InvalidSUOption:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Invalid module S/U option"
}

@apiError ModuleExists Module code specified already exists.

@apiErrorExample ModuleExists:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Module code already exists"
}
*/

  // Add module with GET request
  app.get('/user/modules/add', auth, function(req, res) {
    if (!req.query.semester) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing semester'
      });
    }
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing module code'
      });
    }
    if (req.query.credits && !/^[0-9]*$/.test(req.query.credits)) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module credits'
      });
    }
    if (req.query.type && req.query.type !== 'ULR' && req.query.type !== 'FLR' && req.query.type !== 'RCM' && req.query.type !== 'TE' && req.query.type !== 'IA' && req.query.type !== 'UE') {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module type'
      });
    }
    if (req.query.grade && req.query.grade !== 'Aplus' && req.query.grade !== 'A' && req.query.grade !== 'Aminus' && req.query.grade !== 'Bplus' && req.query.grade !== 'B' && req.query.grade !== 'Bminus' && req.query.grade !== 'Cplus' && req.query.grade !== 'C' && req.query.grade !== 'Dplus' && req.query.grade !== 'D' && req.query.grade !== 'F' && req.query.grade !== 'CS' && req.query.grade !== 'CU') {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module grade'
      });
    }
    if (req.query.su_option && req.query.su_option !== 'true' && req.query.su_option !== 'false') {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module S/U option'
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
            return res.status(400).send({
              'status': 'error',
              'result': 'Module code already exists'
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
      if (req.query.credit) {
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
      res.status(200).send({
        'status': 'success',
        'result': modules
      });
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


  // Add module with POST request
  app.post('/user/modules/add', auth, function(req, res) {
    if (!req.query.semester) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing semester'
      });
    }
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing module code'
      });
    }
    if (req.query.credits && !/^[0-9]*$/.test(req.query.credits)) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module credits'
      });
    }
    if (req.query.type && req.query.type !== 'ULR' && req.query.type !== 'FLR' && req.query.type !== 'RCM' && req.query.type !== 'TE' && req.query.type !== 'IA' && req.query.type !== 'UE') {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module type'
      });
    }
    if (req.query.grade && req.query.grade !== 'Aplus' && req.query.grade !== 'A' && req.query.grade !== 'Aminus' && req.query.grade !== 'Bplus' && req.query.grade !== 'B' && req.query.grade !== 'Bminus' && req.query.grade !== 'Cplus' && req.query.grade !== 'C' && req.query.grade !== 'Dplus' && req.query.grade !== 'D' && req.query.grade !== 'F' && req.query.grade !== 'CS' && req.query.grade !== 'CU') {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module grade'
      });
    }
    if (req.query.su_option && req.query.su_option !== 'true' && req.query.su_option !== 'false') {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module S/U option'
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
            return res.status(400).send({
              'status': 'error',
              'result': 'Module code already exists'
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
      if (req.query.credit) {
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
      res.status(200).send({
        'status': 'success',
        'result': modules
      });
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


/**
@api {get, post} /user/modules/update Update user modules
@apiVersion 0.1.0
@apiName UpdateUserModules
@apiGroup User

@apiParam {String} code <i>(Required)</i><br />Module code
@apiParam {Integer} credits <i>(Optional) Default: 4</i><br />Module credits
@apiParam {String} type <i>(Optional) Default: ULR</i><br />ULR - University Level Requirement<br />FLR - Faculty Level Requirement<br />RCM - Required/Core Module<br />TE - Technical Elective<br />IA - Industrial Attachment<br />UE - Unrestricted Elective
@apiParam {String} grade <i>(Optional) Default: Planned</i><br />Aplus - A+<br />A - A<br />Aminus - A-<br />Bplus - B+<br />B - B<br />Bminus - B-<br />Cplus - C+<br />C - C<br />Dplus - D+<br />D - D<br />F - F<br />CS - CS<br />CU - CU<br />Planned - Planned
@apiParam {Boolean} su_option <i>(Optional) Default: false</i>

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": [
        [
            {
                "code": "CS1010E",
                "credits": "4",
                "final_grade": "A+",
                "grade": "A+",
                "su_option": false,
                "type": "RCM"
            }
        ]
    ]
}

@apiError MissingCode No module code was specified.

@apiErrorExample MissingCode:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing module code"
}

@apiError InvalidCredits Invalid module credits was specified.

@apiErrorExample InvalidCredits:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Invalid module credits"
}

@apiError InvalidType Invalid module type was specified.

@apiErrorExample InvalidType:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Invalid module type"
}

@apiError InvalidGrade Invalid module grade was specified.

@apiErrorExample InvalidGrade:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Invalid module grade"
}

@apiError InvalidSUOption Invalid module S/U option was specified.

@apiErrorExample InvalidSUOption:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Invalid module S/U option"
}

@apiError ModuleNotFound Module code specified was not found.

@apiErrorExample ModuleNotFound:
HTTP/1.1 404 Not Found
{
    "status": "error",
    "result": "Module not found"
}
*/

  // Update module with GET request
  app.get('/user/modules/update', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing module code'
      });
    }
    if (req.query.credits && req.query.credits !== parseInt(credits)) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module credits'
      });
    }
    if (req.query.type && req.query.type !== 'ULR' && req.query.type !== 'FLR' && req.query.type !== 'RCM' && req.query.type !== 'TE' && req.query.type !== 'IA' && req.query.type !== 'UE') {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module type'
      });
    }
    if (req.query.grade && req.query.grade !== 'Aplus' && req.query.grade !== 'A' && req.query.grade !== 'Aminus' && req.query.grade !== 'Bplus' && req.query.grade !== 'B' && req.query.grade !== 'Bminus' && req.query.grade !== 'Cplus' && req.query.grade !== 'C' && req.query.grade !== 'Dplus' && req.query.grade !== 'D' && req.query.grade !== 'F' && req.query.grade !== 'CS' && req.query.grade !== 'CU') {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module grade'
      });
    }
    if (req.query.su_option && req.query.su_option !== 'true' && req.query.su_option !== 'false') {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module S/U option'
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
        return res.status(404).send({
          'status': 'error',
          'result': 'Module not found'
        })
      }
      app_users.update({
        id: username,
        modules: modules
      });
      res.status(200).send({
        'status': 'success',
        'result': modules
      });
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


  // Update module with POST request
  app.post('/user/modules/update', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing module code'
      });
    }
    if (req.query.credits && req.query.credits !== parseInt(credits)) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module credits'
      });
    }
    if (req.query.type && req.query.type !== 'ULR' && req.query.type !== 'FLR' && req.query.type !== 'RCM' && req.query.type !== 'TE' && req.query.type !== 'IA' && req.query.type !== 'UE') {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module type'
      });
    }
    if (req.query.grade && req.query.grade !== 'Aplus' && req.query.grade !== 'A' && req.query.grade !== 'Aminus' && req.query.grade !== 'Bplus' && req.query.grade !== 'B' && req.query.grade !== 'Bminus' && req.query.grade !== 'Cplus' && req.query.grade !== 'C' && req.query.grade !== 'Dplus' && req.query.grade !== 'D' && req.query.grade !== 'F' && req.query.grade !== 'CS' && req.query.grade !== 'CU') {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module grade'
      });
    }
    if (req.query.su_option && req.query.su_option !== 'true' && req.query.su_option !== 'false') {
      return res.status(400).send({
        'status': 'error',
        'result': 'Invalid module S/U option'
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
        return res.status(404).send({
          'status': 'error',
          'result': 'Module not found'
        })
      }
      app_users.update({
        id: username,
        modules: modules
      });
      res.status(200).send({
        'status': 'success',
        'result': modules
      });
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


/**
@api {get, post} /user/modules/delete Delete user modules
@apiVersion 0.1.0
@apiName DeleteUserModules
@apiGroup User

@apiParam {String} code <i>(Required)</i><br />Module code

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": [
        [
            {
                "code": "CS1010E",
                "credits": "4",
                "final_grade": "A+",
                "grade": "A+",
                "su_option": false,
                "type": "RCM"
            }
        ]
    ]
}

@apiError MissingCode No module code was specified.

@apiErrorExample MissingCode:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing module code"
}

@apiError ModuleNotFound Module code specified was not found.

@apiErrorExample ModuleNotFound:
HTTP/1.1 404 Not Found
{
    "status": "error",
    "result": "Module not found"
}
*/

  // Delete module with GET request
  app.get('/user/modules/delete', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing module code'
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
          'result': 'Module code not found'
        })
      }
      app_users.update({
        id: username,
        modules: modules
      });
      res.send({
        'status': 'success',
        'result': modules
      });
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


  // Delete module with POST request
  app.post('/user/modules/delete', auth, function(req, res) {
    if (!req.query.code) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing module code'
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
          'result': 'Module code not found'
        })
      }
      app_users.update({
        id: username,
        modules: modules
      });
      res.send({
        'status': 'success',
        'result': modules
      });
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


/**
@api {get, post} /user/shared_with_others Read user shared with others
@apiVersion 0.1.0
@apiName ReadUserSharedWithOthers
@apiGroup User

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": [
        "tester2"
    ]
}
*/

  // Read shared with others with GET request
  app.get('/user/shared_with_others', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.status(200).send({
        'status': 'success',
        'result': result.shared_with_others
      });
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


  // Read shared with others with POST request
  app.post('/user/shared_with_others', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.status(200).send({
        'status': 'success',
        'result': result.shared_with_others
      });
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


/**
@api {get, post} /user/shared_with_others/add Add user shared with others
@apiVersion 0.1.0
@apiName AddUserSharedWithOthers
@apiGroup User

@apiParam {String} user <i>(Required)</i><br />Target user

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": [
        "tester2"
    ]
}

@apiError MissingUser No user was specified.

@apiErrorExample MissingUser:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing user"
}

@apiError CannotAddYourself Cannot share with yourself.

@apiErrorExample CannotAddYourself:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Cannot share with yourself"
}

@apiError UserExists User specified already exists.

@apiErrorExample UserExists:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "User already exists"
}

@apiError UserNotFound User specified was not found.

@apiErrorExample UserNotFound:
HTTP/1.1 404 Not Found
{
    "status": "error",
    "result": "User not found"
}
*/

  // Add shared with others with GET request
  app.get('/user/shared_with_others/add', auth, function(req, res) {
    if (!req.query.user) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing user'
      });
    }
    if (req.query.user === username) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Cannot share with yourself'
      })
    }
    app_users.find(req.query.user).fetch().subscribe(result => {
      if (result) {
        if (result.shared_with_you.indexOf(username) !== -1) {
          return res.status(400).send({
            'status': 'error',
            'result': 'User already exists'
          })
        }
        var shared_with_you = result.shared_with_you;
        shared_with_you.push(username);
        app_users.update({
          id: result.id,
          shared_with_you: shared_with_you
        });
        app_users.find(username).fetch().subscribe(result => {
          var shared_with_others = result.shared_with_others;
          shared_with_others.push(req.query.user);
          app_users.update({
            id: username,
            shared_with_others: shared_with_others
          });
          res.status(200).send({
            'status': 'success',
            'result': shared_with_others
          });
        });
      }
      else {
        res.status(404).send({
          'status': 'error',
          'result': 'User not found'
        });
      }
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


  // Add shared with others with POST request
  app.post('/user/shared_with_others/add', auth, function(req, res) {
    if (!req.query.user) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing user'
      });
    }
    if (req.query.user === username) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Cannot share with yourself'
      })
    }
    app_users.find(req.query.user).fetch().subscribe(result => {
      if (result) {
        if (result.shared_with_you.indexOf(username) !== -1) {
          return res.status(400).send({
            'status': 'error',
            'result': 'User already exists'
          })
        }
        var shared_with_you = result.shared_with_you;
        shared_with_you.push(username);
        app_users.update({
          id: result.id,
          shared_with_you: shared_with_you
        });
        app_users.find(username).fetch().subscribe(result => {
          var shared_with_others = result.shared_with_others;
          shared_with_others.push(req.query.user);
          app_users.update({
            id: username,
            shared_with_others: shared_with_others
          });
          res.status(200).send({
            'status': 'success',
            'result': shared_with_others
          });
        });
      }
      else {
        res.status(404).send({
          'status': 'error',
          'result': 'User not found'
        });
      }
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


/**
@api {get, post} /user/shared_with_others/delete Delete user shared with others
@apiVersion 0.1.0
@apiName DeleteUserSharedWithOthers
@apiGroup User

@apiParam {String} user <i>(Required)</i><br />Target user

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": [
        "tester2"
    ]
}

@apiError MissingUser No user was specified.

@apiErrorExample MissingUser:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing user"
}

@apiError UserNotFound User specified was not found.

@apiErrorExample UserNotFound:
HTTP/1.1 404 Not Found
{
    "status": "error",
    "result": "User not found"
}
*/

  // Delete shared with others with GET request
  app.get('/user/shared_with_others/delete', auth, function(req, res) {
    if (!req.query.user) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing user'
      });
    }
    app_users.find(req.query.user).fetch().subscribe(result => {
      if (result) {
        var shared_with_you = result.shared_with_you;
        var found = false;
        for (var i = 0; i < shared_with_you.length && !found; i++) {
          if (shared_with_you[i] === username) {
            found = true;
            shared_with_you.splice(i, 1);
          }
        }
        if (!found) {
          return res.status(404).send({
            'status': 'error',
            'result': 'User not found'
          })
        }
        app_users.update({
          id: result.id,
          shared_with_you: shared_with_you
        });
        app_users.find(username).fetch().subscribe(result => {
          var shared_with_others = result.shared_with_others;
          for (var i = 0; i < shared_with_others.length; i++) {
            if (shared_with_others[i] === req.query.user) {
              shared_with_others.splice(i, 1);
              break;
            }
          }
          app_users.update({
            id: username,
            shared_with_others: shared_with_others
          });
          res.status(200).send({
            'status': 'success',
            'result': shared_with_others
          });
        });
      }
      else {
        res.status(404).send({
          'status': 'error',
          'result': 'User not found'
        });
      }
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


  // Delete shared with others with POST request
  app.post('/user/shared_with_others/delete', auth, function(req, res) {
    if (!req.query.user) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing user'
      });
    }
    app_users.find(req.query.user).fetch().subscribe(result => {
      if (result) {
        var shared_with_you = result.shared_with_you;
        var found = false;
        for (var i = 0; i < shared_with_you.length && !found; i++) {
          if (shared_with_you[i] === username) {
            found = true;
            shared_with_you.splice(i, 1);
          }
        }
        if (!found) {
          return res.status(404).send({
            'status': 'error',
            'result': 'User not found'
          })
        }
        app_users.update({
          id: result.id,
          shared_with_you: shared_with_you
        });
        app_users.find(username).fetch().subscribe(result => {
          var shared_with_others = result.shared_with_others;
          for (var i = 0; i < shared_with_others.length; i++) {
            if (shared_with_others[i] === req.query.user) {
              shared_with_others.splice(i, 1);
              break;
            }
          }
          app_users.update({
            id: username,
            shared_with_others: shared_with_others
          });
          res.status(200).send({
            'status': 'success',
            'result': shared_with_others
          });
        });
      }
      else {
        res.status(404).send({
          'status': 'error',
          'result': 'User not found'
        });
      }
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


/**
@api {get, post} /user/shared_with_you Read user shared with you
@apiVersion 0.1.0
@apiName ReadUserSharedWithYou
@apiGroup User

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": [
        "tester2"
    ]
}
*/

  // Read shared with you with GET request
  app.get('/user/shared_with_you', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.status(200).send({
        'status': 'success',
        'result': result.shared_with_you
      });
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


  // Read shared with you with POST request
  app.post('/user/shared_with_you', auth, function(req, res) {
    app_users.find(username).fetch().subscribe(result => {
      res.status(200).send({
        'status': 'success',
        'result': result.shared_with_you
      });
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


/**
@api {get, post} /user/shared_with_you/delete Delete user shared with you
@apiVersion 0.1.0
@apiName DeleteUserSharedWithYou
@apiGroup User

@apiParam {String} user <i>(Required)</i><br />Target user

@apiSuccessExample Response:
HTTP/1.1 200 OK
{
    "status": "success",
    "result": [
        "tester2"
    ]
}

@apiError MissingUser No user was specified.

@apiErrorExample MissingUser:
HTTP/1.1 400 Bad Request
{
    "status": "error",
    "result": "Missing user"
}

@apiError UserNotFound User specified was not found.

@apiErrorExample UserNotFound:
HTTP/1.1 404 Not Found
{
    "status": "error",
    "result": "User not found"
}
*/

  // Delete shared with you with GET request
  app.get('/user/shared_with_you/delete', auth, function(req, res) {
    if (!req.query.user) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing user'
      });
    }
    app_users.find(req.query.user).fetch().subscribe(result => {
      if (result) {
        var shared_with_others = result.shared_with_others;
        var found = false;
        for (var i = 0; i < shared_with_others.length && !found; i++) {
          if (shared_with_others[i] === username) {
            found = true;
            shared_with_others.splice(i, 1);
          }
        }
        if (!found) {
          return res.status(404).send({
            'status': 'error',
            'result': 'User not found'
          })
        }
        app_users.update({
          id: result.id,
          shared_with_others: shared_with_others
        });
        app_users.find(username).fetch().subscribe(result => {
          var shared_with_you = result.shared_with_you;
          for (var i = 0; i < shared_with_you.length; i++) {
            if (shared_with_you[i] === req.query.user) {
              shared_with_you.splice(i, 1);
              break;
            }
          }
          app_users.update({
            id: username,
            shared_with_you: shared_with_you
          });
          res.status(200).send({
            'status': 'success',
            'result': shared_with_you
          });
        });
      }
      else {
        res.status(404).send({
          'status': 'error',
          'result': 'User not found'
        });
      }
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });


  // Delete shared with you with POST request
  app.post('/user/shared_with_you/delete', auth, function(req, res) {
    if (!req.query.user) {
      return res.status(400).send({
        'status': 'error',
        'result': 'Missing user'
      });
    }
    app_users.find(req.query.user).fetch().subscribe(result => {
      if (result) {
        var shared_with_others = result.shared_with_others;
        var found = false;
        for (var i = 0; i < shared_with_others.length && !found; i++) {
          if (shared_with_others[i] === username) {
            found = true;
            shared_with_others.splice(i, 1);
          }
        }
        if (!found) {
          return res.status(404).send({
            'status': 'error',
            'result': 'User not found'
          })
        }
        app_users.update({
          id: result.id,
          shared_with_others: shared_with_others
        });
        app_users.find(username).fetch().subscribe(result => {
          var shared_with_you = result.shared_with_you;
          for (var i = 0; i < shared_with_you.length; i++) {
            if (shared_with_you[i] === req.query.user) {
              shared_with_you.splice(i, 1);
              break;
            }
          }
          app_users.update({
            id: username,
            shared_with_you: shared_with_you
          });
          res.status(200).send({
            'status': 'success',
            'result': shared_with_you
          });
        });
      }
      else {
        res.status(404).send({
          'status': 'error',
          'result': 'User not found'
        });
      }
    }, err => {
      console.log(err);
      res.sendStatus(500);
    });
  });
}
 
module.exports = appRouter;