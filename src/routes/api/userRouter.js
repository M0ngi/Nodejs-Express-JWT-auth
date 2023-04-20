const router = require('express').Router()
const { verifyAccessToken } = require("../../middleware/auth")
const userCtrl = require("../../controllers/userCtrl")

router.get('/', verifyAccessToken, userCtrl.getUser)
router.get('/:id', verifyAccessToken, userCtrl.getUser)

router.patch('/', verifyAccessToken, userCtrl.updateUser)
router.patch('/password', verifyAccessToken, userCtrl.updateUserPassword)

router.delete('/', verifyAccessToken, userCtrl.deleteUser)

module.exports = router
