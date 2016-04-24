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

var createdActions = [];
var currentProcess = null;

function createProcess(Process, processMetaData) {

  return _db2.default.transaction({ type: _sequelize2.default.Transaction.EXCLUSIVE }, function () {
    var name = processMetaData.name;
    var description = processMetaData.description;
    var actions = processMetaData.actions;
    var startAction = processMetaData.startAction;


    return Process.create({
      name: name,
      description: description
    }).then(function (pcss) {
      return setCurrentProcess(pcss);
    }).then(function (pcss) {
      return createActions(pcss, actions);
    }).then(function () {
      return setProcessStartAction(startAction);
    }).then(function () {
      return linkActions(actions, createdActions);
    });
  });
}

function setCurrentProcess(pcss) {
  currentProcess = pcss;
  return pcss;
}

function setProcessStartAction(startAction) {
  var action = createdActions.filter(function (item) {
    return item.dataValues.name === startAction;
  })[0];
  return currentProcess.update({
    startActionId: action.dataValues.id
  });
}

function createActions(pcss, actionsMeta) {
  var promises = actionsMeta.map(function (actionMeta) {
    return createAction(pcss, actionMeta);
  });

  return _bluebird2.default.all(promises);
}

function createAction(pcss, actionMeta) {
  var name = actionMeta.name;
  var description = actionMeta.description;
  var tasks = actionMeta.tasks;
  var type = actionMeta.type;
  var question = actionMeta.question;


  return pcss.createAction({
    name: name,
    description: description || name,
    type: type,
    question: question
  }).then(function (action) {
    createdActions.push(action);

    if (!tasks) return _bluebird2.default.resolve();

    var promises = tasks.map(function (taskMeta) {
      return createTask(action, taskMeta);
    });

    return _bluebird2.default.all(promises);
  });
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