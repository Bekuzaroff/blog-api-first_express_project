const auth = require('.././controllers/main_controller');
const validator = require('.././validators/main_validator');
const express = require('express');
const router = express.Router();


router.route('/bloger_signup')
    .post(validator.RegValidator.validateData, auth.Auth.registerBloger);
router.route('/reader_signup')
    .post(validator.RegValidator.validateData, auth.Auth.registerReader);

router.route('/admin/:id')
    .post(auth.Auth.loginAdmin);

router.route('/reader/login')
    .post(validator.RegValidator.validateData,auth.Auth.loginReader);
router.route('/bloger/login')
    .post(validator.RegValidator.validateData, auth.Auth.loginBloger);

router.route('/logout')
    .get(auth.Auth.logout);

router.route('/create_post')
    .post(auth.Auth.createPost)
router.route('/get_posts')
    .get(auth.Auth.getPosts);


module.exports = router;