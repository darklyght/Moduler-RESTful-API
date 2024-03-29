define({ "api": [
  {
    "type": "get, post",
    "url": "/module/credits",
    "title": "Read module credits",
    "version": "0.1.0",
    "name": "ReadModuleCredits",
    "group": "Module",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p><i>(Required)</i><br />Module code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": {\n        \"ModuleCode\": \"CS1010E\",\n        \"ModuleCredit\": \"4\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingCode",
            "description": "<p>No module code was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModuleNotFound",
            "description": "<p>Module code specified was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingCode:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing code\"\n}",
          "type": "json"
        },
        {
          "title": "ModuleNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"status\": \"error\",\n    \"result\": \"Module not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Module"
  },
  {
    "type": "get, post",
    "url": "/module/description",
    "title": "Read module description",
    "version": "0.1.0",
    "name": "ReadModuleDescription",
    "group": "Module",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p><i>(Required)</i><br />Module code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": {\n        \"ModuleCode\": \"CS1010E\",\n        \"ModuleDescription\": \"This module introduces the fundamental concepts of problem solving by computing and programming using an imperative programming language. It is the first and foremost introductory course to computing and the first part of a three-part series on programming and problem solving by computing, which includes CS1020 and CS2010. Topics include problem solving by computing, writing pseudo-codes, problem formulation and problem solving, program development, coding, testing and debugging, fundamental programming constructs (variables, types, expressions, assignments, functions, control structures, etc.), fundamental data structures: arrays, strings and structures, simple file processing, and basic recursion. This module is appropriate for FoE students.\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingCode",
            "description": "<p>No module code was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModuleNotFound",
            "description": "<p>Module code specified was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingCode:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing code\"\n}",
          "type": "json"
        },
        {
          "title": "ModuleNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"status\": \"error\",\n    \"result\": \"Module not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Module"
  },
  {
    "type": "get, post",
    "url": "/module/full",
    "title": "Read full module information",
    "version": "0.1.0",
    "name": "ReadModuleFull",
    "group": "Module",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p><i>(Required)</i><br />Module code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": {\n        \"ModuleCode\": \"CS1010E\",\n        \"ModuleTitle\": \"Programming Methodology\",\n        \"Department\": \"Computer Science\",\n        \"ModuleDescription\": \"This module introduces the fundamental concepts of problem solving by computing and programming using an imperative programming language. It is the first and foremost introductory course to computing and the first part of a three-part series on programming and problem solving by computing, which includes CS1020 and CS2010. Topics include problem solving by computing, writing pseudo-codes, problem formulation and problem solving, program development, coding, testing and debugging, fundamental programming constructs (variables, types, expressions, assignments, functions, control structures, etc.), fundamental data structures: arrays, strings and structures, simple file processing, and basic recursion. This module is appropriate for FoE students.\",\n        \"ModuleCredit\": \"4\",\n        \"Workload\": \"2-1-1-3-3\",\n        \"Preclusion\": \"CG1101, CS1010, CS1010FC, CS1010S, CS1101, CS1101C, CS1101S\",\n        \"Types\": [\n            \"Module\",\n            \"UEM\"\n        ],\n        \"CorsBiddingStats\": [\n            {\n                \"AcadYear\": \"2016/2017\",\n                \"Semester\": \"1\",\n                \"Round\": \"1A\",\n                \"Group\": \"Sectional Teaching 1\",\n                \"Quota\": \"2\",\n                \"Bidders\": \"0\",\n                \"LowestBid\": \"0\",\n                \"LowestSuccessfulBid\": \"0\",\n                \"HighestBid\": \"0\",\n                \"Faculty\": \"Arts & Social Sciences\",\n                \"StudentAcctType\": \"Returning Students [P]\"\n            },\n            ...\n        ],\n        \"AcadYear\": \"2016/2017\",\n        \"History\": [\n            {\n                \"Semester\": 1,\n                \"ExamDate\": \"2016-11-25T09:00+0800\",\n                \"Timetable\": [\n                    {\n                        \"ClassNo\": \"1\",\n                        \"LessonType\": \"Laboratory\",\n                        \"WeekText\": \"Every Week\",\n                        \"DayText\": \"Wednesday\",\n                        \"StartTime\": \"1000\",\n                        \"EndTime\": \"1200\",\n                        \"Venue\": \"COM1-0120\"\n                    },\n                    ...\n                ],\n                \"LecturePeriods\": [\n                    \"Tuesday Afternoon\"\n                ],\n                \"TutorialPeriods\": [\n                    \"Wednesday Morning\",\n                    \"Wednesday Afternoon\",\n                    \"Monday Afternoon\",\n                    \"Tuesday Afternoon\",\n                    \"Thursday Morning\",\n                    \"Tuesday Morning\",\n                    \"Friday Morning\",\n                    \"Thursday Afternoon\"\n                ]\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingCode",
            "description": "<p>No module code was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModuleNotFound",
            "description": "<p>Module code specified was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingCode:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing code\"\n}",
          "type": "json"
        },
        {
          "title": "ModuleNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"status\": \"error\",\n    \"result\": \"Module not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Module"
  },
  {
    "type": "get, post",
    "url": "/module/preclusion",
    "title": "Read module preclusion",
    "version": "0.1.0",
    "name": "ReadModulePreclusion",
    "group": "Module",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p><i>(Required)</i><br />Module code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": {\n        \"ModuleCode\": \"CS1020E\",\n        \"Preclusion\": \"CG1102, CG1103, CS1020, CS1102, CS1102C, CS1102S, CS2020\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingCode",
            "description": "<p>No module code was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModuleNotFound",
            "description": "<p>Module code specified was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingCode:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing code\"\n}",
          "type": "json"
        },
        {
          "title": "ModuleNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"status\": \"error\",\n    \"result\": \"Module not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Module"
  },
  {
    "type": "get, post",
    "url": "/module/prerequisite",
    "title": "Read module prerequisite",
    "version": "0.1.0",
    "name": "ReadModulePrerequisite",
    "group": "Module",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p><i>(Required)</i><br />Module code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": {\n        \"ModuleCode\": \"CS1020E\",\n        \"Prerequisite\": \"CS1010E or its equivalent\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingCode",
            "description": "<p>No module code was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModuleNotFound",
            "description": "<p>Module code specified was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingCode:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing code\"\n}",
          "type": "json"
        },
        {
          "title": "ModuleNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"status\": \"error\",\n    \"result\": \"Module not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Module"
  },
  {
    "type": "get, post",
    "url": "/module/short",
    "title": "Read short module information",
    "version": "0.1.0",
    "name": "ReadModuleShort",
    "group": "Module",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p><i>(Required)</i><br />Module code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": {\n        \"ModuleCode\": \"CS1010E\",\n        \"ModuleTitle\": \"Programming Methodology\",\n        \"Department\": \"Computer Science\",\n        \"ModuleDescription\": \"This module introduces the fundamental concepts of problem solving by computing and programming using an imperative programming language. It is the first and foremost introductory course to computing and the first part of a three-part series on programming and problem solving by computing, which includes CS1020 and CS2010. Topics include problem solving by computing, writing pseudo-codes, problem formulation and problem solving, program development, coding, testing and debugging, fundamental programming constructs (variables, types, expressions, assignments, functions, control structures, etc.), fundamental data structures: arrays, strings and structures, simple file processing, and basic recursion. This module is appropriate for FoE students.\",\n        \"ModuleCredit\": \"4\",\n        \"Workload\": \"2-1-1-3-3\",\n        \"Preclusion\": \"CG1101, CS1010, CS1010FC, CS1010S, CS1101, CS1101C, CS1101S\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingCode",
            "description": "<p>No module code was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModuleNotFound",
            "description": "<p>Module code specified was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingCode:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing code\"\n}",
          "type": "json"
        },
        {
          "title": "ModuleNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"status\": \"error\",\n    \"result\": \"Module not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Module"
  },
  {
    "type": "get, post",
    "url": "/module/title",
    "title": "Read module title",
    "version": "0.1.0",
    "name": "ReadModuleTitle",
    "group": "Module",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p><i>(Required)</i><br />Module code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": {\n        \"ModuleCode\": \"CS1010E\",\n        \"ModuleTitle\": \"Programming Methodology\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingCode",
            "description": "<p>No module code was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModuleNotFound",
            "description": "<p>Module code specified was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingCode:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing code\"\n}",
          "type": "json"
        },
        {
          "title": "ModuleNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"status\": \"error\",\n    \"result\": \"Module not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Module"
  },
  {
    "type": "get, post",
    "url": "/user/modules/add",
    "title": "Add user modules",
    "version": "0.1.0",
    "name": "AddUserModules",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "semester",
            "description": "<p><i>(Required)</i><br />Semester</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p><i>(Required)</i><br />Module code</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "credits",
            "description": "<p><i>(Optional) Default: 4</i><br />Module credits</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p><i>(Optional) Default: ULR</i><br />ULR - University Level Requirement<br />FLR - Faculty Level Requirement<br />RCM - Required/Core Module<br />TE - Technical Elective<br />IA - Industrial Attachment<br />UE - Unrestricted Elective</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "grade",
            "description": "<p><i>(Optional) Default: Planned</i><br />Aplus - A+<br />A - A<br />Aminus - A-<br />Bplus - B+<br />B - B<br />Bminus - B-<br />Cplus - C+<br />C - C<br />Dplus - D+<br />D - D<br />F - F<br />CS - CS<br />CU - CU<br />Planned - Planned</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "su_option",
            "description": "<p><i>(Optional) Default: false</i></p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": [\n        [\n            {\n                \"code\": \"CS1010E\",\n                \"credits\": \"4\",\n                \"final_grade\": \"A+\",\n                \"grade\": \"A+\",\n                \"su_option\": false,\n                \"type\": \"RCM\"\n            }\n        ]\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingSemester",
            "description": "<p>No semester was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingCode",
            "description": "<p>No module code was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredits",
            "description": "<p>Invalid module credits was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidType",
            "description": "<p>Invalid module type was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidGrade",
            "description": "<p>Invalid module grade was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidSUOption",
            "description": "<p>Invalid module S/U option was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModuleExists",
            "description": "<p>Module code specified already exists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingSemester:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing semester\"\n}",
          "type": "json"
        },
        {
          "title": "MissingCode:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing module code\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidCredits:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Invalid module credits\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidType:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Invalid module type\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidGrade:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Invalid module grade\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidSUOption:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Invalid module S/U option\"\n}",
          "type": "json"
        },
        {
          "title": "ModuleExists:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Module code already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "get, post",
    "url": "/user/shared_with_others/add",
    "title": "Add user shared with others",
    "version": "0.1.0",
    "name": "AddUserSharedWithOthers",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p><i>(Required)</i><br />Target user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": [\n        \"tester2\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingUser",
            "description": "<p>No user was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CannotAddYourself",
            "description": "<p>Cannot share with yourself.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserExists",
            "description": "<p>User specified already exists.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User specified was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingUser:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing user\"\n}",
          "type": "json"
        },
        {
          "title": "CannotAddYourself:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Cannot share with yourself\"\n}",
          "type": "json"
        },
        {
          "title": "UserExists:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"User already exists\"\n}",
          "type": "json"
        },
        {
          "title": "UserNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"status\": \"error\",\n    \"result\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "get, post",
    "url": "/user/modules/delete",
    "title": "Delete user modules",
    "version": "0.1.0",
    "name": "DeleteUserModules",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p><i>(Required)</i><br />Module code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": [\n        [\n            {\n                \"code\": \"CS1010E\",\n                \"credits\": \"4\",\n                \"final_grade\": \"A+\",\n                \"grade\": \"A+\",\n                \"su_option\": false,\n                \"type\": \"RCM\"\n            }\n        ]\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingCode",
            "description": "<p>No module code was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModuleNotFound",
            "description": "<p>Module code specified was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingCode:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing module code\"\n}",
          "type": "json"
        },
        {
          "title": "ModuleNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"status\": \"error\",\n    \"result\": \"Module not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "get, post",
    "url": "/user/shared_with_others/delete",
    "title": "Delete user shared with others",
    "version": "0.1.0",
    "name": "DeleteUserSharedWithOthers",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p><i>(Required)</i><br />Target user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": [\n        \"tester2\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingUser",
            "description": "<p>No user was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User specified was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingUser:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing user\"\n}",
          "type": "json"
        },
        {
          "title": "UserNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"status\": \"error\",\n    \"result\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "get, post",
    "url": "/user/shared_with_you/delete",
    "title": "Delete user shared with you",
    "version": "0.1.0",
    "name": "DeleteUserSharedWithYou",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p><i>(Required)</i><br />Target user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": [\n        \"tester2\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingUser",
            "description": "<p>No user was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User specified was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingUser:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing user\"\n}",
          "type": "json"
        },
        {
          "title": "UserNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"status\": \"error\",\n    \"result\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "get, post",
    "url": "/user/modules",
    "title": "Read user modules",
    "version": "0.1.0",
    "name": "ReadUserModules",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": [\n        [\n            {\n                \"code\": \"CS1010E\",\n                \"credits\": \"4\",\n                \"final_grade\": \"A+\",\n                \"grade\": \"A+\",\n                \"su_option\": false,\n                \"type\": \"RCM\"\n            }\n        ]\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "get, post",
    "url": "/user/shared_with_others",
    "title": "Read user shared with others",
    "version": "0.1.0",
    "name": "ReadUserSharedWithOthers",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": [\n        \"tester2\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "get, post",
    "url": "/user/shared_with_you",
    "title": "Read user shared with you",
    "version": "0.1.0",
    "name": "ReadUserSharedWithYou",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": [\n        \"tester2\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "User"
  },
  {
    "type": "get, post",
    "url": "/user/modules/update",
    "title": "Update user modules",
    "version": "0.1.0",
    "name": "UpdateUserModules",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p><i>(Required)</i><br />Module code</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "credits",
            "description": "<p><i>(Optional) Default: 4</i><br />Module credits</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p><i>(Optional) Default: ULR</i><br />ULR - University Level Requirement<br />FLR - Faculty Level Requirement<br />RCM - Required/Core Module<br />TE - Technical Elective<br />IA - Industrial Attachment<br />UE - Unrestricted Elective</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "grade",
            "description": "<p><i>(Optional) Default: Planned</i><br />Aplus - A+<br />A - A<br />Aminus - A-<br />Bplus - B+<br />B - B<br />Bminus - B-<br />Cplus - C+<br />C - C<br />Dplus - D+<br />D - D<br />F - F<br />CS - CS<br />CU - CU<br />Planned - Planned</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "su_option",
            "description": "<p><i>(Optional) Default: false</i></p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"result\": [\n        [\n            {\n                \"code\": \"CS1010E\",\n                \"credits\": \"4\",\n                \"final_grade\": \"A+\",\n                \"grade\": \"A+\",\n                \"su_option\": false,\n                \"type\": \"RCM\"\n            }\n        ]\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingCode",
            "description": "<p>No module code was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredits",
            "description": "<p>Invalid module credits was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidType",
            "description": "<p>Invalid module type was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidGrade",
            "description": "<p>Invalid module grade was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidSUOption",
            "description": "<p>Invalid module S/U option was specified.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModuleNotFound",
            "description": "<p>Module code specified was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MissingCode:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Missing module code\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidCredits:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Invalid module credits\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidType:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Invalid module type\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidGrade:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Invalid module grade\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidSUOption:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": \"error\",\n    \"result\": \"Invalid module S/U option\"\n}",
          "type": "json"
        },
        {
          "title": "ModuleNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"status\": \"error\",\n    \"result\": \"Module not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "User"
  }
] });
