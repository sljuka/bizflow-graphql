import defineUser from './user';
import definePost from './post';
import defineProcess from './process';
import defineAction from './action';
import defineTask from './task';

export default function(Conn) {
  const Action = defineAction(Conn);
  const Post = definePost(Conn);
  const Process = defineProcess(Conn);
  const Task = defineTask(Conn);
  const User = defineUser(Conn);

  // Relationships
  Action.belongsTo(Process);
  Action.hasMany(Task);
  Action.belongsToMany(Action, { as: 'NextActions', through: 'nextActions' });
  Post.belongsTo(User);
  Process.hasMany(Action);
  Task.belongsTo(Action);
  User.hasMany(Post);
}
