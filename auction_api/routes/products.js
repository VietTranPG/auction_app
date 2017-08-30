var express = require('express');
var router = express.Router();
//get list product
router.get('/', function (req, res, next) {
  console.log('tesstttt2');
  res.json({
    'text': 'test'
  });
});
//   get by id
router.get('/:id', function (req, res, next) {
  console.log(req.params.id)
  res.json({
    'text': 'by id'
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
// get product type
router.get('/product_type', function (req, res, next) {
  res.json({
    'text': 'by id'
  });
});
//   get product type by id
router.get('/product_type/:id', function (req, res, next) {
  console.log(req.params.id)
  res.json({
    'text': 'by id'
  });
});
// add product type
router.post('/product_type', function (req, res, next) {
  var body = req.body;
  res.json({
    'add': body
  });
});
// delete product type
router.delete('/product_type/:id', function (req, res, next) {
  var body = req.params.id;
  res.json({
    'delete': body
  });
});
// update product type
router.put('/product_type', function (req, res, next) {
  var body = req.body;
  res.json({
    'update': body
  });
});
module.exports = router;
