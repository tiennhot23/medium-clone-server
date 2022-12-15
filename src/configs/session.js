module.exports = {
  name: process.env.SESSION_ID || 'sid',
  secret: process.env.SESSION_SECRET || 'SESSIONSECRET',
  ttl: Number(process.env.SESSION_TTL) || 60,
};
