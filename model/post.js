import { Model } from 'sequelize';
import db from '../db/database.js';

class Post extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        title: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(200),
        },
        password: {
          type: DataTypes.STRING(200),
        },
        salt: {
          type: DataTypes.STRING(200),
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: 'posts',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: true,
      },
      onDelete: 'SET NULL',
    });
  }
  static async findById(id) {
    return await this.findOne({
      where: { id },
    });
  }
  static async createPost(userId, encryptPassword, salt, title, content) {
    await this.create({
      userId,
      password: encryptPassword,
      salt,
      title,
      content,
    });
  }
  static async getPosts(id, createdAt) {
    const sql = selectSql(id, createdAt);
    return await db.sequelize.query(sql, {
      type: db.Sequelize.QueryTypes.SELECT,
      raw: false,
    });
  }
  static async updatePost(id, title, content) {
    await this.update(
      {
        title,
        content,
      },
      {
        where: {
          id,
        },
      }
    );
  }
}

const selectSql = (id, createdAt) => {
  if (createdAt) {
    return `
    SELECT posts.id as id, title, content, created_at as createAt, updated_at as updatedAt, user_id as userId, name as userName
    FROM posts INNER JOIN users on posts.user_id = users.id
      WHERE created_at <= '${createdAt}' and posts.id < ${id}
      ORDER BY created_at DESC, posts.id DESC
      LIMIT 20
  `;
  }
  return `
    SELECT posts.id as id, title, content, created_at as createAt, updated_at as updatedAt, user_id as userId, name as userName
    FROM posts INNER JOIN users on posts.user_id = users.id
      ORDER BY created_at DESC, posts.id DESC
      LIMIT 20
  `;
};
export default Post;
