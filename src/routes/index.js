const router = require('express').Router()

const logger = (req, res, next)=>{
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    console.log(`\x1b[34m[${ip}]\x1b[0m: \x1b[32m${req.method}\x1b[0m ${req.baseUrl+req.url} - body: ${JSON.stringify(req.body)}`)
    next()
}

router.use("/api", logger, require("./api"))

module.exports = router
