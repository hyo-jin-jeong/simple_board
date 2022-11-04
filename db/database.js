import { DataTypes, Sequelize } from 'sequelize';

import Post from '../model/post.js';
import User from '../model/user.js';
import config from '../config.js';

const { database, username, password, host, dialect } = config.development;
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User.init(sequelize, DataTypes);
db.Post = Post.init(sequelize, DataTypes);

Post.associate(db);

export default db;
