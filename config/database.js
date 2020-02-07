const DB = "mongodb://localhost:27017/blogDatabase";

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

module.export = {
  DB,
  options
};
