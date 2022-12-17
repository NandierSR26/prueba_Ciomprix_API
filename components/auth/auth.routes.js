const { Router } = require('express')
const { check } = require('express-validator')
const { verifyIfEmailExists } = require('../../helpers/db-validators')
const { validateFields } = require('../../middleware/validateFields')
const { validateJWT } = require('../../middleware/validateJWT')
const { register, login, revalidateToken } = require('./authController')

const router = Router()

router.post('/auth/register', [
    check('first_name', 'The first name is required').notEmpty(),
    check('last_name', 'The last name is required').notEmpty(),
    check('email', 'The provided E-mail is not valid').isEmail().custom(verifyIfEmailExists),
    check('password', 'Password should be at least 6 chars long').isLength({ min: 6 }),
    validateFields
], register);

router.post('/auth/login', [
    check('email', 'The provided E-mail is not valid').isEmail(),
    validateFields
], login);

router.get('/auth/renew', validateJWT, revalidateToken );

module.exports = router