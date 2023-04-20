const successResp = (res, code, data) => {
    return res.status(code).json({
        msg: "success",
        data
    })
}

const errorResp = (res, code, data) => {
    const ip = res.req.headers['x-forwarded-for'] || res.req.socket.remoteAddress
    console.log(`\x1b[41m[!] Error ${code} \x1b[0m from \x1b[34m${ip}\x1b[0m: \x1b[32m${res.req.method}\x1b[0m ${res.req.baseUrl+res.req.url}`)
    console.log(data)
    return res.status(code).json({
        msg: "error",
        data
    })
}

module.exports = {
    successResp,
    errorResp
}
