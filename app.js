const express = require('express');
const path = require('path');
const compression = require('compression');
const userRouter = require('./routes/userRoutes');
const betRouter = require('./routes/betRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());

app.use(compression());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/bets', betRouter);
app.use('/', viewRouter);

app.all('*', (req, res, next) => {
    // Crear un nuevo error 404 y pasar al siguiente middleware
    next(new Error(`Can't find ${req.originalUrl} on this server!`));
});



module.exports = app;