require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { PORT, DB_URL } = require('./utils/config');

const routes = require('./routes');
const errorHandler = require('./middlewares/error-determinant');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { apiLimiter } = require('./middlewares/limiter');
const cors = require('./middlewares/cors');

const app = express();

mongoose.connect(DB_URL);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors);
app.use(helmet());
app.use(apiLimiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
