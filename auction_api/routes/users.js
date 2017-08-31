var express = require('express');
var router = express.Router();
var common = require('../common/common');
var user_model = require('../model/user_model')
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
  check('password', common.INVALID_PASSWORD).isLength()
], (req, res, next) => {
  const errors = validationResult(req).array();
  if (errors.length) {
    var arrayMessage = createArrErr(errors);
    res.json({
      'status': common.STATUS_ERROR,
      'message': arrayMessage
    })
  } else {
    user_model.GetUserByEmail(user).then((result)=>{
      console.log(result)
    }).error(()=>{
      res.json({
        'status': common.STATUS_ERROR,
        'message': common.MESSAGE_LOGIN_ERROR
      })
    })
  }
});
router.post('/register', [
  check('email', common.INVALID_EMAIL).isEmail(),
  check('password', common.INVALID_PASSWORD).isLength({ min: 5 }),
  check('phone', common.INVALID_PHONE).isLength({ min: 5 })
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
