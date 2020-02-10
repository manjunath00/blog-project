const db = `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const redis = require("redis");

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true
};

// redis client
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);

module.exports = {
  DB: db,
  options,
  redisClient
};
