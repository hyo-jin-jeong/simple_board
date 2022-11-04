import { Model } from 'sequelize';

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
      foriegnKey: {
        name: 'userId',
        allowNull: true,
      },
      onDelete: 'SET NULL',
    });
  }
}

export default Post;
