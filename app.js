var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var reviewsRouter = require('./routes/review');
var sellerReviewsRouter = require('./routes/sellerReviews');
var nearestSellerRouter = require('./routes/nearestSeller');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/review', reviewsRouter);
app.use('/getSellerReviews', sellerReviewsRouter);
app.use('/getNearestSellers', nearestSellerRouter);

module.exports = app;
