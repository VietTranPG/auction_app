var express = require('express');
var router = express.Router();
var common = require('../common/common');
var product_model = require('../model/product_model');
const { check, validationResult } = require('express-validator/check');
function createArrErr(arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i].msg)
  }
  return result;
}
// get product type
router.get('/', function (req, res, next) {
  product_model.getAllType().then((result) => {
    res.json({
      'data': result,
      'status': common.STATUS_SUUCESS,
      'message': common.MESSAGE_SUCCESS
    })
  }).error(() => {
    res.json({
      'status': common.STATUS_ERROR,
      'message': common.MESSAGE_LOGIN_ERROR
    })
  })
});
//   get product type by id
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  product_model.getTypeById(id).then((result) => {
    res.json({
      'data': result,
      'status': common.STATUS_SUUCESS,
      'message': common.MESSAGE_SUCCESS
    })
  }).error(() => {
    res.json({
      'status': common.STATUS_ERROR,
      'message': common.MESSAGE_LOGIN_ERROR
    })
  })
});
// add product type
router.post('/', [check('name', common.MESSAGE_INVALID_INPUT).exists()], function (req, res, next) {
  console.log(req.body)
  const errors = validationResult(req).array();
  console.log(errors)
  var body = req.body;
  if (errors.length) {
    var arrayMessage = createArrErr(errors);
    res.json({
      'status': common.STATUS_ERROR,
      'message': arrayMessage
    })
  } else {
    var params = req.body;
    var productType = {
      name: params.name,
      created_at: '',
      updated_at: ''
    }
    product_model.addProductType(productType).then((result) => {
      res.json({
        'data': result,
        'status': common.STATUS_SUUCESS,
        'message': common.MESSAGE_SUCCESS
      })
    }).error(() => {
      res.json({
        'status': common.STATUS_ERROR,
        'message': common.MESSAGE_LOGIN_ERROR
      })
    })
  }
});
// delete product type
router.delete('/:id', function (req, res, next) {
  var body = req.params.id;
  res.json({
    'delete': body
  });
});
// update product type
router.put('/', function (req, res, next) {
  var body = req.body;
  res.json({
    'update': body
  });
});
module.exports = router;