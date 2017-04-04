'use strict';

const router = require('express').Router();
const Quote = require('./../models/quote.js');
const HTTPStatus = require('http-status');

router.get('/quotes', listQuotes);
router.get('/quotes/:id', getQuote);
router.post('/quotes', createQuote);
router.delete('/quotes', deleteQuote);
router.delete('/quotes/:id', deleteQuotes);
router.put('/quotes/:id', updateQuote);

module.exports = router;

function listQuotes(req, res, next) {
  Quote.find()
    .then(quote => res.status(HTTPStatus.OK).send(quote))
    .catch(err => next(err));
}

function getQuote(req, res, next) {
  Quote.findById(req.params.id)
    .then(quote => res.status(HTTPStatus.OK).send(quote))
    .catch(err => next(err));
}

function createQuote(req, res, next){
  Quote.create({
    quote: req.body.quote,
    author: req.body.author
  })
    .then(quote => res.status(HTTPStatus.OK).send(quote))
    .catch(err => next(err));
}

function deleteQuote(req, res, next) {
  Quote.findByIdAndRemove(req.params.id)
    .then(() => res.status(HTTPStatus.NO_CONTENT).end())
    .catch(err => next(err));
}

function deleteQuotes(req, res, next) {
  Quote.remove()
    .then(() => res.status(HTTPStatus.NO_CONTENT).end())
    .catch(err => next(err));
}

function updateQuote(req, res, next) {
  let update = { quote: req.body.quote, author: req.body.author };
  Quote.findOneAndUpdate(req.params.id, update, { new: true })
    .then((quote) => res.status(HTTPStatus.OK).send(quote))
    .catch(err => next(err));
}

