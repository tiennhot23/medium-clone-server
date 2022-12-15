module.exports = {
  connectionString: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/test',
  mongoDbOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
