const Users = require("../models/userModel")
const jwt = require('jsonwebtoken')
const { errorResp } = require('../utils/apiResponse')

const verifyAccessToken = async (req, res, next) => {
    try {
        const header = req.header("Authorization")
        if(!header) return errorResp(res, 401, "Invalid Authentication.")
        if(!header.startsWith("Bearer ")) return errorResp(res, 401, "Invalid Authentication.")

        const token = header.replace("Bearer ", "");
        if(!token) return errorResp(res, 401, "Invalid Authentication.")

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!decoded) return errorResp(res, 401, "Invalid Authentication.")
        if(!decoded.time) return errorResp(res, 401, "Invalid Authentication.")
        
        const user = await Users.findOne({_id: decoded.id, accessToken: decoded.time})
        if(!user) return errorResp(res, 401, "Invalid Authentication.")

        req.user = user
        next()
    } catch (err) {
        if(err instanceof jwt.TokenExpiredError){
            return errorResp(res, 401, "Invalid Authentication.")
        }
        return errorResp(res, 500, err.message)
    }
}

const verifyRefreshToken = async (req, res, next) => {
    try {
        const header = req.header("Authorization")
        if(!header) return errorResp(res, 401, "Invalid Authentication.")
        if(!header.startsWith("Bearer ")) return errorResp(res, 401, "Invalid Authentication.")

        const token = header.replace("Bearer ", "");
        if(!token) return errorResp(res, 401, "Invalid Authentication.")

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        if(!decoded) return errorResp(res, 401, "Invalid Authentication.")
        if(!decoded.time) return errorResp(res, 401, "Invalid Authentication.")
        
        const user = await Users.findOne({_id: decoded.id, refreshToken: decoded.time})
        if(!user) return errorResp(res, 401, "Invalid Authentication.")
        
        req.user = user
        next()
    } catch (err) {
        return errorResp(res, 500, err.message)
    }
}

module.exports = {
    verifyAccessToken,
    verifyRefreshToken,
}
