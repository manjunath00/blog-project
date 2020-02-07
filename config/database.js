const db = "mongodb://localhost:27017/blogDatabase";

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

module.exports = {
  DB : db,
  options
};
