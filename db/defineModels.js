import defineAction from './action';
import defineNextAction from './nextAction';
import definePost from './post';
import defineProcess from './process';
import defineTask from './task';
import defineUser from './user';

export default function(Conn) {
  const Action = defineAction(Conn);
  const NextAction = defineNextAction(Conn);
  const Post = definePost(Conn);
  const Process = defineProcess(Conn);
  const Task = defineTask(Conn);
  const User = defineUser(Conn);

  // Relationships
  Action.belongsTo(Process);
  Action.hasMany(Task);
  Action.hasMany(NextAction);
  NextAction.belongsTo(Action);
  NextAction.belongsTo(Action, {as: 'nextAction'});
  Post.belongsTo(User);
  Process.hasMany(Action);
  Task.belongsTo(Action);
  User.hasMany(Post);
}
