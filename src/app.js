require('dotenv').config();
require('./global');

const express = require('express');

const graphql = require('./graphql');
const mongoose = require('./services/mongoose');
const redisSessionStore = require('./services/redisSessionStore');
const { cookieParser } = require('./middlewares');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser);
redisSessionStore(app);
mongoose();
graphql(app);

module.exports = app;
