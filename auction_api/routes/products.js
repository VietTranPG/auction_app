var express = require('express');
var router = express.Router();
var common = require('../common/common');
var product_model = require('../model/product_model');
//get list product
router.get('/', function (req, res, next) {
  console.log('tesstttt2');
  res.json({
    'text': 'test'
  });
});
//   get by id
router.get('/:id', function (req, res, next) {
  // console.log(req.params.id)
  res.json({
    'text': 'by id product'
  });
});
// add product
router.post('/', function (req, res, next) {
  var body = req.body;
  res.json({
    'add': body
  });
});
// delete product
router.delete('/:id', function (req, res, next) {
  var body = req.params.id;
  res.json({
    'delete': body
  });
});
// update product
router.put('/', function (req, res, next) {
  var body = req.body;
  res.json({
    'update': body
  });
});

module.exports = router;
