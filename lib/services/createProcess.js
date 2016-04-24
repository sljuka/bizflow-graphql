'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createProcess;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function createProcess(Process, processMetaData) {
  var createAction = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(pcss, actionMeta) {
      var name, description, tasks, type, question, action, promises;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              name = actionMeta.name;
              description = actionMeta.description;
              tasks = actionMeta.tasks;
              type = actionMeta.type;
              question = actionMeta.question;
              _context2.next = 7;
              return pcss.createAction({
                name: name,
                description: description || name,
                type: type,
                question: question
              });

            case 7:
              action = _context2.sent;


              createdActions.push(action);

              if (tasks) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt('return', _bluebird2.default.resolve());

            case 11:
              promises = tasks.map(function (taskMeta) {
                return createTask(action, taskMeta);
              });
              return _context2.abrupt('return', _bluebird2.default.all(promises));

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function createAction(_x, _x2) {
      return ref.apply(this, arguments);
    };
  }();

  var createdActions = [];

  return _db2.default.transaction({ type: _sequelize2.default.Transaction.EXCLUSIVE }, _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var name, description, actions, startAction, currentProcess, persistedStartAction;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = processMetaData.name;
            description = processMetaData.description;
            actions = processMetaData.actions;
            startAction = processMetaData.startAction;
            _context.next = 6;
            return Process.create({
              name: name,
              description: description
            });

          case 6:
            currentProcess = _context.sent;
            _context.next = 9;
            return createActions(currentProcess, actions);

          case 9:
            persistedStartAction = createdActions.find(function (item) {
              return item.dataValues.name === startAction;
            });
            _context.next = 12;
            return currentProcess.update({
              startActionId: persistedStartAction.dataValues.id
            });

          case 12:
            _context.next = 14;
            return linkActions(actions, createdActions);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  })));

  function createActions(pcss, actionsMeta) {
    var promises = actionsMeta.map(function (actionMeta) {
      return createAction(pcss, actionMeta);
    });

    return _bluebird2.default.all(promises);
  }

  function createTask(action, taskMeta) {
    var name = taskMeta.name;
    var description = taskMeta.description;


    return action.createTask({
      name: name,
      description: description || name
    });
  }

  function linkActions(actionsMeta, createdActions) {
    var promises = actionsMeta.map(function (actionMeta) {
      var name = actionMeta.name;
      var nextActions = actionMeta.nextActions;
      var nextAction = actionMeta.nextAction;


      var currentAction = createdActions.filter(function (item) {
        return item.dataValues.name === name;
      })[0];

      if (nextAction && nextActions) throw 'nextAction and nextActions, only one of these can be defined';

      if (nextActions) {
        var _promises = Object.keys(nextActions).map(function (key) {
          var nextActionName = nextActions[key];
          var persistedNextAction = createdActions.filter(function (item) {
            return item.dataValues.name === nextActionName;
          })[0];

          return currentAction.createNextAction({
            key: key,
            nextActionId: persistedNextAction.dataValues.id
          });
        });

        return _bluebird2.default.all(_promises);
      }

      if (nextAction) {
        var persistedNextAction = createdActions.filter(function (item) {
          return item.dataValues.name === nextAction;
        })[0];

        return currentAction.createNextAction({
          nextActionId: persistedNextAction.dataValues.id
        });
      }
    });

    return _bluebird2.default.all(promises);
  }
}