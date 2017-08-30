var express = require('express');
var router = express.Router();
//get list product
router.get('/', function(req, res, next) {
    console.log('tesstttt2');
    res.json({
        'text':'test'
    });
  });
//   get by id
  router.get('/:id', function(req, res, next) {
      console.log(req.params.id)
    res.json({
        'text':'by id'
    });
  });
// add product
router.post('/', function(req, res, next) {
    var body = req.body;
  res.json({
      'add':body
  });
});
router.delete('/:id', function(req, res, next) {
    var body = req.params.id;
  res.json({
      'delete':body
  });
});
  module.exports = router;
  