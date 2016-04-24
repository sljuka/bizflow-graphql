'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Conn) {
  var Action = (0, _action2.default)(Conn);
  var NextAction = (0, _nextAction2.default)(Conn);
  var Post = (0, _post2.default)(Conn);
  var Process = (0, _process2.default)(Conn);
  var Task = (0, _task2.default)(Conn);
  var User = (0, _user2.default)(Conn);

  // Relationships
  Action.belongsTo(Process);
  Action.hasMany(Task);
  Action.hasMany(NextAction);
  NextAction.belongsTo(Action);
  NextAction.belongsTo(Action, { as: 'nextAction' });
  Post.belongsTo(User);
  Process.hasMany(Action);
  Task.belongsTo(Action);
  User.hasMany(Post);
};

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

var _nextAction = require('./nextAction');

var _nextAction2 = _interopRequireDefault(_nextAction);

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

var _process = require('./process');

var _process2 = _interopRequireDefault(_process);

var _task = require('./task');

var _task2 = _interopRequireDefault(_task);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }