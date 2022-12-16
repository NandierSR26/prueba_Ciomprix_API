const { Router } = require('express')
const userRoutes = require('../components/users/users.routes')
const authRoutes = require('../components/auth/auth.routes')

const router = Router()

router.use('/', userRoutes)
router.use('/', authRoutes)

module.exports = router
