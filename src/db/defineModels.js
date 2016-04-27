import defineAction from './action';
import defineActionHead from './actionHead';
import defineActionInstance from './actionInstance';
import defineNextAction from './nextAction';
import definePost from './post';
import defineProcess from './process';
import defineProcessInstance from './processInstance';
import defineTask from './task';
import defineTaskInstance from './taskInstance';
import defineUser from './user';

export default function(Conn) {
  const Action = defineAction(Conn);
  const ActionHead = defineActionHead(Conn);
  const ActionInstance = defineActionInstance(Conn);
  const NextAction = defineNextAction(Conn);
  const Post = definePost(Conn);
  const Process = defineProcess(Conn);
  const ProcessInstance = defineProcessInstance(Conn);
  const Task = defineTask(Conn);
  const TaskInstance = defineTaskInstance(Conn);
  const User = defineUser(Conn);

  // Relationships
  Action.belongsTo(Process);
  Action.hasMany(NextAction);
  Action.hasMany(Task);
  ActionHead.belongsTo(ActionInstance);
  ActionHead.belongsTo(ProcessInstance);
  ActionInstance.belongsTo(ProcessInstance);
  ActionInstance.hasMany(TaskInstance);
  ActionInstance.hasOne(ActionHead);
  NextAction.belongsTo(Action, {as: 'nextAction'});
  NextAction.belongsTo(Action);
  Post.belongsTo(User);
  Process.hasMany(Action);
  Process.hasMany(ProcessInstance);
  ProcessInstance.belongsTo(User, {as: 'creator'});
  ProcessInstance.hasMany(ActionInstance);
  ProcessInstance.hasOne(ActionHead);
  ProcessInstance.belongsTo(Process);
  Task.belongsTo(Action);
  TaskInstance.belongsTo(ActionInstance);
  TaskInstance.belongsTo(User, {as: 'assignee'});
  TaskInstance.belongsTo(User, {as: 'assigner'});
  User.hasMany(Post);
  User.hasMany(ProcessInstance, {as: 'createdProcesses', foreignKey: 'creatorId'});
  User.hasMany(TaskInstance, {as: 'assignedTasks', foreignKey: 'assigneeId'});
}
