import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB,
  },
  port: process.env.PORT || 3000,
  algorithm: process.env.ALGORITHM,
  keyStretching: parseInt(process.env.KEY_STRETCHING),
};

export default config;
