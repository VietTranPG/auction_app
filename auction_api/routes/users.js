var express = require('express');
var router = express.Router();
var common = require('../common/common');
var user_model = require('../model/user_model');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator/check');
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
function createArrErr(arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i].msg)
  }
  return result;
}

router.post('/login', [
  check('email', common.INVALID_EMAIL).isEmail(),
  check('password', common.INVALID_PASSWORD).exists()
], (req, res, next) => {
  const errors = validationResult(req).array();
  console.log(check())
  if (errors.length) {
    var arrayMessage = createArrErr(errors);
    res.json({
      'status': common.STATUS_ERROR,
      'message': arrayMessage
    })
  } else {
    var user = req.body;
    user_model.GetUserByEmail(user).then((result) => {
      if (result.error) {
        res.json({
          'status': common.STATUS_ERROR,
          'message': common.MESSAGE_LOGIN_ERROR
        })
      } else {
        res.json({
          'data': result,
          'status': common.STATUS_SUUCESS,
          'message': common.MESSAGE_SUCCESS
        })
      }

    }).error(() => {
      res.json({
        'status': common.STATUS_ERROR,
        'message': common.MESSAGE_LOGIN_ERROR
      })
    })
  }
});
router.post('/register', [
  check('email', common.INVALID_EMAIL).isEmail(),
  check('password', common.INVALID_PASSWORD).exists(),
  check('phone', common.INVALID_PHONE).exists()
], (req, res, next) => {
  const errors = validationResult(req).array();
  if (errors.length) {
    var arrayMessage = createArrErr(errors);
    res.json({
      'status': common.STATUS_ERROR,
      'message': arrayMessage
    })
  } else {
    let param = req.body;
    var user = {
      email: param.email,
      account_type: common.ROLE_CUSTOMER,
      password: param.password,
      name: param.name,
      phone: param.phone,
      login_token: '',
      created_at: '',
      updated_at: '',
      status: common.STATUS_IS_ALIVE,
      open_id: ''
    }
    user_model.CreateUser(user).then((result) => {
      res.json({
        'status': common.STATUS_SUUCESS,
        'message': common.MESSAGE_SUCCESS
      })
    }).error(() => {
      res.json({
        'status': common.STATUS_ERROR,
        'message': common.MESSAGE_REGISTER_ERROR
      })
    })

  }
});
module.exports = router;
