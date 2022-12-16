const { Router } = require('express')
const authRoutes = require('../components/auth/auth.routes')

const router = Router()

router.use('/', authRoutes)

module.exports = router
