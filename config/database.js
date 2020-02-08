const db = "mongodb://localhost:27017/blogDatabase";

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true
};

module.exports = {
  DB: db,
  options
};
