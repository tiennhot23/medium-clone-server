require('dotenv').config();
require('./global');

const express = require('express');

const graphql = require('./graphql');
const mongoose = require('./services/mongoose');
const redisSessionStore = require('./services/redisSessionStore');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// redisSessionStore(app);
graphql(app);
mongoose();

module.exports = app;
