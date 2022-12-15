module.exports = {
  saltRound: Number(process.env.SALT_ROUND) || 10,
  jwtSecret: process.env.JWT_SECRET || 'SECRETKEY',
  jwtTTL: process.env.JWT_TTL || '1d',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'VmVyeVBvd2VyZnVsbFNlY3JldA==',
  refreshTokenTTL: process.env.REFRESH_TOKEN_TTL || '2d',
};
