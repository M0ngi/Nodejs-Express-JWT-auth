const router = require('express').Router()

router.use("/auth", require("./authRouter"))
router.use("/user", require("./userRouter"))

router.get("/", (req, res) => {
    res.json({msg: "Hello world"})
})

module.exports = router
