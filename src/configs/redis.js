module.exports = {
  session: {
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379/0',
    port: 6379,
    db: parseInt(process.env.SESSION_STORE || 0, 10),
  },
  password: {

  },
};
