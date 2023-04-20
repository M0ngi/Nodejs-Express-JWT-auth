const router = require('express').Router()
const authCtrl = require('../../controllers/authCtrl')
const { verifyAccessToken, verifyRefreshToken } = require("../../middleware/auth")

router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)
router.post('/logout', verifyAccessToken, authCtrl.logout)
router.post('/refresh', verifyRefreshToken, authCtrl.refreshToken)

module.exports = router
