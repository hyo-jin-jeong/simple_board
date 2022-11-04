import { Model } from 'sequelize';

class User extends Model {
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
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'users',
      }
    );
    return this;
  }
  static async findById(id) {
    return await this.findOne({ where: { id } });
  }
}
export default User;
