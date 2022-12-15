require('dotenv').config();
require('./global');

const express = require('express');

const graphql = require('./graphql');
const mongoose = require('./loaders/mongoose');
const redisSessionStore = require('./loaders/redisSessionStore');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
redisSessionStore(app);
graphql(app);
mongoose();

module.exports = app;
